from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from services.gpt_service import GPTService

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/send", response_model=ChatResponse)
async def send_message(request: ChatRequest):
    try:
        gpt_service = GPTService()
        response = gpt_service.get_response(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))