<template>
  <v-app>
    <NavBar />
    <router-view>
      <Login />
    </router-view>
  </v-app>  
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Login from "@/views/Login";
import store from "@/store";
export default {
  name: "app",
  components: {
    NavBar,
    Login
  },
  created: function() {
    if (!store.getters["userStore/isAuthenticated"]) {
      this.$router.push("/login");
    }
  }
};
</script>



