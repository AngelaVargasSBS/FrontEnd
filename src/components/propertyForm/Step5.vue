<template>
  <v-container>
    <v-row>
      <v-toolbar flat color="sbs" dark>
        <v-toolbar-title>Movimientos Poliza</v-toolbar-title>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" max-width="100%" light outlined style="border: none">
          <v-card-title>Historial movimientos (endosos) poliza</v-card-title>
          <v-card-subtitle></v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="eventsPolicy"
                  sort-by="calories"
                  class="elevation-1"
                >
                  <template v-slot:item.action="{ item }">
                    <v-btn class="ma-2" outlined small color="sbs" @click="editEventPolicy(item)">
                      <v-icon small class="mr-2">fas fa-edit</v-icon>Editar
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="12" md="4">
        <v-btn class="ma-2" block outlined color="sbs">
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn class="ma-2" block outlined color="sbs" @click="stepState(4)">
          <v-icon dark left>mdi-arrow-left</v-icon>Volver
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import store from "@/store";

export default {
  name: "Step5",
  data() {
    return {
      e6: 1,
      dialog: false,
      headers: [
        {
          text: "Tipo Evento",
          align: "left",
          sortable: true,
          value: "eventName"
        },
        { text: "SubEvento", value: "subEventName" },
        { text: "Número Evento", value: "eventNumber" },
        { text: "Inicio Vigencia", value: "dateFrom" },
        { text: "Fin Vigencia", value: "dateUpTo" },
        { text: "Opciones", value: "action", sortable: false }
      ],
      eventsPolicy: [
        {
          eventName: "EXTENSION DE VIGENCIA",
          eventCode: 8,
          subEventName: "EXTENSION CON COBRO DE PRIMA",
          subEventCode: 1,
          eventNumber: 1,
          dateFrom: "2020-02-20",
          dateUpTo: "2021-02-20"
        },
        {
          eventName: "ENDOSO DE INCLUSION",
          eventCode: 2,
          subEventName: "AUMENTO SUMA ASEGURADA",
          subEventCode: 6,
          eventNumber: 2,
          dateFrom: "20/02/2020",
          dateUpTo: "20/02/2021"
        }
      ],
      editedIndex: -1
    };
  },
  methods: {
    editEventPolicy(item) {
      store.commit("formPropertyStore/setPolicyData", {
        validityDateFrom: item.dateFrom,
        validityDateUpTo: item.dateUpTo,
        typeEvent: item.eventCode,
        typeSubEvent: item.subEventCode
      });

      store.commit("formPropertyStore/stepState", { numberStep: "1" });
    }
  }
};
</script>

<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
