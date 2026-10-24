import pytest
from httpx import AsyncClient, ASGITransport
from backend.app.main import app
from backend.app.models.schemas import UserRole


@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/v1/health")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "healthy"
        assert "Learnova" in data["app"]


@pytest.mark.asyncio
async def test_demo_login_all_roles():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        for role in [UserRole.STUDENT, UserRole.STAFF, UserRole.HEADMASTER, UserRole.DOCTOR, UserRole.EDUCATION_OFFICER]:
            res = await client.post("/api/v1/auth/demo-login", json={"role": role.value})
            assert res.status_code == 200
            data = res.json()
            assert "access_token" in data
            assert data["user"]["role"] == role.value


@pytest.mark.asyncio
async def test_student_portfolio():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # 1. Login as student
        login_res = await client.post("/api/v1/auth/demo-login", json={"role": "student"})
        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 2. Get portfolio
        res = await client.get("/api/v1/students/me/portfolio", headers=headers)
        assert res.status_code == 200
        portfolio = res.json()
        assert portfolio["grade"] == "11"
        assert portfolio["section"] == "A"
        assert portfolio["attendance_percentage"] > 90


@pytest.mark.asyncio
async def test_one_vote_per_student_enforced():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        login_res = await client.post("/api/v1/auth/demo-login", json={"role": "student"})
        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Student votes on cmp-003 (which they haven't voted on yet)
        res1 = await client.post("/api/v1/complaints/cmp-003/votes", headers=headers)
        assert res1.status_code == 200
        data1 = res1.json()
        assert data1["message"] == "Vote recorded successfully"

        # Duplicate vote attempt must return 409 Conflict
        res2 = await client.post("/api/v1/complaints/cmp-003/votes", headers=headers)
        assert res2.status_code == 409


@pytest.mark.asyncio
async def test_role_authorization_isolation():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Student attempting to approve fund request
        login_res = await client.post("/api/v1/auth/demo-login", json={"role": "student"})
        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        res = await client.patch(
            "/api/v1/funds/requests/fr-001/review",
            headers=headers,
            json={"status": "approved", "officer_notes": "Unauthorized approval attempt"}
        )
        assert res.status_code == 403


@pytest.mark.asyncio
async def test_career_tree_hierarchy():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/v1/courses/tree")
        assert res.status_code == 200
        data = res.json()
        assert "sectors" in data
        assert len(data["sectors"]) > 0


@pytest.mark.asyncio
async def test_doctor_simulated_sms_flow():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        login_res = await client.post("/api/v1/auth/demo-login", json={"role": "doctor"})
        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        res = await client.post(
            "/api/v1/doctor/notifications/mock-send",
            headers=headers,
            json={"record_id": "hr-001"}
        )
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "delivered_simulated"
