<template>
  <v-container class="fill-height">
    <v-row align="center" justify="space-between">
      <v-col cols="12" class="d-flex justify-between align-center">
        <h1 class="text-center header-title">Students</h1>
        <v-btn
          color="black"
          class="add-student-btn"
          @click="navigateToAdd"
          large
        >
          Add Student
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col
        v-for="student in students"
        :key="student.id"
        cols="12"
        sm="8"
        md="6"
      >
        <v-card class="ma-4 pa-4" outlined>
          <!-- Numele studentului -->
          <v-card-item class="text-center">
            <h3 class="text-h5 font-weight-bold">
              {{ student.studentName || 'Unnamed student' }}
            </h3>
          </v-card-item>

          <!-- Email-ul studentului -->
          <v-card-item class="text-center">
            <p><strong>Email:</strong> {{ student.studentEmail || 'No email' }}</p>
          </v-card-item>

          <!-- Telefonul și major-ul -->
          <v-card-item class="text-center">
            <p><strong>Phone:</strong> {{ student.studentPhoneNumber || 'No phone number' }}</p>
            <p><strong>Major:</strong> {{ student.major || 'No major' }}</p>
          </v-card-item>

          <!-- Data înscrierii -->
          <v-card-item class="text-center">
            <p><strong>Enrollment Date:</strong> {{ formatTimestamp(student.enrollmentDate) || 'Unknown date' }}</p>
          </v-card-item>

           <!-- Butoane Edit și Delete -->
           <v-card-actions class="d-flex justify-end">
            <v-btn
              color="black"
              text
              @click="navigateToEdit(student.id)"
            >
              Edit
            </v-btn>
            <v-btn
              color="error"
              text
              @click="deleteStudent(student.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      students: [],
      selectedStudent: null,
      dialog: false,
    };
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get('http://localhost:3000/students');
        this.students = response.data || []; // Asigură-te că primești o listă
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },

    navigateToEdit(studentId) {
      this.$router.push(`/students/edit/${studentId}`);
    },

    navigateToAdd() {
      this.$router.push("/students/add");
    },

    async deleteStudent(studentId) {
      try {
        await axios.delete(`http://localhost:3000/students/${studentId}`);
        // Elimină sportul șters din lista locală
        this.students = this.students.filter((student) => student.id !== studentId);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    },

    selectStudent(student) {
      this.selectedStudent = student;
      this.dialog = true;
    },
    formatTimestamp(timestamp) {
      if (timestamp && timestamp._seconds) {
        return new Date(timestamp._seconds * 1000).toLocaleDateString();
      }
      return null;
    },
  },
  created() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
/* Stil pentru header */
.header-title {
  margin-top: 45px;
  margin-left: 520px;
  font-size: 32px;
  font-weight: bold;
  color: black;
}

/* Stil pentru butonul "Add Sport" */
.add-student-btn {
  margin-top: 45px;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
  margin-left: 540px;
}
</style>