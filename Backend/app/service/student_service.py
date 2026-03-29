import json
from pathlib import Path
from typing import List, Dict
from uuid import UUID


# Custom JSON Encoder to handle UUID
class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return str(obj)
        return super().default(obj)


Data_File = Path(__file__).parent.parent / "data" / "students.json"


def load_data() -> List[Dict]:
    if not Data_File.exists():
        return []
    try:
        with open(Data_File, "r") as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except json.JSONDecodeError:
        # If file is corrupted, reset it
        save_data([])
        return []
    

def save_data(data: List[Dict]) -> None:
    # Ensure directory exists
    Data_File.parent.mkdir(parents=True, exist_ok=True)
    with open(Data_File, "w") as f:
        json.dump(data, f, indent=4, cls=UUIDEncoder)


def add_student_to_db(student:Dict):
    data = load_data()
    if any(s["roll_no"] == student["roll_no"] for s in data):
        raise ValueError(f"Student with roll number {student['roll_no']} already exists.")
    data.append(student)
    save_data(data)
    return student