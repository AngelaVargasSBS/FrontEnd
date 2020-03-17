<template>
  <div>
    <v-container class=" lighten-5 ">
      <v-row  justify="center">
        <v-col  md="4">
          <img src="@/assets/images/background/syli.png" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Login from "@/views/Login";
import backgroundSyli from "@/assets/images/background/syli.png";

export default {
  components: {
    Login,
    backgroundSyli
  },
  created: function() {
    window.addEventListener("beforeunload", function(event) {
      event.returnValue = "Confirm Unload!!!";
    });
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
img {
  width: 100%;
  height: auto;
  max-width: 350px;
}
</style>
