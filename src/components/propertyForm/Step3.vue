<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-toolbar flat color="sbs" dark>
          <v-toolbar-title>Paso 3 - Textos adicionales</v-toolbar-title>
        </v-toolbar>
      </v-col>
      <v-col cols="12">
        <v-col cols="12">
          <vue-editor v-model="bio" />
          {{ bio }}
        </v-col>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-btn class="ma-2" block outlined color="sbs">
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn class="ma-2" block outlined color="sbs" @click="stepState({ index: 2 })">
          <v-icon dark left>mdi-arrow-left</v-icon>
          Volver
        </v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn class="ma-2" block outlined color="sbs" @click="stepState({ index: 4 })">
          Continuar
          <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Step3",
  data() {
    return {
      bio: null,
      selected: [],
      headers: [
        {
          text: "Recargos o Descuentos",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Gpo. Coverturas", value: "gpoToppings" },
        { text: "Cobertura", value: "toppings" },
        { text: "Sección", value: "section" },
        { text: "Prima Coberturas", value: "premiumCoverages" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          gpoToppings: 159,
          toppings: 1,
          section: 24,
          premiumCoverages: 4.0
        }
      ]
    };
  },
  components: {},

  computed: {
  },

  methods: {
    ...mapActions("formPropertyStore", ["stepState"]),
  }
};
</script>

<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
