from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import get_db, engine, Base
from app.models import Meeting
from app.schemas import MeetingCreate, MeetingResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Spry API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/meetings", response_model=List[MeetingResponse])
def list_meetings(db: Session = Depends(get_db)):
    return db.query(Meeting).order_by(Meeting.starts_at.asc()).all()

@app.post("/api/meetings", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
def create_meeting(meeting_in: MeetingCreate, db: Session = Depends(get_db)):
    if meeting_in.ends_at <= meeting_in.starts_at:
        raise HTTPException(
            status_code=400,
            detail="ends_at must be strictly greater than starts_at"
        )
    meeting = Meeting(**meeting_in.model_dump())
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return meeting
