from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import models
from schemas import schemas
from auth import auth
from utils.logging_config import logger

router = APIRouter()

@router.post("/todos", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    db_todo = models.Todo(**todo.model_dump(), owner_id=current_user.id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    logger.info(f"Todo created for user {current_user.username}: {todo.title}")
    return db_todo

@router.get("/todos", response_model=List[schemas.Todo])
def read_todos(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Todo).filter(models.Todo.owner_id == current_user.id).all()

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.owner_id == current_user.id).first()
    if db_todo is None:
        logger.warning(f"Todo delete failed: Todo {todo_id} not found or unauthorized for user {current_user.username}")
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(db_todo)
    db.commit()
    logger.info(f"Todo deleted: {todo_id} by user {current_user.username}")
    return {"message": "Todo deleted"}

@router.patch("/todos/{todo_id}", response_model=schemas.Todo)
def update_todo(todo_id: int, completed: bool, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.owner_id == current_user.id).first()
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    db_todo.completed = completed
    db.commit()
    db.refresh(db_todo)
    return db_todo
