<template>
  <v-app>
    <!-- Toolbar roz, întins pe toată lățimea -->
    <v-toolbar app class="custom-toolbar">
      <!-- Butoane pentru navigare în stânga -->
      <v-btn text to="/about"  class="custom-btn">About</v-btn>
      <v-btn text to="/sports" class="custom-btn">Sports</v-btn>
      <v-btn text to="/students" class="custom-btn">Students</v-btn>
      <!-- Spacer pentru separare -->
      <v-spacer></v-spacer>
      <!-- Buton Logout în dreapta -->
      <v-btn text class="logout-btn">Logout</v-btn>
    </v-toolbar>

    <!-- Conținut principal -->
    <v-main class="main-background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* Stiluri personalizate pentru toolbar */
.custom-toolbar {
  background-color: #ffb6c1 !important; /* Roz pal */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Umbră subtilă */
  width: 100%; /* Toolbar-ul ocupă întreaga lățime */
  height: 7%;
  position: fixed; /* Toolbar-ul rămâne fix */
  top: 0; /* Lipit de partea superioară */
  z-index: 1000; /* Asigură că rămâne deasupra altor elemente */
}

/* Butoane personalizate */
.custom-btn {
  color: black !important; /* Text alb */
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 16px; 
}

.logout-btn {
  color: black !important; /* Text alb */
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 16px; /* Spațiu spre marginea dreaptă */
}

/* Fundal transparent pe v-main */
.main-background {
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)),
              url('@/assets/wallpaper.png') no-repeat center center fixed;
  background-size: cover; /* Fundalul acoperă întreaga zonă */
  height: 100%; /* Înălțimea completă */
  width: 100%; /* Lățimea completă */
}


/* Adaugă spațiu sub toolbar pentru conținut */
v-main {
  padding-top: 64px; /* Înălțimea toolbar-ului */
}
</style>
