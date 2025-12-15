// import Student from "../models/student.js";


// export async function createStudent(req, res, next) {
//   try {
//     const { name, email, rollNumber, marks } = req.body;
//     const student = await Student.create({ name, email, rollNumber, marks });
//     res.status(201).json(student);
//   } catch (err) {
//     next(err);
//   }
// }


// export async function getAllStudents(req, res, next) {
//   try {
//     const students = await Student.find().sort({ createdAt: -1 });
    
//     res.json(students);


//   } catch (err) {
//     next(err);
//   }
// }


// export async function getStudentById(req, res, next) {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.json(student);
//   } catch (err) {
//     next(err);
//   }
// }


// export async function updateStudent(req, res, next) {
//   try {
//     const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });
//     if (!updated) return res.status(404).json({ message: "Student not found" });
//     res.json(updated);
//   } catch (err) {
//     next(err);
//   }
// }


// export async function deleteStudent(req, res, next) {
//   try {
//     const removed = await Student.findByIdAndDelete(req.params.id);
//     if (!removed) return res.status(404).json({ message: "Student not found" });
//     res.json({ message: "Student deleted" });
//   } catch (err) {
//     next(err);
//   }
// }



import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

