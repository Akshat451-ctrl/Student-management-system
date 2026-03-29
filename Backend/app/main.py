from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schema.student import Student, StudentUpdate
from service.student_service import load_data, save_data, add_student_to_db
from uuid import uuid4


app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173",
        "http://localhost:3000",  # Alternative dev port
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/students")
def get_students():
    return load_data()

@app.post("/students")
def create_student(student: Student):
    student_dict = student.model_dump(exclude_none=True)
    
    # Convert UUID to string if present
    if student_dict.get("id"):
        student_dict["id"] = str(student_dict["id"])
    else:
        student_dict["id"] = str(uuid4())
    
    try:
        return add_student_to_db(student_dict)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.delete("/students/{roll_no}")
def delete_student(roll_no:int):
    data = load_data()
    student = next((s for s in data if s["roll_no"] == roll_no), None)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    data.remove(student)
    save_data(data)
    return {"detail": "Student deleted successfully"}

@app.put('/students/{roll_no}')
def update_student(roll_no: int, student: StudentUpdate):
    data = load_data()
    existing_student = next((s for s in data if s["roll_no"] == roll_no), None)
    if existing_student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    
    updated_data = student.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        existing_student[key] = value
    
    save_data(data)
    return existing_student