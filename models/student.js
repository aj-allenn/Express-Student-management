import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  subject1: { type: Number, required: true, min: 0 },
  subject2: { type: Number, required: true, min: 0 },
  subject3: { type: Number, required: true, min: 0 }
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  rollNumber: { type: String, required: true, trim: true, unique: true },
  marks: { type: marksSchema, required: true },
}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);
export default Student;

