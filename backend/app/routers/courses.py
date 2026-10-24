from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Dict, Any, Optional
from backend.app.models.schemas import CareerDomain
from backend.app.services.store import db

router = APIRouter(prefix="/courses", tags=["Career Explorer"])


@router.get("/tree")
async def get_career_tree() -> Dict[str, Any]:
    """Retrieve full Sector -> Degree/Course -> Branch -> Domain hierarchical tree."""
    tree: Dict[str, Any] = {}

    for d in db.career_domains:
        sector = d["sector"]
        degree = d["degree_course"]
        branch = d["branch"]

        if sector not in tree:
            tree[sector] = {
                "name": sector,
                "name_ta": d.get("sector_ta"),
                "degrees": {}
            }

        if degree not in tree[sector]["degrees"]:
            tree[sector]["degrees"][degree] = {
                "name": degree,
                "name_ta": d.get("degree_course_ta"),
                "branches": {}
            }

        if branch not in tree[sector]["degrees"][degree]["branches"]:
            tree[sector]["degrees"][degree]["branches"][branch] = {
                "name": branch,
                "name_ta": d.get("branch_ta"),
                "domains": []
            }

        tree[sector]["degrees"][degree]["branches"][branch]["domains"].append({
            "id": d["id"],
            "name": d["domain_name"],
            "name_ta": d.get("domain_name_ta"),
            "demand_rank": d["demand_rank"],
            "demand_tag": d["demand_tag"],
            "duration": d.get("duration"),
            "approx_cost": d.get("approx_cost"),
        })

    return {"sectors": list(tree.values())}


@router.get("", response_model=List[CareerDomain])
async def list_career_domains(
    search: Optional[str] = Query(None, description="Search domain, degree, or skill"),
    sector: Optional[str] = Query(None, description="Filter by sector")
):
    items = db.career_domains
    if sector:
        items = [d for d in items if d["sector"].lower() == sector.lower()]
    if search:
        q = search.lower()
        items = [
            d for d in items
            if q in d["domain_name"].lower()
            or q in d["degree_course"].lower()
            or q in d["branch"].lower()
            or any(q in s.lower() for s in d.get("required_skills", []))
            or (d.get("domain_name_ta") and q in d["domain_name_ta"])
        ]
    return [CareerDomain(**d) for d in items]


@router.get("/{domain_id}", response_model=CareerDomain)
async def get_career_domain(domain_id: str):
    for d in db.career_domains:
        if d["id"] == domain_id:
            return CareerDomain(**d)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Career domain not found")
