<template>
  <v-card class="mx-auto">
    <v-card-title>Números Telefónicos</v-card-title>
    <v-card-subtitle>Ingrasa tus números telefónicos</v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-autocomplete
              color="white"
              label="País de residencia"
              persistent-hint
              hint="Seleccione un País *"
              :items="countryCodeDir"
              item-text="field2"
              item-value="field1"
              v-model="countryOfresidence"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              color="white"
              label="Tipo Teléfono "
              persistent-hint
              hint="Teléfono  usuario *"
              :items="phoneTypeDir"
              item-text="field2"
              item-value="field1"
              return-object
              v-model="phoneTypeCode"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Teléfono"
              hint="Teléfono  usuario (obligatorio)"
              persistent-hint
              v-model="phone"
            ></v-text-field>
          </v-col>
          <v-col></v-col>
          <v-col cols="12" md="1">
            <v-btn class="mx-2" small fab dark color="primary" @click="addNewPhone">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-list three-line>
              <v-list-item v-for="(item, index) in telephoneNumbers" :key="item.id">
                <v-list-item-icon>
                  <v-icon color="indigo">mdi-phone</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    {{
                    item.phoneTypeCode.field2
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ item.phone }}</v-list-item-subtitle>
                </v-list-item-content>

                <!-- <v-list-item-icon>
                  <v-btn
                    class="mx-2"
                    small
                    fab
                    dark
                    color="pink"
                    @click="telephoneNumbers.splice(index, 1)"
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
import DictionariesPersonStore from "@/store/globalModules/dictionariesStore";

const { mapFields } = createHelpers({
  getterType: "personStore/getField",
  mutationType: "personStore/updateField"
});

export default {
  name: "NewPersonPhone",

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
      telephoneNumbers: [],
      phoneTypeCode: "",
      countryOfresidence: "",
      phone: "",
      nextTodoId: 0,
      alert: false
    };
  },

  computed: {
    /*  ...mapFields({
      phoneTypeCode: "phonePerson.phoneTypeCode",
      phone: "phonePerson.phone",
    }), */

    ...mapState("dictionariesPersonStore", ["phoneTypeDir", "countryCodeDir"])
  },

  methods: {
    addNewPhone: function() {
      if (this.phoneTypeCode != "" && this.phone != "") {
        if (this.telephoneNumbers.length > 0) {
          for (const iterator of this.telephoneNumbers) {
            if (
              iterator.phoneTypeCode.field1 != this.phoneTypeCode.field1 &&
              this.phoneTypeCode != "" &&
              this.phone != ""
            ) {
              this.telephoneNumbers.push({
                id: this.nextTodoId++,
                phoneTypeCode: this.phoneTypeCode,
                phone: this.phone,
                countryCode: this.countryOfresidence
              });
              this.countryOfresidence = null;
              this.phoneTypeCode = "";
              this.phone = "";

              let counterArray = this.nextTodoId;
              counterArray = counterArray - 1;
              store
                .dispatch("personStore/postNewPersonPhone", {
                  data: this.telephoneNumbers[counterArray]
                })
                .then(
                  response => {
                    this.$swal({
                      position: "center",
                      icon: "success",
                      title: "Muy bien",
                      text: "teléfono guardado.",
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
              this.phoneTypeCode = "";
              this.phone = "";
            }
          }
        } else {
          this.telephoneNumbers.push({
            id: this.nextTodoId++,
            phoneTypeCode: this.phoneTypeCode,
            phone: this.phone,
            countryCode: this.countryOfresidence
          });
          this.phoneTypeCode = "";
          this.phone = "";
          this.countryOfresidence = null;

          let counterArray = this.nextTodoId;
          counterArray = counterArray - 1;

          store
            .dispatch("personStore/postNewPersonPhone", {
              data: this.telephoneNumbers[counterArray]
            })
            .then(
              response => {
                this.$swal({
                  position: "center",
                  icon: "success",
                  title: "Muy bien",
                  text: "teléfono guardado.",
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
        this.phoneTypeCode = "";
        this.phone = "";
      }
    }
  },
  created: () => {
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "tipo_telefono",
      fieldSort: "field2",
      dirName: "phoneTypeDir"
    });
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "pais",
      fieldSort: "field2",
      dirName: "countryCodeDir"
    });
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
