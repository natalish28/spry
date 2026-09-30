from datetime import datetime
from pydantic import BaseModel, Field

class MeetingBase(BaseModel):
    title: str = Field(..., max_length=255)
    starts_at: datetime
    ends_at: datetime
    attendee_count: int = Field(..., ge=1)

class MeetingCreate(MeetingBase):
    pass

class MeetingResponse(MeetingBase):
    id: int

    class Config:
        from_attributes = True
