from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gpt_service import GPTService
from services.conversation_templates import CONVERSATION_OPENINGS, CONVERSATION_CLOSINGS

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class TemplatesResponse(BaseModel):
    openings: list[str]
    closings: list[str]

@router.post("/send", response_model=ChatResponse)
async def send_message(request: ChatRequest):
    try:
        gpt_service = GPTService()
        response = gpt_service.get_response(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/templates", response_model=TemplatesResponse)
async def get_templates():
    return TemplatesResponse(
        openings=CONVERSATION_OPENINGS,
        closings=CONVERSATION_CLOSINGS
    )