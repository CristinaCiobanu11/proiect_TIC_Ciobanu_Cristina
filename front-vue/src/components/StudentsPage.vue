<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" dense>
      <v-col cols="12">
        <h1 class="text-center mb-4">Students</h1>
      </v-col>
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