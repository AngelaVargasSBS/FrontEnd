<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="nameCobertura"
      :single-select="false"
      show-select
      v-model="selected"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Coberturas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="80vw">
            <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template> -->
            <v-card>
              <v-toolbar dense fixed dark color="sbs">
                <v-btn icon dark @click="close">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nameCobertura"
                        label="Nombre Cobertura"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.anniversary"
                        label="Aniversario"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.annualizedRate"
                        label="Tasa anualizada"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.bouquetCode"
                        label="Código de ramo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.coverageCode"
                        label="Código de cobertura"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.dateFrom"
                        label="fecha de"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.dateUp"
                        label="fecha arriba"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.deductibleCode"
                        label="Código deducible"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.extraPercentage"
                        label="Porcentaje extra"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.extraPremiumPercentage"
                        label="Porcentaje prima adicional"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.insuredSumCode"
                        label="Código de suma asegurada"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.insuredSumPercentage"
                        label="Porcentaje de suma asegurada"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.numberItems"
                        label="número de artículos"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.percentageRate"
                        label="Tasa de porcentaje"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.planCode"
                        label="código del plan"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.premiumCoinLocal"
                        label="prima Monedas locales"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.premiumCurrencyEmission"
                        label="prima emisión de divisas"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.riskNumber"
                        label="Número de riesgo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.subBouquetCode"
                        label="Sub Código ramo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.uniqueIdentifier"
                        label="identificador único"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="testBtn" color="sbs" outlined @click="close">
                  Cancel
                </v-btn>
                <v-btn class="testBtn" color="sbs" outlined @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="ma-2" outlined small color="sbs" @click="editItem(item)">
          <v-icon small class="mr-2">fas fa-edit</v-icon>
          Editar
        </v-btn>

        <!-- <v-btn
          class="ma-2"
          outlined
          small
          color="sbs"
          @click="deleteItem(item)"
        >
          <v-icon small class="mr-2">mdi-cancel</v-icon>
          Eliminar
        </v-btn> -->
      </template>
    </v-data-table>
    {{ selected }}
  </div>
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
  mutationType: "personStore/updateField"
});

export default {
  name: "EditCoverage",

  data: () => ({
    dialog: false,
    selected: [],
    headers: [
      {
        text: "Cobertura",
        align: "left",
        sortable: false,
        value: "nameCobertura"
      },
      { text: "Suma asegurada", value: "insuredSumPercentage" },
      { text: "Prima", value: "premiumCoinLocal" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [
      {
        nameCobertura: "test",
        anniversary: 0,
        annualizedRate: 0,
        bouquetCode: 0,
        coverageCode: 0,
        dateFrom: "string",
        dateUp: "string",
        deductibleCode: 1,
        extraPercentage: 0,
        extraPremiumPercentage: 0,
        insuredSumCode: 0,
        insuredSumPercentage: 0,
        numberItems: 0,
        percentageRate: 0,
        planCode: "string",
        premiumCoinLocal: 0,
        premiumCurrencyEmission: 0,
        riskNumber: 0,
        subBouquetCode: 0,
        uniqueIdentifier: 0
      },
      {
        nameCobertura: "test2",
        anniversary: 0,
        annualizedRate: 0,
        bouquetCode: 0,
        coverageCode: 0,
        dateFrom: "string",
        dateUp: "string",
        deductibleCode: 1,
        extraPercentage: 0,
        extraPremiumPercentage: 0,
        insuredSumCode: 0,
        insuredSumPercentage: 0,
        numberItems: 0,
        percentageRate: 0,
        planCode: "string",
        premiumCoinLocal: 0,
        premiumCurrencyEmission: 0,
        riskNumber: 0,
        subBouquetCode: 0,
        uniqueIdentifier: 0
      }
    ],
    editedIndex: -1,
    editedItem: {
      nameCobertura: "string",
      anniversary: 0,
      annualizedRate: 0,
      bouquetCode: 0,
      coverageCode: 0,
      dateFrom: "string",
      dateUp: "string",
      deductibleCode: 0,
      extraPercentage: 0,
      extraPremiumPercentage: 0,
      insuredSumCode: 0,
      insuredSumPercentage: 0,
      numberItems: 0,
      percentageRate: 0,
      planCode: "string",
      premiumCoinLocal: 0,
      premiumCurrencyEmission: 0,
      riskNumber: 0,
      subBouquetCode: 0,
      uniqueIdentifier: 0
    },
    defaultItem: {
      anniversary: 0,
      annualizedRate: 0,
      bouquetCode: 0,
      coverageCode: 0,
      dateFrom: "string",
      dateUp: "string",
      deductibleCode: 0,
      extraPercentage: 0,
      extraPremiumPercentage: 0,
      insuredSumCode: 0,
      insuredSumPercentage: 0,
      numberItems: 0,
      percentageRate: 0,
      planCode: "string",
      premiumCoinLocal: 0,
      premiumCurrencyEmission: 0,
      riskNumber: 0,
      subBouquetCode: 0,
      uniqueIdentifier: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Cobertura" : "Editar Cobertura";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapMutations("formPropertyStore", ["coveragePolicyUpdate"]),
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        var dataCoverage = store.commit(
          "formPropertyStore/coveragePolicyUpdate",
          this.editedItem
        );

        let dataStatus = store.state.formPropertyStore.coverageUpdate;
        dataStatus = dataStatus[dataStatus.length - 1];
        if (
          dataStatus.request.status == 200 &&
          dataStatus.request.response.search("200") != -1
        ) {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Muy bien",
            text: "Se a actualizado con éxito la cobertura.",
            showConfirmButton: false,
            timer: 4000
          });
        } else {
          this.$swal({
            position: "center",
            icon: "error",
            title: "Ha fallado",
            text: "No se a actualizado con éxito la cobertura.",
            showConfirmButton: false,
            timer: 4000
          });
        }
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
