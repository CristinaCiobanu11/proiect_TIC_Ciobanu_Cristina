<template>
  <v-container class="fill-height">
    <v-row align="center" justify="space-between">
      <v-col cols="12" class="d-flex justify-between align-center">
        <!-- Header-ul paginii -->
        <h1 class="text-center header-title">Sports</h1>
        <!-- Buton "Add Sport" -->
        <v-btn
          color="black"
          class="add-sport-btn"
          @click="navigateToAdd"
          large
        >
          Add Sport
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col
        v-for="sport in sports"
        :key="sport.id"
        cols="12"
        sm="8"
        md="6"
      >
        <v-card class="ma-4 pa-4" outlined>
          <!-- Titlul sportului -->
          <v-card-item class="text-center">
            <h3 class="text-h5 font-weight-bold">
              {{ sport.sportName || 'Unnamed sport' }}
            </h3>
          </v-card-item>

          <!-- Subtitlu: Numele echipei -->
          <v-card-item class="text-center">
            <p><strong>Team Name:</strong> {{ sport.teamName || 'No team' }}</p>
          </v-card-item>

          <!-- Text principal: Buget și studenți -->
          <v-card-item class="text-center">
            <p><strong>Budget:</strong> {{ formatCurrency(sport.sportBudget) || 'No budget' }}</p>
          
            <p><strong>Students:</strong>
              <ul>
                <li v-for="(student, sIndex) in sport.students" :key="sIndex">
                  {{ student }}
                </li>
              </ul>
            </p>
          
          </v-card-item>

          <!-- Butoane Edit și Delete -->
          <v-card-actions class="d-flex justify-end">
            <v-btn
              color="black"
              text
              @click="navigateToEdit(sport.id)"
            >
              Edit
            </v-btn>
            <v-btn
              color="error"
              text
              @click="deleteSport(sport.id)"
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
import axios from "axios";

export default {
  data() {
    return {
      sports: [],
    };
  },
  methods: {

    // Navigare la pagina de edit
    navigateToEdit(sportId) {
      this.$router.push(`/sports/edit/${sportId}`);
    },

    // Navigare la pagina de adăugare sport
    navigateToAdd() {
      this.$router.push("/sports/add");
    },

    // Ștergerea unui sport din backend
    async deleteSport(sportId) {
      try {
        await axios.delete(`http://localhost:3000/sports/${sportId}`);
        // Elimină sportul șters din lista locală
        this.sports = this.sports.filter((sport) => sport.id !== sportId);
      } catch (error) {
        console.error("Error deleting sport:", error);
      }
    },


    fetchSports() {
  axios.get('http://localhost:3000/sports')
    .then(response => {
      const promises = response.data.map(sport => {
        return Promise.all(sport.students.map(studentId => {
          return this.fetchStudentName(studentId);
        })).then(students => ({
          ...sport,
          students: students.filter(student => student !== null) // Filtrăm pentru a elimina eventualele valori null
        }));
      });

      return Promise.all(promises);
    })
    .then(sports => {
      this.sports = sports;
      console.log("Am primit răspuns pe mounted", this.sports); // Adaugăm console.log după ce am primit și setat sports
    })
    .catch(error => {
      console.log(error);
    });
},

fetchStudentName(studentId) {
  return axios.get(`http://localhost:3000/students/${studentId}`)
    .then(response => response.data.studentName)
    .catch(error => {
      console.log(`Error fetching student with id ${studentId}:`, error);
      return null;
    });
},



    // Format pentru afișarea bugetului
    formatCurrency(value) {
      if (value) {
        return new Intl.NumberFormat("ro-RO", {
          style: "currency",
          currency: "RON",
        }).format(value);
      }
      return "No budget";
    },
  },
  created() {
    this.fetchSports();
  },
};
</script>

<style scoped>
/* Stil pentru header */
.header-title {
  margin-top: 45px;
  margin-left: 540px;
  font-size: 32px;
  font-weight: bold;
  color: black;
}

/* Stil pentru butonul "Add Sport" */
.add-sport-btn {
  margin-top: 45px;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
  margin-left: 540px;
}
</style>
