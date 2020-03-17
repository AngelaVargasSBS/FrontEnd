<template>
  <v-form m-5>
    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto"
          max-width="100%"
          light
          outlined
          style="border: none"
        >
          <v-card-title>Propiedad</v-card-title>
          <v-card-subtitle>
            Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
            en demostraciones de tipografías
          </v-card-subtitle>
          <v-card-text>
            <!-- ******************************* -->
            <v-stepper v-model="e6">
              <v-stepper-header>
                <v-stepper-step color="sbs" :complete="e6 > 1" step="1">
                  Información Principal
                  <small>Esta información es obligatoria</small>
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step color="sbs" :complete="e6 > 2" step="2">
                  Información del Inmueble
                  <small>Esta información es obligatoria</small>
                </v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card color="grey lighten-5" class="mb-12">
                    <div class="m-3">
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-autocomplete
                            color="white"
                            label="País"
                            persistent-hint
                            hint="Seleccione un País *"
                            :items="countryCodeDir"
                            item-text="field2"
                            v-model="countryCode"
                            :value="countryCode"
                            return-object
                            :error-messages="countryCodeError"
                            @input="$v.countryCode.$touch()"
                            @blur="$v.countryCode.$touch()"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-autocomplete
                            label="Departamento"
                            hint="Ingrese el Departamento *"
                            persistent-hint
                            :items="departmentsDir"
                            item-text="field3"
                            v-model="departamentCode"
                            :value="departamentCode"
                            return-object
                            :error-messages="departamentCodeError"
                            @input="$v.departamentCode.$touch()"
                            @blur="$v.departamentCode.$touch()"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-autocomplete
                            color="white"
                            label=" Municipio"
                            persistent-hint
                            hint="Seleccione un Municipio *"
                            :items="townCodeDir"
                            item-text="field4"
                            v-model="townCode"
                            :value="townCode"
                            return-object
                            :error-messages="townCodeError"
                            @input="$v.townCode.$touch()"
                            @blur="$v.townCode.$touch()"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-switch
                            color="sbs"
                            v-model="urban"
                            label="Urbano"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" md="5">
                          <v-text-field
                            label="Dirección"
                            hint="Ingrese la Dirección *"
                            persistent-hint
                            v-model="address"
                            :value="address"
                            :error-messages="addressError"
                            @input="$v.address.$touch()"
                            @blur="$v.address.$touch()"
                            counter=""
                          ></v-text-field>
                        </v-col>
                        <v-col v-if="!urban" cols="12" md="5">
                          <v-text-field
                            label="Dirección Complementaria"
                            hint="Ingrese la Dirección  con comentarios"
                            persistent-hint
                            v-model="complementaryAddress"
                            :value="complementaryAddress"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row v-if="urban">
                        <v-col cols="12" md="12">
                          <v-divider></v-divider>
                          <v-card-title>Generador de Dirección</v-card-title>
                          <v-card-subtitle>
                            Por favor rellene los campos necesarios para generar
                            la dirección *.
                          </v-card-subtitle>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-autocomplete
                            color="white"
                            label="Tipo Via"
                            persistent-hint
                            hint=""
                            :items="streetTypeDir"
                            item-text="field2"
                            v-model="streetTypeCode"
                            :value="streetTypeCode"
                            return-object
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="1">
                          <v-text-field
                            label="Num."
                            hint=""
                            persistent-hint
                            v-model="street1"
                            :value="street1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-text-field
                            label="Letra"
                            hint=""
                            persistent-hint
                            v-model="street1Complement"
                            :value="street1Complement"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-autocomplete
                            color="white"
                            label="Tipo"
                            persistent-hint
                            hint=""
                            :items="streetTypeDir"
                            item-text="field2"
                            v-model="intersectionStreetTypeCode"
                            :value="intersectionStreetTypeCode"
                            return-object
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-text-field
                            label="Num."
                            hint=""
                            persistent-hint
                            v-model="street2"
                            :value="street2"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-text-field
                            label="Letra"
                            hint=""
                            persistent-hint
                            v-model="street2Complement"
                            :value="street2Complement"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Dirección normalizada"
                            hint=""
                            persistent-hint
                            disabled
                            v-model="normalizedAddress"
                            :value="normalizedAddress"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4"> </v-col>
                        <v-col cols="12" md="4">
                          <v-btn
                            color="sbs"
                            block
                            outlined
                            @click="dialog = false"
                          >
                            Cerrar
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-btn
                            color="sbs"
                            block
                            outlined
                            @click="stepOneShipment()"
                          >
                            Continue
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-card color="grey lighten-5" class="mb-12">
                    <div class="m-3">
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-autocomplete
                            color="white"
                            label="Año de Construcción"
                            persistent-hint
                            hint="Seleccione un Año"
                            :items="constructionYearDir"
                            item-text="customProperty"
                            v-model="constructionYear"
                            return-object
                            :error-messages="constructionYearError"
                            @input="$v.constructionYear.$touch()"
                            @blur="$v.constructionYear.$touch()"
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Latitud"
                            hint="Ingrese el Número de latitud"
                            persistent-hint
                            v-model="latitudeNumber"
                            :value="latitudeNumber"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Longitud"
                            hint="Ingrese el Número de longitud"
                            persistent-hint
                            v-model="numberLength"
                            :value="numberLength"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Código Postal"
                            hint="Ingrese el Código Postal"
                            persistent-hint
                            v-model="postalCode"
                            :value="postalCode"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Número Unidades"
                            hint="Ingrese el Número Unidades"
                            persistent-hint
                            v-model="numberUnits"
                            :value="numberUnits"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-autocomplete
                            color="white"
                            label="Numero de Pisos"
                            persistent-hint
                            hint="Seleccione el Numero de Pisos"
                            :items="numberOfFloorsDir"
                            item-text="customProperty"
                            v-model="numberOfFloors"
                            return-object
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Nombre de la Propiedad"
                            hint="Ingrese el Nombre de la Propiedad"
                            persistent-hint
                            v-model="propertyName"
                            :value="propertyName"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-btn
                            color="sbs"
                            block
                            outlined
                            @click="dialog = false"
                          >
                            Cerrar
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-btn color="sbs" block outlined @click="e6 = 1">
                            Volver
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-btn
                            color="sbs"
                            block
                            outlined
                            @click="(e6 = 2), stepFormSubmission()"
                          >
                            Continue
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
            <!-- ******************************* -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
  between,
  sameAs,
  alpha,
  alphaNum,
  numeric
} from "vuelidate/lib/validators";
import { mapState, mapMutations, mapActions } from "vuex";
import store from "@/store";
import axios from "axios";
import { createHelpers } from "vuex-map-fields";
import DatePickers from "@/components/globalComponents/DatePickers.vue";

