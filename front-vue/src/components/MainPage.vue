<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" dense>
      <!-- Card pentru Sports -->
      <v-col cols="12" sm="6" md="4">
      
          <v-card class="ma-4 pa-4 text-center" to='/sports' router>
          <v-card-item>
            <v-avatar size="100" class="logo-avatar">
              <img :src="require('@/assets/sport.png')" alt="Sport logo" />
            </v-avatar>
          </v-card-item>
          <v-card-item>
            <h3 class="text-h5 font-weight-bold">Sports</h3>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- Card pentru Students -->
      <v-col cols="12" sm="6" md="4">
        <v-card class="ma-4 pa-4 text-center" to='/students' router>
          <v-card-item>
            <v-avatar size="100" class="logo-avatar">
              <img :src="require('@/assets/student.png')" alt="Student logo" />
            </v-avatar>
          </v-card-item>
          <v-card-item>
            <h3 class="text-h5 font-weight-bold">Students</h3>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MainPage",
  methods: {
    
  },
};
</script>

<style scoped>
/* Stiluri pentru carduri */
v-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

v-card:hover {
  transform: scale(1.05); /* Efect de mărire pe hover */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Adaugă umbră pe hover */
}

/* Stiluri pentru avatar și imagini */
.logo-avatar {
  overflow: hidden; /* Asigură că imaginile nu ies din avatar */
}

.logo-avatar img {
  object-fit: cover; /* Imaginile sunt scalate proporțional pentru a umple cercul */
  width: 100%; /* Imaginile ocupă întreaga lățime a avatarului */
  height: 100%; /* Imaginile ocupă întreaga înălțime a avatarului */
  border-radius: 50%; /* Se asigură că imaginile sunt rotunde */
}
</style>
