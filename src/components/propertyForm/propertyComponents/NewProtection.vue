<template>
  <v-card class="mx-auto">
    <v-card-title>
      Amparos
    </v-card-title>
    <v-card-subtitle>
      Ingrasa un Amparo
    </v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Tipo Amparo"
              hint="Tipo Amparo (obligatorio)"
              persistent-hint
              v-model="riskType"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              label="Valor Asegurado"
              hint="Valor (obligatorio)"
              persistent-hint
              v-model="riskValue"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn
              class="mx-2"
              small
              fab
              dark
              color="primary"
              @click="addNewrisk"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-alert
              :value="alert"
              border="top"
              icon="mdi-home"
              transition="scale-transition"
              prominent
              type="error"
            >
              <v-row align="center">
                <v-col class="grow">
                  Por favor ingrese un tipo de Riesgo y valor válido
                </v-col>
                <v-col class="shrink">
                  <v-btn
                    @click="alert = !alert"
                    class="ma-2"
                    outlined
                    color="white"
                    >Cerrar</v-btn
                  >
                </v-col>
              </v-row>
            </v-alert>
            <v-list three-line>
              <v-list-item
                v-for="(item, index) in riskArrangement"
                :key="item.id"
              >
                <v-list-item-icon>
                  <v-icon color="indigo">fas fa-list</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.riskType }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.riskValue
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-btn
                    class="mx-2"
                    small
                    fab
                    dark
                    color="pink"
                    @click="riskArrangement.splice(index, 1)"
                  >
                    <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapState, mapMutations, mapActions } from "vuex";
import store from "@/store";
import axios from "axios";

import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "personStore/getField",
  mutationType: "personStoree/updateField"
});

export default {
  name: "NewProtection",

  props: ["title", "titles"],

  data() {
    return {
      listProducts: [
        "Products 1",
        "Products 2",
        "Products 3",
        "Products 4",
        "Products 5",
        "Products 6",
        "Products 7"
      ],
      dateFormatted: "",
      modal: false,
      dialog: false,
      riskArrangement: [],
      riskType: "test",
      riskValue: "123",
      nextTodoId: 0,
      alert: false
    };
  },

  computed: {},

  methods: {
    addNewrisk: function() {
      if (this.riskType != "" && this.riskValue != "") {
        this.riskArrangement.push({
          id: this.nextTodoId++,
          riskType: this.riskType,
          riskValue: this.riskValue
        });
        this.riskType = "";
        this.riskValue = "";
      } else {
        this.alert = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