const { mapFields } = createHelpers({
  getterType: "formPropertyStore/getField",
  mutationType: "formPropertyStore/updateField"
});

export default {
  name: "Property-controller",

  data() {
    return {
      e6: 1
    };
  },

  components: { DatePickers },
  computed: {
    ...mapFields({
      address: "propertyController.address",
      complementaryAddress: "propertyController.complementaryAddress",
      constructionYear: "propertyController.constructionYear",
      countryCode: "propertyController.countryCode",
      intersectionStreetTypeCode:
        "propertyController.intersectionStreetTypeCode",
      latitudeNumber: "propertyController.latitudeNumber",
      normalizedAddress: "propertyController.normalizedAddress",
      numberLength: "propertyController.numberLength",
      numberOfFloors: "propertyController.numberOfFloors",
      numberUnits: "propertyController.numberUnits",
      departamentCode: "propertyController.departamentCode",
      postalCode: "propertyController.postalCode",
      propertyName: "propertyController.propertyName",
      street1: "propertyController.street1",
      street1Complement: "propertyController.street1Complement",
      street2: "propertyController.street2",
      street2Complement: "propertyController.street2Complement",
      streetTypeCode: "propertyController.streetTypeCode",
      urban: "propertyController.urban",
      townCode: "propertyController.townCode"
    }),

    ...mapState("dictionariesStore", [
      "countryCodeDir",
      "numberOfFloorsDir",
      "constructionYearDir",
      "townCodeDir",
      "departmentsDir",
      "streetTypeDir"
    ]),

    /* validations */
    countryCodeError() {
      const errors = [];
      if (!this.$v.countryCode.$dirty) return errors;
      !this.$v.countryCode.required &&
        errors.push("El campo País es obligatorio");
      return errors;
    },
    departamentCodeError() {
      const errors = [];
      if (!this.$v.departamentCode.$dirty) return errors;
      !this.$v.departamentCode.required &&
        errors.push("El campo Departamento es obligatorio");
      return errors;
    },
    constructionYearError() {
      const errors = [];
      if (!this.$v.constructionYear.$dirty) return errors;
      !this.$v.constructionYear.required &&
        errors.push("El campo Municipio es obligatorio");
      return errors;
    },
    townCodeError() {
      const errors = [];
      if (!this.$v.townCode.$dirty) return errors;
      !this.$v.townCode.required &&
        errors.push("El campo Municipio es obligatorio");
      return errors;
    },
    addressError() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.minLength && errors.push("La dirección es muy corta");
      !this.$v.address.required &&
        errors.push("El campo Dirección es obligatorio");
      return errors;
      console.log(errors);
    }
  },
  watch: {
    countryCode() {
      store.dispatch("dictionariesStore/getDictionaries", {
        typeDictionaries: "departamentos",
        fieldSort: "field3",
        dirName: "departmentsDir",
        filterName: "field1",
        filterCondition: this.countryCode.field1
      });
    },
    departamentCode(newSelectedArray, oldSelectedArray) {
      if (newSelectedArray != null && oldSelectedArray != null) {
        if (newSelectedArray.field2 != oldSelectedArray.field2) {
          this.townCode = null;
        }
      }
      store.dispatch("dictionariesStore/getDictionaries", {
        typeDictionaries: "municipio",
        fieldSort: "field4",
        dirName: "townCodeDir",
        filterName: "field2",
        filterCondition: this.departamentCode.field2
      });
    }
  },

  methods: {
    ...mapMutations("formPropertyStore", ["stepState"]),
    ...mapActions("formPropertyStore", ["postPropertyController"]),

    //validation of mandatory fields

    stepOneShipment() {
      if (
        !this.$v.countryCode.$invalid &&
        !this.$v.departamentCode.$invalid &&
        !this.$v.townCode.$invalid &&
        !this.$v.address.$invalid
      ) {
        this.e6 = 2;
      } else {
        // this.$v.$touch();
        this.$v.countryCode.$touch();
        this.$v.departamentCode.$touch();
        this.$v.townCode.$touch();
        this.$v.address.$touch();
      }
    },
    stepFormSubmission() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.e6 = 1;
        store
          .dispatch("formPropertyStore/postPropertyController")
          .then(response => {
            this.$swal({
              position: "center",
              icon: "success",
              title: "Muy bien",
              text: "Se creo con éxito la propiedad.",
              showConfirmButton: false,
              timer: 4000
            }).catch(e => {
              console.log(e);
            });
          });
      }
    }
  },
  created: function() {
    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "pais",
      fieldSort: "field2",
      dirName: "countryCodeDir"
    });
    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "numero_pisos",
      fieldSort: "field1",
      dirName: "numberOfFloorsDir",
      customObj: true
    });
    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "anio_construccion",
      fieldSort: "field2",
      dirName: "constructionYearDir",
      customObj: true
    });
    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "tipo_calle",
      fieldSort: "field2",
      dirName: "streetTypeDir"
    });
  },
  mixins: [validationMixin],
  validations: {
    countryCode: { required },
    departamentCode: { required },
    townCode: { required },
    address: { required, minLength: minLength(10) },
    constructionYear: { required }
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
