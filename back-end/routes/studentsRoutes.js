const express = require('express');
const db = require('../db/database');
const router = express.Router();

// Servicii pentru colecția STUDENTS
const StudentsService = {
  async addStudent(student) {
    const docRef = await db.collection('students').add(student);
    return { id: docRef.id, ...student };
  },

  async getStudents() {
    const snapshot = await db.collection('students').get();
    const students = [];
    snapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });
    return students;
  },

  async getStudentById(id) {
    const doc = await db.collection('students').doc(id).get();
    if (!doc.exists) {
      throw new Error('Student not found');
    }
    const studentData = doc.data();
    return { 
      // id: doc.id, 
      ...studentData, 
      enrollmentDate: studentData?.enrollmentDate?.toDate() 
    };
  },

  async updateStudent(id, student) {
    await db.collection('students').doc(id).update(student);
  },

  async deleteStudent(id) {
    await db.collection('students').doc(id).delete();
  },
};

// Rute pentru operații pe colecția STUDENTS

// Extragerea tuturor studenților
router.get('/', async (req, res) => {
  try {
    const students = await StudentsService.getStudents();
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Extragerea unui student pe baza ID-ului
router.get('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await StudentsService.getStudentById(studentId);
    res.status(200).send(student);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Adăugarea unui student nou
router.post('/', async (req, res) => {
  try {
    const student = req.body;
    student.enrollmentDate = new Date(student.enrollmentDate);
    const newStudent = await StudentsService.addStudent(student);
    res.status(201).send(newStudent);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Editarea unui anumit student
router.put('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = req.body;
    student.enrollmentDate = new Date(student.enrollmentDate); // Conversie la Date
    await StudentsService.updateStudent(studentId, student);
    res.status(200).send({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Ștergerea unui anumit student
router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    await StudentsService.deleteStudent(studentId);
    res.status(200).send({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
