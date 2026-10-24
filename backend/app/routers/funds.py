import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, List
from pydantic import BaseModel
from backend.app.models.schemas import (
    FundAllocation,
    FundTransaction,
    FundRequestCreate,
    FundRequestResponse,
    ProfileBase,
    UserRole
)
from backend.app.core.security import get_current_user, require_roles
from backend.app.services.store import db

router = APIRouter(tags=["Funds & Financial Transparency"])


class FundRequestReview(BaseModel):
    status: str  # approved, rejected
    officer_notes: str


class FundAllocationCreate(BaseModel):
    school_id: str
    financial_year: str
    grant_type: str
    grant_type_ta: str
    sanctioned_amount: float
    remarks: str


class FundTransactionCreate(BaseModel):
    allocation_id: str
    school_id: str
    transaction_type: str  # receipt, expenditure
    amount: float
    purpose: str
    purpose_ta: str
    vendor_name: str
    invoice_ref: str


@router.get("/schools/{school_id}/funds")
async def get_school_funds(school_id: str) -> Dict[str, Any]:
    """Calculate and return verified financial breakdown for a school."""
    allocations = [a for a in db.fund_allocations if a["school_id"] == school_id]
    transactions = [t for t in db.fund_transactions if t["school_id"] == school_id]

    total_sanctioned = sum(a["sanctioned_amount"] for a in allocations)
    total_released = sum(a["released_amount"] for a in allocations)
    total_spent = sum(t["amount"] for t in transactions if t["transaction_type"] == "expenditure")
    remaining_balance = total_released - total_spent

    return {
        "school_id": school_id,
        "financial_year": "2026-2027",
        "total_sanctioned": total_sanctioned,
        "total_released": total_released,
        "total_spent": total_spent,
        "remaining_balance": remaining_balance,
        "allocations": allocations,
        "transactions": transactions,
    }


@router.get("/funds/requests", response_model=List[FundRequestResponse])
async def list_fund_requests(current_user: ProfileBase = Depends(get_current_user)):
    """List fund requests. Headmaster sees own school's; Officer sees all in region."""
    if current_user.role == UserRole.HEADMASTER:
        items = [r for r in db.fund_requests if r["school_id"] == current_user.school_id]
    elif current_user.role == UserRole.EDUCATION_OFFICER:
        items = db.fund_requests
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    return [FundRequestResponse(**r) for r in items]


@router.post("/funds/requests", response_model=FundRequestResponse)
async def create_fund_request(
    req: FundRequestCreate,
    current_user: ProfileBase = Depends(require_roles([UserRole.HEADMASTER]))
):
    """Headmaster submits a school infrastructure or equipment fund request."""
    new_request = {
        "id": f"fr-{uuid.uuid4().hex[:6]}",
        "school_id": current_user.school_id,
        "requested_by": current_user.id,
        "title": req.title,
        "purpose": req.purpose,
        "estimated_amount": req.estimated_amount,
        "urgency": req.urgency,
        "status": "pending",
        "officer_notes": None,
        "created_at": datetime.now(timezone.utc),
        "reviewed_at": None,
    }
    db.fund_requests.insert(0, new_request)

    db.log_audit(
        user_id=current_user.id,
        action="FUND_REQUEST_SUBMITTED",
        entity_type="fund_request",
        entity_id=new_request["id"],
        details={"amount": req.estimated_amount, "title": req.title}
    )

    return FundRequestResponse(**new_request)


@router.patch("/funds/requests/{request_id}/review", response_model=FundRequestResponse)
async def review_fund_request(
    request_id: str,
    body: FundRequestReview,
    current_user: ProfileBase = Depends(require_roles([UserRole.EDUCATION_OFFICER]))
):
    """Education Officer reviews and approves/rejects a fund request."""
    for r in db.fund_requests:
        if r["id"] == request_id:
            r["status"] = body.status
            r["officer_notes"] = body.officer_notes
            r["reviewed_at"] = datetime.now(timezone.utc)

            db.log_audit(
                user_id=current_user.id,
                action=f"FUND_REQUEST_{body.status.upper()}",
                entity_type="fund_request",
                entity_id=request_id,
                details={"status": body.status, "notes": body.officer_notes}
            )
            return FundRequestResponse(**r)

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fund request not found")


@router.post("/funds/allocations", response_model=FundAllocation)
async def create_fund_allocation(
    body: FundAllocationCreate,
    current_user: ProfileBase = Depends(require_roles([UserRole.EDUCATION_OFFICER]))
):
    """Education Officer sanctions and allocates new government grant."""
    new_alloc = {
        "id": f"fa-{uuid.uuid4().hex[:6]}",
        "school_id": body.school_id,
        "financial_year": body.financial_year,
        "grant_type": body.grant_type,
        "grant_type_ta": body.grant_type_ta,
        "sanctioned_amount": body.sanctioned_amount,
        "released_amount": body.sanctioned_amount,
        "remaining_balance": body.sanctioned_amount,
        "status": "approved",
        "remarks": body.remarks,
    }
    db.fund_allocations.append(new_alloc)

    db.log_audit(
        user_id=current_user.id,
        action="GRANT_ALLOCATED",
        entity_type="fund_allocation",
        entity_id=new_alloc["id"],
        details={"amount": body.sanctioned_amount, "grant_type": body.grant_type}
    )

    return FundAllocation(**new_alloc)


@router.post("/funds/transactions", response_model=FundTransaction)
async def record_fund_transaction(
    body: FundTransactionCreate,
    current_user: ProfileBase = Depends(require_roles([UserRole.HEADMASTER, UserRole.EDUCATION_OFFICER]))
):
    """Record an expenditure against an allocation with invoice details."""
    new_tx = {
        "id": f"ft-{uuid.uuid4().hex[:6]}",
        "allocation_id": body.allocation_id,
        "school_id": body.school_id,
        "transaction_type": body.transaction_type,
        "amount": body.amount,
        "purpose": body.purpose,
        "purpose_ta": body.purpose_ta,
        "vendor_name": body.vendor_name,
        "invoice_ref": body.invoice_ref,
        "status": "verified",
        "created_at": datetime.now(timezone.utc),
    }

    # Deduct from allocation balance
    for a in db.fund_allocations:
        if a["id"] == body.allocation_id and body.transaction_type == "expenditure":
            a["remaining_balance"] = max(0.0, a["remaining_balance"] - body.amount)

    db.fund_transactions.insert(0, new_tx)

    db.log_audit(
        user_id=current_user.id,
        action="TRANSACTION_RECORDED",
        entity_type="fund_transaction",
        entity_id=new_tx["id"],
        details={"amount": body.amount, "vendor": body.vendor_name}
    )

    return FundTransaction(**new_tx)
