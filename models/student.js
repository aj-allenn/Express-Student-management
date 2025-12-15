import mongoose from "mongoose";



const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  rollNumber: { type: String, required: true, trim: true, unique: true },
  subject1: { type: Number, required: true, min: 0 },
  subject2: { type: Number, required: true, min: 0 },
  subject3: { type: Number, required: true, min: 0 }
});

export default mongoose.model("Student", studentSchema);

