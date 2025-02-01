<template>
  <v-container class="align-center justify-center" style="margin-top: 100px;">
    <v-card variant="elevated">
      <!-- Titlu formular -->
      <v-card-title class="text-center text-h5 font-weight-bold">
        Add a New Student
      </v-card-title>

      <v-card-text>
        <v-form fast-fail v-model="form">
        
        <v-text-field
          v-model="student.studentName" label="Name" outlined dense required
        ></v-text-field>

        <v-text-field
          v-model="student.studentEmail" label="Email" outlined dense required
        ></v-text-field>

        <v-text-field
          v-model="student.major" label="Major" outlined dense required
        ></v-text-field>

        <v-text-field
          v-model="student.enrollmentDate" label="Enrollment Date" outlined dense required
          type="date"
        ></v-text-field>

        <v-text-field
          v-model="student.studentPhoneNumber" label="Phone Number" outlined dense required
        ></v-text-field>

      </v-form>
    </v-card-text>

      <!-- Buton de submit -->
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" class="custom-btn" large @click="addStudent">Add Student</v-btn>
      </v-card-actions>

      <!-- Mesaj de succes -->
      <v-card-text v-if="successMessage" class="text-center text-success">
        {{ successMessage }}
      </v-card-text>

      <!-- Mesaj de eroare -->
      <v-card-text v-if="errorMessage" class="text-center text-danger">
        {{ errorMessage }}
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      student: {},
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    
    // Adăugare sport nou
    async addStudent() {
      if (!this.validateForm()) return; // Validare înainte de a trimite cererea

      // Pregătirea obiectului de sport pentru backend
      const newStudent = {
        studentName: this.student.studentName,
        studentEmail: this.student.studentEmail,
        studentPhoneNumber: this.student.studentPhoneNumber,
        enrollmentDate: new Date(this.student.enrollmentDate).toISOString(), // Format corect pentru Firestore
        major: this.student.major // Lista de studenți selectați
      };

      try {
        const response = await axios.post("http://localhost:3000/students", newStudent);
        if (response.status === 201) {
          this.successMessage = "Student added successfully!";
          setTimeout(() => {
            this.successMessage = "";
          }, 5000);
          this.errorMessage = "";
          this.resetForm();
        }
      } catch (error) {
        this.successMessage = "";
        this.errorMessage = error.response?.data?.message || "An error occurred!";
        setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        console.error("Error adding student:", error);
      }
    },

    // Validează formularul înainte de submit
    validateForm() {
      if (!this.student.studentName || !this.student.studentEmail || !this.student.studentPhoneNumber || !this.student.enrollmentDate || !this.student.major) {
        this.errorMessage = "All fields are required!";
        return false;
      }
      return true;
    },

    
    resetForm() {
      this.student = {
        studentName: "",
        studentEmail: "",
        phoneNumber: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
        major: ""
      };
    }
  },
  created() {
    
  }
};
</script>
