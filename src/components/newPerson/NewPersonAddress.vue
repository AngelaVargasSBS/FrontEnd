<template>
  <v-card class="mx-auto">
    <v-card-title>Dirección</v-card-title>
    <v-card-subtitle>Ingrasa tus números de Dirección</v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-autocomplete
              color="white"
              label="Tipo Dirección "
              persistent-hint
              hint="Dirección  usuario *"
              :items="addressTypeDir"
              item-text="field2"
              item-value="field1"
              return-object
              v-model="addresTypeCode"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              color="white"
              label="País"
              persistent-hint
              hint="Seleccione un País *"
              :items="countryCodeDir"
              item-text="field2"
              item-value="field1"
              v-model="countryOfResidence"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              label="Departamento"
              hint="Seleccione un Departamento *"
              persistent-hint
              :items="departmentsDir"
              item-text="field3"
              item-value="field2"
              v-model="departmentOfResidence"
              color="white"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              color="white"
              label="Municipio"
              hint="Seleccione un Municipio *"
              persistent-hint
              :items="municipalityCodeDir"
              item-text="field4"
              item-value="field3"
              v-model="municipalityOfResidence"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              label="Dirección"
              hint="dirección  usuario (obligatorio)"
              persistent-hint
              v-model="addressForm"
            ></v-text-field>
          </v-col>
          <!-- ---------------------- -->
          <v-col cols="12" md="3">
            <v-text-field
              label="Latitud"
              hint="Ingrese el Número de latitud"
              persistent-hint
              v-model="latitudeNumber"
              type="number"
              pattern="/^\d{3}(.\d{1,8})?$/"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Longitud"
              hint="Ingrese el Número de longitud"
              persistent-hint
              v-model="numberLength"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              label="Código Postal"
              hint="Ingrese el Código Postal"
              persistent-hint
              v-model="postalCode"
            ></v-text-field>
          </v-col>
          <!-- ---------------------- -->

          <v-col cols="12" md="1">
            <v-btn class="mx-2" small fab dark color="primary" @click="addNewAddress">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-list three-line>
              <v-list-item v-for="(item, index) in addressNumber" :key="item.id">
                <v-list-item-icon>
                  <v-icon color="indigo">mdi-map-marker</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.addresTypeCode.field2 }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{
                    item.addressForm
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <!-- <v-list-item-icon>
                  <v-btn
                    class="mx-2"
                    small
                    fab
                    dark
                    color="pink"
                    @click="addressNumber.splice(index, 1)"
                  >
                    <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
                </v-list-item-icon>-->
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
  mutationType: "personStore/updateField"
});

