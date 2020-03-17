<template>
  <v-container>
    <v-row>
      <v-toolbar color="sbs" dark>
        <v-toolbar-title color="sbs">Paso 2 - Información Inmueble</v-toolbar-title>
      </v-toolbar>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headersTableRisks"
          :items="risks"
          sort-by="riskNumber"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <!-- Dialog Nuevo Amparo | dialogEdit -->
              <v-dialog v-model="dialogEdit" max-width="90vw">
                <template v-slot:activator="{ on }">
                  <v-btn color="sbs" outlined dark v-on="on">Nuevo Riesgo</v-btn>
                  <FilesUpload />
                </template>
                <v-card>
                  <v-card-title color="sbs">
                    <v-toolbar flat color="sbs" dark>
                      <v-toolbar-title>
                        {{ formTitlerisks }}
                        {{ editedItemrisks.tipoAmparo }}
                      </v-toolbar-title>
                    </v-toolbar>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="3">
                        <v-text-field
                          label="Número de Riesgo"
                          outlined
                          filled
                          persistent-hint
                          v-model="serialRiskNumber"
                          :readonly="true"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2"></v-col>
                      <v-col cols="12" md="7">
                        <v-data-table
                          :headers="headersSummsAssuredConfig"
                          :items="productPlanSummsAssured"
                          class="elevation-1"
                          hide-default-footer
                        >
                         <template v-slot:item.summIncluded="{ item }">
                            <v-simple-checkbox v-model="item.summIncluded"></v-simple-checkbox>
                          </template>
                          <template v-slot:item.summAssured="{ item }">
                            <v-text-field
                              persistent-hint
                              v-model="item.summAssured"
                              type="number"
                              prefix="$"
                            ></v-text-field>
                          </template>
                      

                        </v-data-table>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-alert
                          :value="alertNewRisk"
                          border="top"
                          icon="mdi-home"
                          transition="scale-transition"
                          prominent
                          type="error"
                        >
                          <v-row align="center">
                            <v-col class="grow">
                              Por favor ingrese un tipo de Riesgo y Valor
                              Asegurado.
                            </v-col>
                            <v-col class="shrink">
                              <v-btn
                                @click="alertNewRisk = !alertNewRisk"
                                class="ma-2"
                                outlined
                                color="white"
                              >Cerrar</v-btn>
                            </v-col>
                          </v-row>
                        </v-alert>
                      </v-col>
                    </v-row>

                    <v-row v-if="formTitlerisks === 'Editar Riesgo - '">
                      <!--  ------------------------------------------- -->

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

                        <v-stepper-items outlined>
                          <v-stepper-content step="1">
                            <v-card outlined color="grey lighten-5" class="mb-12">
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
                                      item-value="field1"
                                      v-model="countryCode"
                                      :error-messages="countryCodeError"
                                      @input="$v.countryCode.$touch()"
                                      @blur="loadDeparment"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-autocomplete
                                      label="Departamento"
                                      hint="Ingrese el Departamento *"
                                      persistent-hint
                                      :items="departmentsDir"
                                      item-text="field3"
                                      item-value="field2"
                                      v-model="departamentCode"
                                      :error-messages="departamentCodeError"
                                      @input="$v.departamentCode.$touch()"
                                      @blur="loadTown"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-autocomplete
                                      color="white"
                                      label=" Municipio"
                                      persistent-hint
                                      hint="Seleccione un Municipio *"
                                      :items="municipalityCodeDir"
                                      item-text="field4"
                                      item-value="field3"
                                      v-model="
                                        editedItemrisks.municipalityCode
                                      "
                                      :error-messages="municipalityCodeError"
                                      @input="$v.municipalityCode.$touch()"
                                      @blur="$v.municipalityCode.$touch()"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" md="2">
                                    <v-switch
                                      color="sbs"
                                      v-model="editedItemrisks.urban"
                                      label="Urbano"
                                    ></v-switch>
                                  </v-col>
                                  <v-col cols="12" md="5">
                                    <v-text-field
                                      label="Dirección"
                                      hint="Ingrese la Dirección *"
                                      persistent-hint
                                      v-model="editedItemrisks.address"
                                      :error-messages="addressError"
                                      @input="$v.address.$touch()"
                                      @blur="$v.address.$touch()"
                                      counter
                                      disabled
                                    ></v-text-field>
                                  </v-col>
                                  <v-col v-if="!editedItemrisks.urban" cols="12" md="5">
                                    <v-text-field
                                      label="Dirección Complementaria"
                                      hint="Ingrese la Dirección  con comentarios"
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.complementaryAddress
                                      "
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12" md="12">
                                    <v-divider></v-divider>
                                    <v-card-title>Generador de Dirección</v-card-title>
                                    <v-card-subtitle>
                                      Por favor rellene los campos necesarios
                                      para generar la dirección *.
                                    </v-card-subtitle>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-autocomplete
                                      color="white"
                                      label="Tipo Via"
                                      persistent-hint
                                      hint
                                      :items="streetTypeDir"
                                      item-text="field2"
                                      item-value="field1"
                                      v-model="
                                        editedItemrisks.streetTypeCode
                                      "
                                      return-object
                                      @input="generateAddress"
                                    ></v-autocomplete>
                                  </v-col>

                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Num."
                                      hint
                                      persistent-hint
                                      v-model="editedItemrisks.street1"
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Letra"
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.street1Letter
                                      "
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Prefijo (Bis)."
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.street1Prefix
                                      "
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Letra Pr."
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.street1LetterPrefix
                                      "
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Cuadrante"
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.street1QuadrantCode
                                      "
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <!-- ******************************************** -->
                                  <v-col cols="12" md="1">
                                    <v-autocomplete
                                      color="white"
                                      label="Tipo"
                                      persistent-hint
                                      hint
                                      :items="streetTypeDir"
                                      item-text="field2"
                                      item-value="field1"
                                      v-model="
                                        editedItemrisks.intersectionStreetTypeCode
                                      "
                                      return-object
                                      @input="generateAddress"
                                    ></v-autocomplete>
                                  </v-col>

                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Num."
                                      hint
                                      persistent-hint
                                      v-model="editedItemrisks.street2"
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Letra"
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.street2Letter
                                      "
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Prefijo (Bis)."
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.street2Prefix
                                      "
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Letra Pr."
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.street2LetterPrefix
                                      "
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="1">
                                    <v-text-field
                                      label="Cuadrante"
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.street2QuadrantCode
                                      "
                                      @input="generateAddress"
                                    ></v-text-field>
                                  </v-col>

                                  <!-- <v-col cols="12" md="4">
                                      <v-text-field
                                        label="Dirección normalizada"
                                        hint=""
                                        persistent-hint
                                        disabled
                                        v-model="
                                          editedItemrisks.normalizedAddress
                                        "
                                      ></v-text-field>
                                  </v-col>-->
                                </v-row>
                                <v-row>
                                  <v-col cols="12">
                                    <v-divider></v-divider>
                                  </v-col>
                                  <v-col cols="12" md="2">
                                    <v-autocomplete
                                      color="white"
                                      label="Barrio"
                                      persistent-hint
                                      hint
                                      :items="neighborhoodCodeDir"
                                      item-text="field2"
                                      item-value="field1"
                                      v-model="
                                        editedItemrisks.neighborhoodCode
                                      "
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      label="Nombre Barrio"
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.neighborhoodName
                                      "
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" md="2">
                                    <v-autocomplete
                                      color="white"
                                      label="Manzana"
                                      persistent-hint
                                      hint
                                      :items="appleCodeDir"
                                      item-text="field2"
                                      item-value="field1"
                                      v-model="editedItemrisks.appleCode"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      label="# Manzana"
                                      hint
                                      persistent-hint
                                      v-model="editedItemrisks.appleName"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="2">
                                    <v-autocomplete
                                      color="white"
                                      label="Urbanización"
                                      persistent-hint
                                      hint
                                      :items="urbanizationCodeDir"
                                      item-text="field2"
                                      item-value="field1"
                                      v-model="
                                        editedItemrisks.urbanizationCode
                                      "
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      label="# Urbanización"
                                      hint
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.urbanizationName
                                      "
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12" md="4"></v-col>
                                  <v-col cols="12" md="4">
                                    <v-btn color="sbs" block outlined @click="closerisks">Cerrar</v-btn>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-btn
                                      color="sbs"
                                      block
                                      outlined
                                      @click="stepOneShipment()"
                                    >Continue</v-btn>
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
                                      item-value="field1"
                                      v-model="
                                        editedItemrisks.constructionYear
                                      "
                                      :error-messages="constructionYearError"
                                      @input="$v.constructionYear.$touch()"
                                      @blur="$v.constructionYear.$touch()"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      label="Latitud"
                                      hint="Ingrese el Número de latitud"
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.latitudeNumber
                                      "
                                      type="number"
                                      pattern="/^\d{3}(.\d{1,8})?$/"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      label="Longitud"
                                      hint="Ingrese el Número de longitud"
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.numberLength
                                      "
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      label="Código Postal"
                                      hint="Ingrese el Código Postal"
                                      persistent-hint
                                      v-model="editedItemrisks.postalCode"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      label="Número Unidades"
                                      hint="Ingrese el Número Unidades"
                                      persistent-hint
                                      v-model="editedItemrisks.numberUnits"
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
                                      item-value="field1"
                                      v-model="
                                        editedItemrisks.numberOfFloors
                                      "
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      label="Nombre de la Propiedad"
                                      hint="Ingrese el Nombre de la Propiedad"
                                      persistent-hint
                                      v-model="
                                        editedItemrisks.propertyName
                                      "
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12" md="4">
                                    <v-btn color="sbs" block outlined @click="dialog = false">Cerrar</v-btn>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-btn color="sbs" block outlined @click="e6 = 1">Volver</v-btn>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-btn
                                      color="sbs"
                                      block
                                      outlined
                                      @click="
                                        Guardarrisks();
                                          stepFormSubmission()
                                      "
                                    >Continue</v-btn>
                                  </v-col>
                                </v-row>
                              </div>
                            </v-card>
                          </v-stepper-content>
                        </v-stepper-items>
                      </v-stepper>

                      <!-- <PropertyController /> -->
                      <!--  ------------------------------------------- -->
                    </v-row>
                  </v-card-text>
                  <v-card-actions v-if="formTitlerisks != 'Editar Riesgo - '">
                    <v-spacer></v-spacer>
                    <v-btn color="sbs" outlined @click="closerisks">Cancel</v-btn>
                    <v-btn color="sbs" outlined @click="saveNewRisk">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- Dialog Coberturas | dialogCoverage -->
              <v-dialog v-model="dialogCoverage" fullscreen>
                <v-card>
                  <v-toolbar dense fixed dark color="sbs">
                    <v-btn icon dark @click="closeCoverage">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                      Coberturas y Amparos -
                      {{ editedItemrisks.tipoAmparo }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="closeCoverage">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-card-text>
                    <v-container>
                      <!--  <v-row>
                        <v-col cols="12">
                          <NewProtection></NewProtection>
                        </v-col>
                      </v-row>-->
                      <v-row justify="end">
                        <v-col cols="12" md="4">
                          <v-btn class="ma-2" block outlined color="sbs">
                            Calcular
                            <v-icon dark right>fas fa-edit</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <!--  ------------------------------------------- -->
                          <EditCoverage />
                          <!--  ------------------------------------------- -->
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="testBtn" color="sbs" outlined @click="closeCoverage">Cancel</v-btn>
                    <v-btn color="sbs" outlined @click="GuardarCoverage">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn class="ma-2" outlined small color="sbs" @click="editItemrisks(item)">
              <v-icon small class="mr-2">fas fa-edit</v-icon>Editar
            </v-btn>
            <v-btn class="ma-2" outlined small color="sbs" @click="editCoverage(item)">
              <v-icon small class="mr-2">fas fa-list</v-icon>Coberturas
            </v-btn>
            <v-btn class="ma-2" outlined small color="sbs" @click="deleteItemrisks(item)">
              <v-icon small class="mr-2">mdi-cancel</v-icon>Eliminar
            </v-btn>
          </template>
        </v-data-table>
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
        <v-btn class="ma-2" block outlined color="sbs" @click="stepState({ index: 1 })">
          <v-icon dark left>mdi-arrow-left</v-icon>Volver
        </v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn class="ma-2" block outlined color="sbs" @click="stepState({ index: 3 })">
          Continuar
          <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
import { createHelpers } from "vuex-map-fields";
import FilesUpload from "@/components/FilesUpload";

import NewProtection from "@/components/propertyForm/propertyComponents/NewProtection.vue";
import EditCoverage from "@/components/propertyForm/propertyComponents/EditCoverage.vue";
import PropertyController from "@/components/propertyForm/propertyComponents/Property-controller.vue";

import personModuleStore from "@/store/globalModules/personStore";
import DatePickers from "@/components/globalComponents/DatePickers.vue";

const { mapFields } = createHelpers({
  getterType: "formPropertyStore/getField",
  mutationType: "formPropertyStore/updateField"
});

export default {
  name: "Step2",
  data() {
    return {
      productPlanSummsAssured: [],
      // Alerts
      alertNewRisk: false,
      // State Dialog
      dialogEdit: false,
      dialogCoverage: false,

      e6: 1,
      //Table Amparos
      headersTableRisks: [
        {
          text: "Número de Riesgo",
          align: "left",
          sortable: false,
          value: "riskNumber"
        },
        { text: "Total Valor Asegurado", value: "sumInsuredLocalCurrency" },
        { text: "Acciones", value: "action", sortable: false }
      ],

      headersSummsAssuredConfig: [
        { text: "Incluida", value: "summIncluded" },
        {
          text: "Suma Asegurada",
          align: "left",
          sortable: false,
          value: "descripcion"
        },
        { text: "Valor", value: "summAssured" }
      ],
      registryId: 1,
      statusNewTariffRisk: true
      //Table Cobertura
    };
  },
  components: {
    NewProtection,
    EditCoverage,
    FilesUpload,
    PropertyController,
    DatePickers
  },

  computed: {
    ...mapFields({
      serialRiskNumber: "step1.serialNumberRisk",
      risks: "step2.risks",
      editedIndexrisks: "step2.editedIndexrisks",
      editedItemrisks: "step2.editedItemrisks",
      countryCode: "step2.editedItemrisks.countryCode",
      departamentCode: "step2.editedItemrisks.departamentCode",
      municipalityCode: "step2.editedItemrisks.municipalityCode",
      address: "step2.editedItemrisks.address",
      constructionYear: "step2.editedItemrisks.constructionYear",
      defaultItemrisks: "step2.defaultItemrisks"
    }),
    ...mapState("dictionariesStore", [
      "typeAddress",
      "numberOfFloorss",
      "typeOfConstructions",
      "countryCodeDir",
      "numberOfFloorsDir",
      "constructionYearDir",
      "municipalityCodeDir",
      "municipalityCodeDir",
      "departmentsDir",
      "streetTypeDir",
      "neighborhoodCodeDir",
      "appleCodeDir",
      "urbanizationCodeDir"
    ]),

    formTitlerisks() {
      return this.editedIndexrisks === -1
        ? "Nuevo Riesgo "
        : "Editar Riesgo - ";
    },

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
    municipalityCodeError() {
      const errors = [];
      if (!this.$v.municipalityCode.$dirty) return errors;
      !this.$v.municipalityCode.required &&
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
    },

    generateAddress: function() {
      this.editedItemrisks.address =
        (this.editedItemrisks.streetTypeCode == null
          ? ""
          : this.editedItemrisks.streetTypeCode.field2) +
        (this.editedItemrisks.street1 == null
          ? ""
          : this.editedItemrisks.street1) +
        (this.editedItemrisks.street1Letter == null
          ? ""
          : this.editedItemrisks.street1Letter) +
        (this.editedItemrisks.street1Prefix == null
          ? ""
          : this.editedItemrisks.street1Prefix) +
        (this.editedItemrisks.street1LetterPrefix == null
          ? ""
          : this.editedItemrisks.street1LetterPrefix) +
        (this.editedItemrisks.street1QuadrantCode == null
          ? ""
          : this.editedItemrisks.street1QuadrantCode) +
        (this.editedItemrisks.intersectionStreetTypeCode == null
          ? ""
          : this.editedItemrisks.intersectionStreetTypeCode.field2) +
        (this.editedItemrisks.street2 == null
          ? ""
          : this.editedItemrisks.street2) +
        (this.editedItemrisks.street2Letter == null
          ? ""
          : this.editedItemrisks.street2Letter) +
        (this.editedItemrisks.street2Prefix == null
          ? ""
          : this.editedItemrisks.street2Prefix) +
        (this.editedItemrisks.street2LetterPrefix == null
          ? ""
          : this.editedItemrisks.street2LetterPrefix) +
        (this.editedItemrisks.street2QuadrantCode == null
          ? ""
          : this.editedItemrisks.street2QuadrantCode);
    }
  },

  watch: {
    dialogEdit(val) {
      val || this.closerisks();
    }
  },
  methods: {
    ...mapMutations("formPropertyStore", ["generateProtectionMutation"]),
    ...mapActions("formPropertyStore", ["stepState"]),
    ...mapActions("dictionariesStore", [
      "getDictionaries",
      "generateProtection",
      "postPropertyController"
    ]),

    // risks methods
    editItemrisks(item) {
      console.log(item);
      this.editedIndexrisks = this.risks.indexOf(item);
      this.editedItemrisks = Object.assign({}, item);
      this.dialogEdit = true;
    },
    deleteItemrisks(item) {
      const index = this.risks.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.risks.splice(index, 1);
    },
    closerisks() {
      this.dialogEdit = false;
      setTimeout(() => {
        this.editedItemrisks = Object.assign({}, this.defaultItemrisks);
        this.editedIndexrisks = -1;
      }, 300);
    },
    saveNewRisk() {
      store
        .dispatch("riskPolicyStore/createRiskPolicy")
        .then(resp => {
          store.commit("formPropertyStore/addNewRiskList");

          this.$swal({
            position: "center",
            icon: "success",
            title: "Proceso Exitoso",
            text: "Se creó el Riesgo con éxito.",
            showConfirmButton: false,
            timer: 4000
          });
          this.e6 = 1;
        })
        .catch(err => {
          this.$swal({
            position: "center",
            icon: "error",
            title: "Error: ",
            text: err,
            showConfirmButton: true
          });
        });
    },

    GuardarProteccion() {
      console.log(`paso 1 statusNewTariffRisk = ${this.statusNewTariffRisk}`);
      if (
        this.editedItemrisks.tipoAmparo != "" &&
        this.editedItemrisks.valorAsegurado != ""
      ) {
        if (this.editedIndexrisks > -1) {
          Object.assign(
            this.risks[this.editedIndexrisks],
            this.editedItemrisks
          );
        } else {
          this.editedItemrisks.id = this.registryId++;
          this.risks.push(this.editedItemrisks);

          if (this.statusNewTariffRisk) {
            console.log(
              `paso 2 statusNewTariffRisk = ${this.statusNewTariffRisk}`
            );

            store
              .dispatch("formPropertyStore/postNewFunctionalityTariffRisk", {
                data: this.editedItemrisks
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
                  this.statusNewTariffRisk = false;
                  console.log(
                    `statusNewTariffRisk = ${this.statusNewTariffRisk}`
                  );
                },
                error => {
                  this.$swal({
                    position: "center",
                    icon: "error",
                    title:
                      "Muy mal Error: " +
                      error.functionalityTariffingAll.getResult.resultCode,
                    text: error.functionalityTariffingAll.getResult.message,
                    showConfirmButton: false,
                    timer: 4000
                  });
                  this.statusNewTariffRisk = true;
                  console.log(
                    `statusNewTariffRisk = ${this.statusNewTariffRisk}`
                  );
                }
              );
          }
        }
        this.closerisks();
      } else {
        this.alertNewRisk = true;
      }
    },

    // Coverage methods
    editCoverage(item) {
      this.editedItemrisks = Object.assign({}, item);
      this.dialogCoverage = true;
    },
    closeCoverage() {
      this.dialogCoverage = false;
    },
    GuardarCoverage() {
      //this.risks.push(this.editedItemrisks);
      this.closeCoverage();
    },

    stepOneShipment() {
      if (
        !this.$v.countryCode.$invalid &&
        !this.$v.departamentCode.$invalid &&
        !this.$v.municipalityCode.$invalid &&
        !this.$v.address.$invalid
      ) {
        this.e6 = 2;
      } else {
        // this.$v.$touch();
        this.$v.countryCode.$touch();
        this.$v.departamentCode.$touch();
        this.$v.municipalityCode.$touch();
        this.$v.address.$touch();
      }
    },
    stepFormSubmission() {
      console.log("TEst stepFormSubmission");
      this.e6 = 1;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.e6 = 1;

        store
          .dispatch("formPropertyStore/postPropertyController", {
            key: this.editedIndexrisks
          })
          .then(
            response => {
              this.$swal({
                position: "center",
                icon: "success",
                title: "Muy bien",
                text: "Se creo con éxito la propiedad.",
                showConfirmButton: false,
                timer: 4000
              });
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
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    loadDeparment() {
      store.dispatch("dictionariesStore/getDictionaries", {
        typeDictionaries: "departamentos",
        fieldSort: "field3",
        dirName: "departmentsDir",
        filterName: "field1",
        filterCondition: this.editedItemrisks.countryCode
      });
    },

    loadTown(newSelectedArray, oldSelectedArray) {
      store.dispatch("dictionariesStore/getDictionaries", {
        typeDictionaries: "municipio",
        fieldSort: "field4",
        dirName: "municipalityCodeDir",
        filterName: "field2",
        filterCondition: this.editedItemrisks.departamentCode
      });
    }
  },

  created: function() {
    this.productPlanSummsAssured = this.$store.state[
      "productConfigurationStore"
    ].productPlan.productPlanSummsAssured;

    console.log(this.productPlanSummsAssured);
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
    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "direccion_barrio",
      fieldSort: "field2",
      dirName: "neighborhoodCodeDir"
    });
    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "direccion_manzana",
      fieldSort: "field2",
      dirName: "appleCodeDir"
    });
    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "direccion_urbanizacion",
      fieldSort: "field2",
      dirName: "urbanizationCodeDir"
    });
  },
  mixins: [validationMixin],
  validations: {
    countryCode: { required },
    departamentCode: { required },
    municipalityCode: { required },
    address: { required, minLength: minLength(10) },
    constructionYear: { required }
  }
};
</script>

<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
