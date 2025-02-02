<template>
  <v-container class="align-center justify-center" style="margin-top: 100px;">
    <v-card variant="elevated">
      <!-- Titlu formular -->
      <v-card-title class="text-center text-h5 font-weight-bold">
        Student : {{ student.studentName }}
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
        <v-btn color="primary" class="custom-btn" large @click="editStudent">Update Student</v-btn>
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
      studentId: this.$route.params.id,
      student: {},
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    
    convertFirestoreDateToVuetifyDate(firestoreDateString) {
            if (!firestoreDateString) return "";
            const firestoreDate = new Date(firestoreDateString);
            const year = firestoreDate.getFullYear();
            const month = String(firestoreDate.getMonth() + 1).padStart(2, '0');
            const day = String(firestoreDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
       
    

     // Actualizare student în baza de date
     async editStudent() {
      if (!this.validateForm()) return; // Validare înainte de a trimite cererea

      try {

        // Convertire data înapoi la format Firestore-friendly
        const updatedStudent = {
          ...this.student,
          enrollmentDate: new Date(this.student.enrollmentDate)
        };

        const response = await axios.put(`http://localhost:3000/students/${this.studentId}`, updatedStudent);
        if (response.status===200){
          this.successMessage = "Student updated successfully!";
          setTimeout(() => {
            this.successMessage = "";
        }, 5000);
        this.errorMessage = "";
        }
      } catch (error) {
        console.error("Error updating student:", error);
        this.successMessage = "";
        this.errorMessage = error.response?.data?.message || "An error occurred!";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
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


  },

  mounted(){
    // Fetch student details based on ID
    if (this.studentId) {
            axios.get(`http://localhost:3000/students/${this.studentId}`)
                .then(response => {
                    this.student = {
                        ...response.data,
                        enrollmentDate: this.convertFirestoreDateToVuetifyDate(response.data.enrollmentDate)
                    };
                })
                .catch(error => {
                    console.log(error);
                });
        } 
    }
  
};
</script>
