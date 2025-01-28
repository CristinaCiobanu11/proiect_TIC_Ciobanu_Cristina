<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" max-width="400">
      <!-- Formular de signup -->
      <v-card-title class="text-center text-h5 font-weight-bold">
        Signup
      </v-card-title>
      <v-card-text>
        <!-- Nume utilizator -->
        <v-text-field
          v-model="userName"
          label="Name"
          type="name"
          outlined
          dense
          required
        ></v-text-field>

        <!-- Email -->
        <v-text-field
          v-model="userEmail"
          label="Email"
          type="email"
          outlined
          dense
          required
        ></v-text-field>

        <!-- Password -->
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
          required
        ></v-text-field>
      </v-card-text>

      <!-- Buton Login -->
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary"  class="custom-signup-btn" large  elevation="3" @click="handleSignup">Signup</v-btn>
      </v-card-actions>

      <!-- Mesaj pentru Sign Up -->
      <v-card-text class="text-center mt-4">
        <p>Already have an account? Proceed to: 
          <router-link to="/login">LOGIN</router-link>
        </p>
      </v-card-text>

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
  name: "SignupPage",
  data() {
    return {
      userName: "",
      userEmail: "", // Email-ul introdus de utilizator
      password: "", // Parola introdusă de utilizator
      errorMessage: "", // Mesaj de eroare pentru login eșuat
      successMessage: ""
    };
  },
  methods: {
    async handleSignup() {
      try {
        // Cerere către backend pentru validarea datelor de login
        const response = await axios.post("http://localhost:3000/users/signup", {
          name: this.userName,
          email: this.userEmail,
          password: this.password,
        });

        if (response.data.success) {
          this.successMessage = response.data.message;
          //this.$router.push("/login");
        }
        
      } catch (error) {
      
// Verifică dacă răspunsul conține un mesaj specific
if (error.response && error.response.data && error.response.data.message) {
  this.errorMessage = error.response.data.message; // Afișează mesajul specific de eroare
} else {
  // Dacă nu există un mesaj specific, afișează un mesaj generic
  this.errorMessage = "Something went wrong. Please try again.";
}

console.error("Signup error:", error); // Log detaliat în consola browser-ului
}

    },
  },
};


</script>

<style scoped>
.custom-signup-btn {
  font-size: 18px; /* Mărește dimensiunea textului */
  font-weight: bold; /* Face textul mai gros */
  border-radius: 8px; /* Rotunjirea marginilor */
  padding: 12px 24px; /* Adaugă spațiu interior */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Animare pe hover */
}

.custom-signup-btn:hover {
  transform: scale(1.05); /* Efect de mărire pe hover */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Umbră mai mare pe hover */
}

/* Centrare verticală și stil pentru formular */
.fill-height {
  height: 100vh;
}

.text-danger {
  color: red;
  font-weight: bold;
}
</style>
