<template>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card class="pa-6" max-width="400">
        <!-- Formular de login -->
        <v-card-title class="text-center text-h5 font-weight-bold">
          Login
        </v-card-title>
        <v-card-text>
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
          <v-btn color="primary" class="custom-login-btn" large  elevation="3" @click="handleLogin">Login</v-btn>
        </v-card-actions>
  
        <!-- Mesaj pentru Sign Up -->
        <v-card-text class="text-center mt-4">
          <p>You don't have an account? 
            <router-link to="/signup">Sign Up</router-link>
          </p>
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
    name: "LoginPage",
    data() {
      return {
        userEmail: "", // Email-ul introdus de utilizator
        password: "", // Parola introdusă de utilizator
        errorMessage: "", // Mesaj de eroare pentru login eșuat
      };
    },
    methods: {
      async handleLogin() {
        try {
          // Cerere către backend pentru validarea datelor de login
          const response = await axios.post("http://localhost:3000/users/login", {
            email: this.userEmail,
            password: this.password,
          });
  
          if (response.data.success) {
            // Login reușit -> redirecționează utilizatorul la "/"
            this.$router.push("/");
          }
          
        } catch (error) {
        
  // Verifică dacă răspunsul conține un mesaj specific
  if (error.response && error.response.data && error.response.data.message) {
    this.errorMessage = error.response.data.message; // Afișează mesajul specific de eroare
  } else {
    // Dacă nu există un mesaj specific, afișează un mesaj generic
    this.errorMessage = "Something went wrong. Please try again.";
  }

  console.error("Login error:", error); // Log detaliat în consola browser-ului
}

      },
    },
  };


  </script>
  
  <style scoped>
.custom-login-btn {
  font-size: 18px; /* Mărește dimensiunea textului */
  font-weight: bold; /* Face textul mai gros */
  border-radius: 8px; /* Rotunjirea marginilor */
  padding: 12px 24px; /* Adaugă spațiu interior */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Animare pe hover */
}

.custom-login-btn:hover {
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
  