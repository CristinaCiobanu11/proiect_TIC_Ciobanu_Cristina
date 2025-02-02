<template>
  <v-container class="align-center justify-center" style="margin-top: 100px;">
    <v-card variant="elevated">
      <!-- Titlu formular -->
      <v-card-title class="text-center text-h5 font-weight-bold">
        Edit Sport
      </v-card-title>

      <v-card-text>
        <v-form fast-fail v-model="form">
        <v-text-field
          v-model="sport.sportName" label="Sport Name" outlined denserequired
        ></v-text-field>

        <v-text-field
          v-model="sport.teamName" label="Team Name" outlined dense required
        ></v-text-field>

        <v-text-field
          v-model="sport.sportBudget" label="Budget" type="number" outlined dense required
        ></v-text-field>

        <!-- Added On -->
        <v-text-field
          v-model="sport.addedOn" label="Added on"
          type="date"
        ></v-text-field>

        <!-- Students (Multiple Select) -->
        <v-select
          :key="students.length"
          label="Students"
          :items="students"
          item-value="id"
          item-title="studentName"
          v-model="selectedStudents"
          multiple
        ></v-select>
      </v-form>
      </v-card-text>

      <!-- Buton de submit -->
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" class="custom-btn" large @click="editSport">Update Sport</v-btn>
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
      sportId: this.$route.params.id,
      sport: {},
      students: [], // Lista de studenți din baza de date
      selectedStudents: [], // Lista de studenți selectați
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {

    convertFirestoreDateToVuetifyDate(firestoreDateString) {
            const firestoreDate = new Date(firestoreDateString);
            const year = firestoreDate.getFullYear();
            const month = String(firestoreDate.getMonth() + 1).padStart(2, '0');
            const day = String(firestoreDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },

    // Fetch studenți din backend
    async fetchStudents() {
        try {
          const response = await axios.get("http://localhost:3000/students");
          setTimeout(() => {  // Evită problema cu redimensionarea
          this.students = response.data.map(student => ({
          id: student.id,
          studentName: student.studentName
        }));
    }, 100);
  } catch (error) {
    console.error("Error fetching students:", error);
  }

    },

    // Adăugare sport nou
    async editSport() {
      if (!this.validateForm()) return; // Validare înainte de a trimite cererea

      // Pregătirea obiectului de sport pentru backend
      const editedSport = {
        sportName: this.sport.sportName,
        teamName: this.sport.teamName,
        sportBudget: Number(this.sport.sportBudget), // Convertire la număr
        addedOn: new Date(this.sport.addedOn), // Format corect pentru Firestore
        students: this.selectedStudents // Lista de studenți selectați
      };

      try {
        const response = await axios.put(`http://localhost:3000/sports/${this.sportId}`, editedSport);
        if (response.status === 200) {
          this.successMessage = "Sport updated successfully!";
          setTimeout(() => {
            this.successMessage = "";
          }, 5000);
          this.errorMessage = "";
        }
      } catch (error) {
        this.successMessage = "";
        this.errorMessage = error.response?.data?.message || "An error occurred!";
        setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        console.error("Error updating sport:", error);
      }
    },

    // Validează formularul înainte de submit
    validateForm() {
      if (!this.sport.sportName || !this.sport.teamName || !this.sport.sportBudget || !this.sport.addedOn) {
        this.errorMessage = "All fields are required!";
        return false;
      }
      return true;
    }
  },
  created() {
    this.fetchStudents();
  },
  mounted() {
        if (this.sportId) {
            axios.get(`http://localhost:3000/sports/${this.sportId}`)
                .then(response => {
                    this.sport = {
                        ...response.data,
                        addedOn: this.convertFirestoreDateToVuetifyDate(response.data.addedOn),
                        students: response.data.students
                    };
                    this.selectedStudents = this.sport.students;
                })
                .catch(error => {
                    console.log(error);
                });
        }
      }
};
</script>
