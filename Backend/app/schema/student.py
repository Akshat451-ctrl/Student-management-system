from pydantic import BaseModel ,Field , EmailStr
from typing import Optional , Annotated
from uuid import UUID


class Student(BaseModel):
    id: Optional[UUID] = Field(default=None, description="The unique identifier of the student")
    roll_no: Annotated[int,Field(gt=0, description="The roll number of the student")]
    name:Annotated[str,Field(min_length=3,max_length=100,description="The name of the student")]
    email: EmailStr = Field(description="The email address of the student")
    course:str = Field(..., description="The course the student is enrolled in")


class StudentUpdate(BaseModel):
   name:Optional[str] = None
   email: Optional[EmailStr] = None
   course: Optional[str] = None
