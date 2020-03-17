<template>
  <v-container>
    <v-row>
      <v-toolbar flat color="sbs" dark>
        <v-toolbar-title>Paso 4 - Condiciones del Negocio</v-toolbar-title>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" max-width="100%" light outlined style="border: none">
          <v-card-title>Intermediario</v-card-title>
          <v-card-subtitle>
            Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
            en demostraciones de tipografías
          </v-card-subtitle>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>Prima</v-subheader>
          </v-col>
          <v-col cols="10">
            <v-text-field label="Total" value="10.00" prefix="$"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>Recargo</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field label="Total" value="10.00" prefix="$"></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field label="Total" value="10.00" prefix="$"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6"></v-col>
          <v-col cols="12" md="6"></v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>Derechos de Póliza</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field label="Total" value="10.00" prefix="%"></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field label="Total" value="10.00" prefix="$"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>I.V.A.</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field label="Total" value="10.00" prefix="%"></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field label="Total" value="10.00" prefix="$"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-subheader>Prima Total.</v-subheader>
          </v-col>
          <v-col cols="5"></v-col>
          <v-col cols="5">
            <v-text-field label="Total" value="10.00" prefix="$"></v-text-field>
          </v-col>
        </v-row>
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
        <v-btn class="ma-2" block outlined color="sbs" @click="stepState({ index: 3 })">
          <v-icon dark left>mdi-arrow-left</v-icon>Volver
        </v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn class="ma-2" block outlined color="sbs" @click="stepState({ index: 1 })">
          Continuar
          <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import store from "@/store";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "formPropertyStore/getField",
  mutationType: "formPropertyStore/updateField"
});

export default {
  name: "Step4",
  data() {
    return {
      headers: [
        {
          text: "Nombre",
          align: "left",
          sortable: false,
          value: "fullNameCompanyName"
        },
        { text: "Porcentaje", value: "sharePercentage" },
        { text: "Moneda de emisión", value: "shareIssueCurrency" },
        { text: "Extra Moneda de emisión", value: "extraShareInIssueCurrency" }
      ]
    };
  },
  components: {},
  computed: {
    ...mapFields({
      desserts: "step4.intermediaries"
    })
  },

  methods: {
    ...mapActions("formPropertyStore", ["stepState", "getIntermediaryPolicy"])
  },

  created: function() {
   // store.dispatch("formPropertyStore/getIntermediaryPolicy");
  }
};
</script>

<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
