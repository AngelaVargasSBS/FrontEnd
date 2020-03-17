<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="80vw" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="sbs" block outlined dark v-on="on">nuevo usuario</v-btn>
      </template>
      <v-card>
        <v-card-title color="sbs">
          <v-toolbar flat color="sbs" dark>
            <v-icon dark>mdi-account</v-icon>
            <v-toolbar-title>Nueva Persona Natural</v-toolbar-title>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <!-- ******************************************** -->
          <v-stepper v-model="e6" non-linear>
            <v-stepper-header>
              <template>
                <v-stepper-step color="sbs" :complete="e6 > 1" step="1">
                  Datos Básicos.
                  <small>Estos datos son obligatorios.</small>
                </v-stepper-step>
                <v-stepper-step color="sbs" :complete="e6 > 2" step="2">
                  Datos Personales
                  <small>Estos datos son obligatorios.</small>
                </v-stepper-step>
                <v-stepper-step color="sbs" :complete="e6 > 3" step="3">
                  Datos Médicos
                  <small>Estos datos son obligatorios.</small>
                </v-stepper-step>
                <v-stepper-step color="sbs" step="4">
                  Datos de Contacto
                  <small>Estos datos son obligatorios.</small>
                </v-stepper-step>
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card color="grey lighten-5" class="mb-12">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="2">
                        <v-switch color="sbs" v-model="naturalPerson" label="Persona Natural" readonly></v-switch>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-text-field
                          label="Nombres"
                          hint="Nombre Completo sin caracteres especiales *"
                          persistent-hint
                          v-model="names"
                          :value="names"
                          counter
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-text-field
                          label="Primer Apellido"
                          hint="Apellido sin caracteres especiales *"
                          persistent-hint
                          v-model="surname"
                          :value="surname"
                          counter
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          label="Segundo Apellido"
                          hint="Apellido sin caracteres especiales *"
                          persistent-hint
                          v-model="secondSurname"
                          :value="secondSurname"
                          counter
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Tipo de Documento"
                          persistent-hint
                          hint="Seleccione un tipo de documento *"
                          :items="typesDocumentDir"
                          item-text="field2"
                          item-value="field1"
                          v-model="typeDocument"
                          :value="typeDocument"
                          :error-messages="typeDocumentError"
                          @input="$v.typeDocument.$touch()"
                          @blur="$v.typeDocument.$touch()"
                          :readonly="readOnlyForm"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          label="Número de Documento"
                          hint="ingrese su número de identificación *"
                          persistent-hint
                          v-model="documentNumber"
                          :value="documentNumber"
                          :error-messages="documentNumberError"
                          @input="$v.documentNumber.$touch()"
                          @blur="$v.documentNumber.$touch()"
                          counter="20"
                          :readonly="readOnlyForm"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <DatePickers
                          labelName="Fecha Expedición Documento"
                          hintText="DD/MM/YYYY"
                          v-model="issueDateDocument"
                          :requiredInput="errors"
                          @inputValueDate="issueDateDocument = $event"
                          :inputValue="issueDateDocument"
                          @input="$v.issueDateDocument.$touch()"
                          @blur="$v.issueDateDocument.$touch()"
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Género"
                          persistent-hint
                          hint="Seleccione un Género *"
                          :items="genderDir"
                          item-text="field2"
                          item-value="field1"
                          v-model="gender"
                          :value="gender"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Origen"
                          persistent-hint
                          hint="Seleccione el Origen *"
                          :items="originSystemDir"
                          item-text="field2"
                          item-value="field1"
                          v-model="origin"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Estado Civil"
                          persistent-hint
                          hint="Seleccione un Estado Civil *"
                          :items="maritalStatusCodeDir"
                          item-text="field2"
                          item-value="field1"
                          v-model="maritalStatusCode"
                          :value="maritalStatusCode"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Actividad Económica"
                          persistent-hint
                          hint="Seleccione una Actividad Económica *"
                          :items="ciiuCodeDir"
                          item-text="field2"
                          item-value="field1"
                          v-model="ciiuCode"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <DatePickers
                          labelName="Fecha nacimiento"
                          hintText="DD/MM/YYYY"
                          persistent-hint
                          v-model="birthDate"
                          @inputValueDate="birthDate = $event"
                          :inputValue="birthDate"
                        />
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Número de Hijos"
                          hint="Seleccione un Número"
                          :items="childrenNumberList"
                          item-text="name"
                          item-value="id"
                          v-model="childrenNumber"
                          :value="childrenNumber"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4"></v-col>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="dialog = false">Cerrar</v-btn>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="stepOneShipment()">Continue</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card color="grey lighten-5" class="mb-12">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="País de Nacimiento"
                          persistent-hint
                          hint="Seleccione un País *"
                          :items="countryCodeDir"
                          item-text="field2"
                          item-value="field1"
                          v-model="countryOfBirth"
                          :value="countryOfBirth"
                          :error-messages="countryOfBirthError"
                          @input="$v.countryOfBirth.$touch()"
                          @blur="$v.countryOfBirth.$touch()"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          label="Departamento de Nacimiento "
                          hint="Seleccione un Departamento *"
                          persistent-hint
                          :items="departmentsDir"
                          item-text="field3"
                          item-value="field2"
                          v-model="birthDepartment"
                          :value="birthDepartment"
                          color="white"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Municipio de Nacimiento "
                          hint="Seleccione un Municipio *"
                          persistent-hint
                          :items="townCodeDirPerson"
                          item-text="field4"
                          item-value="field3"
                          v-model="birthMunicipality"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Estrato"
                          hint="Seleccione un Estrato *"
                          persistent-hint
                          :items="stratumList"
                          item-text="name"
                          item-value="abbr"
                          v-model="stratum"
                          :value="stratum"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                      <v-col cols="12" md="2">
                        <v-switch color="sbs" v-model="employee" label="Empleado"></v-switch>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-text-field
                          label="Profesión Oficio"
                          hint="Ingrese su profesión"
                          persistent-hint
                          v-model="professionProfession"
                          :value="professionProfession"
                          counter
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-text-field
                          label="Digito Verificación NIT"
                          hint="Ingrese el NIT"
                          persistent-hint
                          v-model="nitVerificationDigit"
                          :value="nitVerificationDigit"
                          :rules="nitRules"
                          :counter="1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          label="Razón Social"
                          hint="Ingrese la Razón Social"
                          persistent-hint
                          v-model="fullNameBusinessName"
                          :value="fullNameBusinessName"
                          counter
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="Ocupacion"
                          hint="Seleccione una Ocupacion"
                          persistent-hint
                          :items="occupationTypeDir"
                          item-text="field2"
                          item-value="field1"
                          v-model="occupation"
                          :value="occupation"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="2">
                        <v-switch color="sbs" v-model="habeasData" label="Habeas data"></v-switch>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-switch color="sbs" v-model="currentSarlaft" label="Sarlaft Vigente"></v-switch>
                      </v-col>
                      <v-col cols="12" md="4">
                        <DatePickers
                          labelName="Fecha Formulario Sarlaft"
                          hintText="DD/MM/YYYY"
                          v-model="sarlaftFormDate"
                           @inputValueDate="sarlaftFormDate = $event"
                          :inputValue="sarlaftFormDate"
                        />
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                  </v-container>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="e6 = 1">volver</v-btn>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="dialog = false">Cerrar</v-btn>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="updateSteps(3)">Continue</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card color="grey lighten-5" class="mb-12">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="2">
                        <v-switch
                          color="sbs"
                          v-model="authorizeMedicalHistory"
                          label="Autoriza Historia Clínica"
                        ></v-switch>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          color="white"
                          label="EPS"
                          hint="Seleccione una EPS"
                          :items="epsList"
                          item-text="name"
                          item-value="id"
                          v-model="epsCode"
                          :value="epsCode"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-autocomplete
                          color="white"
                          label="Grupo Sanguíneo"
                          hint="Seleccione un Grupo Sanguíneo"
                          :items="bloodTypeList"
                          item-text="name"
                          item-value="abbr"
                          v-model="bloodType"
                          :value="bloodType"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-autocomplete
                          color="white"
                          label="RH Sanguíneo"
                          hint="Seleccione un RH"
                          :items="rhBloodList"
                          item-text="name"
                          item-value="abbr"
                          v-model="rhSanguineo"
                          :value="rhSanguineo"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          type="number"
                          label="Peso"
                          hint="Ingrese el Peso"
                          suffix="Kg"
                          persistent-hint
                          v-model="weight"
                          :value="weight"
                          :counter="5"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          type="number"
                          label="Estatura"
                          hint="Ingrese la estatura"
                          suffix="M"
                          persistent-hint
                          v-model="height"
                          :value="height"
                          :counter="5"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <DatePickers
                          labelName="Fecha Defunción"
                          hintText="DD/MM/YYYY"
                          v-model="dateOfDeath"
                           @inputValueDate="dateOfDeath = $event"
                          :inputValue="dateOfDeath"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="e6 = 2">volver</v-btn>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="dialog = false">Cerrar</v-btn>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="updateSteps(4)">Continue</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-card color="grey lighten-5" class="mb-12">
                  <v-container>
                    <br />
                    <NewPersonPhone></NewPersonPhone>
                    <br />
                    <NewPersonAddress></NewPersonAddress>
                  </v-container>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="e6 = 3">volver</v-btn>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn color="sbs" block outlined @click="dialog = false">Cerrar</v-btn>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn
                          color="sbs"
                          block
                          outlined
                          @click="(e6 = 1), (dialog = false)"
                        >Guardar</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <!-- ******************************************** -->

          <small>* Indica campo requerido</small>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
  numeric
} from "vuelidate/lib/validators";
import { mapState, mapMutations, mapActions } from "vuex";
import store from "@/store";
import axios from "axios";