export default {
  name: "NewPersonAddress",

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
      addressNumber: [],
      addresTypeCode: "",
      addressForm: "",
      nextTodoId: 0,
      alert: false,
      countryOfResidence: null,
      departmentOfResidence: null,
      municipalityOfResidence: null,
      latitudeNumber: null,
      numberLength: null,
      postalCode: null
    };
  },

  computed: {
    ...mapState("dictionariesPersonStore", [
      "addressTypeDir",
      "countryCodeDir",
      "departmentsDir",
      "municipalityCodeDir"
    ])
  },

  methods: {
    addNewAddress: function() {
      if (this.addresTypeCode != "" && this.addressForm != "") {
        if (this.addressNumber.length > 0) {
          for (const iterator of this.addressNumber) {
            if (
              iterator.addresTypeCode.field1 != this.addresTypeCode.field1 &&
              this.addresTypeCode != "" &&
              this.addressForm != ""
            ) {
              this.addressNumber.push({
                id: this.nextTodoId++,
                addresTypeCode: this.addresTypeCode,
                addressForm: this.addressForm,
                countryCode: this.countryOfResidence,
                departamentCode: this.departmentOfResidence,
                municipalityCode: this.municipalityOfResidence,
                postalCode: this.postalCode,
                lengthNumber: this.numberLength,
                latitudeNumber: this.latitudeNumber
              });
              this.addresTypeCode = "";
              this.addressForm = "";
              this.countryOfResidence = null;
              this.departmentOfResidence = null;
              this.municipalityOfResidence = null;
              this.postalCode = null;
              this.numberLength = null;
              this.latitudeNumber = null;

              let counterArray = this.nextTodoId;
              counterArray = counterArray - 1;
              store
                .dispatch("personStore/postNewPersonAddress", {
                  data: this.addressNumber[counterArray]
                })
                .then(
                  response => {
                    this.$swal({
                      position: "center",
                      icon: "success",
                      title: "Muy bien",
                      text: "Usuario creado continúe por favor.",
                      showConfirmButton: false,
                      timer: 4000
                    });
                    this.e6 = 2;
                  },
                  error => {
                    this.$swal({
                      position: "center",
                      icon: "error",
                      title: "Muy mal Error: " + error.data.status.code,
                      text: error.data.status.message,
                      showConfirmButton: false,
                      timer: 4000
                    });
                  }
                );
            } else {
              this.$swal({
                position: "center",
                icon: "error",
                title: "Muy mal Error: ",
                text: "El tipo ya existe",
                showConfirmButton: false,
                timer: 4000
              });
              this.addresTypeCode = "";
              this.addressForm = "";
            }
          }
        } else {
          this.addressNumber.push({
            id: this.nextTodoId++,
            addresTypeCode: this.addresTypeCode,
            addressForm: this.addressForm,
            countryCode: this.countryOfResidence,
            departamentCode: this.departmentOfResidence,
            municipalityCode: this.municipalityOfResidence,
            postalCode: this.postalCode,
            lengthNumber: this.numberLength,
            latitudeNumber: this.latitudeNumber
          });
          this.addresTypeCode = "";
          this.addressForm = "";
          this.countryOfResidence = null;
          this.departmentOfResidence = null;
          this.municipalityOfResidence = null;
          this.postalCode = null;
          this.numberLength = null;
          this.latitudeNumber = null;

          let counterArray = this.nextTodoId;
          counterArray = counterArray - 1;

          store
            .dispatch("personStore/postNewPersonAddress", {
              data: this.addressNumber[counterArray]
            })
            .then(
              response => {
                this.$swal({
                  position: "center",
                  icon: "success",
                  title: "Muy bien",
                  text: "Usuario creado continúe por favor.",
                  showConfirmButton: false,
                  timer: 4000
                });
                this.e6 = 2;
              },
              error => {
                this.$swal({
                  position: "center",
                  icon: "error",
                  title: "Muy mal Error: " + error.data.status.code,
                  text: error.data.status.message,
                  showConfirmButton: false,
                  timer: 4000
                });
              }
            );
        }
      } else {
        this.$swal({
          position: "center",
          icon: "error",
          title: "Muy mal Error: ",
          text: "Todos los campos son obligatorios",
          showConfirmButton: false,
          timer: 4000
        });
        this.addresTypeCode = "";
        this.addressForm = "";
      }
    }
  },
  created: () => {
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "tipo_direccion",
      fieldSort: "field2",
      dirName: "addressTypeDir"
    });
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "pais",
      fieldSort: "field2",
      dirName: "countryCodeDir"
    });
  },

  watch: {
    countryOfResidence() {
      store.dispatch("dictionariesPersonStore/getDictionaries", {
        typeDictionaries: "departamentos",
        fieldSort: "field3",
        dirName: "departmentsDir",
        filterName: "field1",
        filterCondition: this.countryOfResidence
      });
    },
    departmentOfResidence(newSelectedArray, oldSelectedArray) {
      /* if (newSelectedArray != null && oldSelectedArray != null) {
          if (newSelectedArray.field2 != oldSelectedArray.field2) {
            this.townCode = null;
          }
        } */
      store.dispatch("dictionariesPersonStore/getDictionaries", {
        typeDictionaries: "municipio",
        fieldSort: "field4",
        dirName: "municipalityCodeDir",
        filterName: "field2",
        filterCondition: this.departmentOfResidence
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
