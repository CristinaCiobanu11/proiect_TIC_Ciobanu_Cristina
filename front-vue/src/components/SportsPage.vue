<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <h1 class="text-center header-title mb-4">Sports</h1>
      </v-col>
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
            <p><strong>Students:</strong> {{ sport.students?.join(', ') || 'No students' }}</p>
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
      sports: [],
    };
  },
  methods: {
    async fetchSports() {
      try {
        const response = await axios.get('http://localhost:3000/sports');
        this.sports = response.data || [];
      } catch (error) {
        console.error('Error fetching sports:', error);
        this.sports = [];
      }
    },
    formatCurrency(value) {
      if (value) {
        return new Intl.NumberFormat('ro-RO', {
          style: 'currency',
          currency: 'RON',
        }).format(value);
      }
      return 'No budget';
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
  margin-top: 40px; /* Spațiu sub toolbar */
  font-size: 32px;
  font-weight: bold;
  color:black;
}
</style>