import NewPersonPhone from "@/components/newPerson/NewPersonPhone.vue";
import NewPersonAddress from "@/components/newPerson/NewPersonAddress.vue";

import { createHelpers } from "vuex-map-fields";

import DatePickers from "@/components/globalComponents/DatePickers.vue";
import DictionariesPersonStore from "@/store/globalModules/dictionariesStore";

const { mapFields } = createHelpers({
  getterType: "personStore/getField",
  mutationType: "personStore/updateField"
});

export default {
  name: "NewPerson",
  data: vm => ({
    modal: false,
    dialog: false,
    errors: false,

    stratumList: [
      { name: "Estrato 1", abbr: "1", id: 1 },
      { name: "Estrato 2", abbr: "2", id: 2 },
      { name: "Estrato 3", abbr: "3", id: 3 },
      { name: "Estrato 4", abbr: "4", id: 4 },
      { name: "Estrato 5", abbr: "5", id: 5 },
      { name: "Estrato 6", abbr: "6", id: 6 }
    ],
    childrenNumberList: [
      { name: "1 Hijo", abbr: "1", id: 1 },
      { name: "2 Hijos", abbr: "2", id: 2 },
      { name: "3 Hijos", abbr: "3", id: 3 },
      { name: "4 Hijos", abbr: "4", id: 4 },
      { name: "5 Hijos", abbr: "5", id: 5 },
      { name: "6 Hijos", abbr: "6", id: 6 }
    ],
    bloodTypeList: [
      { name: "A", abbr: "a", id: 1 },
      { name: "B", abbr: "b", id: 2 },
      { name: "O", abbr: "o", id: 3 },
      { name: "AB", abbr: "ab", id: 4 }
    ],
    rhBloodList: [
      { name: "Positivo +", abbr: true, id: 1 },
      { name: "Negativo -", abbr: false, id: 2 }
    ],
    epsList: [
      { name: "Eps 1", abbr: "Eps 1", id: 1 },
      { name: "Eps 2", abbr: "Eps 2", id: 2 },
      { name: "Eps 3", abbr: "Eps 3", id: 2 }
    ],
    e6: 1,

    nitRules: [value => (value && value.length <= 1) || "Max 1 caracter"]
  }),
  components: {
    NewPersonPhone,
    NewPersonAddress,
    DatePickers
  },
  computed: {
    ...mapFields({
      readOnlyForm: "newPerson.formPersonReadOnly",
      typeDocument: "newPerson.typeDocument",
      documentNumber: "newPerson.documentNumber",
      gender: "newPerson.gender",
      origin: "newPerson.origin",
      maritalStatusCode: "newPerson.maritalStatusCode",
      ciiuCode: "newPerson.ciiuCode",
      nitVerificationDigit: "newPerson.nitVerificationDigit",
      issueDateDocument: "newPerson.issueDateDocument",
      naturalPerson: "newPerson.naturalPerson",
      names: "newPerson.names",
      surname: "newPerson.surname",
      secondSurname: "newPerson.secondSurname",
      fullNameBusinessName: "newPerson.fullNameBusinessName",
      birthDate: "newPerson.birthDate",
      stratum: "newPerson.stratum",
      occupation: "newPerson.occupation",
      childrenNumber: "newPerson.childrenNumber",
      sarlaftFormDate: "newPerson.sarlaftFormDate",
      maritalStatusCode: "newPerson.maritalStatusCode",
      professionProfession: "newPerson.professionProfession",
      countryOfBirth: "newPerson.countryOfBirth",
      birthDepartment: "newPerson.birthDepartment",
      birthMunicipality: "newPerson.birthMunicipality",
      employee: "newPerson.employee",
      weight: "newPerson.weight",
      height: "newPerson.height",
      habeasData: "newPerson.habeasData",
      bloodType: "newPerson.bloodType",
      rhSanguineo: "newPerson.rhSanguineo",
      epsCode: "newPerson.epsCode",
      dateOfDeath: "newPerson.dateOfDeath",
      authorizeMedicalHistory: "newPerson.authorizeMedicalHistory",
      currentSarlaft: "newPerson.currentSarlaft",
      ciuCode: "newPerson.ciuCode"
    }),
    ...mapState("dictionariesPersonStore", [
      //"typeOfDocumentsDir",
      "genderDir",
      "maritalStatusCodeDir",
      "ciiuCodeDir",
      "occupationTypeDir",
      "originSystemDir",
      "maritalStatusDir",
      "departmentsDir",
      "municipalityCodeDir",
      "typesDocumentDir",
      "countryCodeDir",
      "townCodeDir",
      "townCodeDirPerson"
    ]),

    /* validations */
    typeDocumentError() {
      const errors = [];
      if (!this.$v.typeDocument.$dirty) return errors;
      !this.$v.typeDocument.required &&
        errors.push("El campo Tipo de Documento es obligatorio");
      return errors;
    },
    documentNumberError() {
      const errors = [];
      if (!this.$v.documentNumber.$dirty) return errors;
      !this.$v.documentNumber.required &&
        errors.push("El campo Número de Documento es obligatorio");
      !this.$v.documentNumber.minLength && errors.push("El campo es muy corto");
      return errors;
    },

    countryOfBirthError() {
      const errors = [];
      if (!this.$v.countryOfBirth.$dirty) return errors;
      !this.$v.countryOfBirth.required &&
        errors.push("El campo País es obligatorio");
      return errors;
    },
    issueDateDocumentError() {
      const errors = [];
      if (!this.$v.issueDateDocument.$dirty) return errors;
      !this.$v.issueDateDocument.required &&
        errors.push("La Fecha Expedición Documento es obligatorio");
      console.log(errors);
      return errors;
    }
  },

  created: function() {
    if (!this.$store._modules.get(["dictionariesPersonStore"])) {
      this.$store.registerModule(
        "dictionariesPersonStore",
        DictionariesPersonStore,
        {
          ignoreIfExists: true
        }
      );
    }

    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "genero",
      fieldSort: "field2",
      dirName: "genderDir"
    });
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "tipo_documento",
      fieldSort: "field2",
      dirName: "typesDocumentDir",
      customObj: true
    });
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "actividad_economica",
      fieldSort: "field2",
      dirName: "ciiuCodeDir"
    });
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "tipo_ocupacion",
      fieldSort: "field2",
      dirName: "occupationTypeDir"
    });
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "sistema_origen",
      //fieldSort: "field2",
      fieldSort: "field1",
      dirName: "originSystemDir"
    });
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "estado_civil",
      fieldSort: "field2",
      dirName: "maritalStatusCodeDir"
    });
    store.dispatch("dictionariesPersonStore/getDictionaries", {
      typeDictionaries: "pais",
      fieldSort: "field2",
      dirName: "countryCodeDir"
    });
  },

  watch: {
    countryOfBirth() {
      store.dispatch("dictionariesPersonStore/getDictionaries", {
        typeDictionaries: "departamentos",
        fieldSort: "field3",
        dirName: "departmentsDir",
        filterName: "field1",
        filterCondition: this.countryOfBirth
      });
    },
    birthDepartment(newSelectedArray, oldSelectedArray) {
      /* if (newSelectedArray != null && oldSelectedArray != null) {
          if (newSelectedArray.field2 != oldSelectedArray.field2) {
            this.townCode = null;
          }
        } */
      store.dispatch("dictionariesPersonStore/getDictionaries", {
        typeDictionaries: "municipio",
        fieldSort: "field4",
        dirName: "townCodeDirPerson",
        filterName: "field2",
        filterCondition: this.birthDepartment
      });
    }
  },

  methods: {
    //validation of mandatory fields
    stepOneShipment() {
      if (
        !this.$v.issueDateDocument.$invalid &&
        !this.$v.typeDocument.$invalid &&
        !this.$v.documentNumber.$invalid
      ) {
        store.dispatch("personStore/postNewPerson").then(
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
        //this.$v.$touch();
        this.$v.typeDocument.$touch();
        this.$v.documentNumber.$touch();
        this.$v.issueDateDocument.$touch();
        this.errors = this.$v.issueDateDocument.$invalid;
      }
    },
    openModal() {
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;
    },

    updateSteps(step) {
      store.dispatch("personStore/putNewPerson").then(
        response => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Muy bien",
            text: "El usuario se a actualizado.",
            showConfirmButton: false,
            timer: 4000
          });
          this.e6 = step;
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
    /* stepOneShipment() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.e6 = 2;
      } else {
      }
    } */
  },

  mixins: [validationMixin],
  validations: {
    countryOfBirth: { required },
    typeDocument: { required },
    documentNumber: { required, minLength: minLength(8) },
    issueDateDocument: { required }
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
