<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-toolbar color="sbs" dark>
          <v-toolbar-title>Paso 1 - Información General</v-toolbar-title>
        </v-toolbar>
      </v-row>
      <v-row>
        <v-col cols="2">
          <NewPerson ref="personModal" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="100%" light outlined style="border: none">
            <v-card-text>
              <v-row>
                <v-col cols="6" md="3">
                  <v-text-field
                    label="Número de Póliza"
                    outlined
                    filled
                    persistent-hint
                    v-model="policyNumber"
                    :value="policyNumber"
                    :error-messages="policyNumberErrors"
                    @input="$v.policyNumber.$touch()"
                    @blur="$v.policyNumber.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- <v-row v-if="flagEvent">
                <v-row> 
                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Evento"
                    persistent-hint
                    hint="Seleccione el Tipo de Evento"
                    :items="typesEventDir"
                    item-text="field2"
                    item-value="field1"
                    v-model="typeEvent"
                    no-data-text="Datos no Disponibles"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Subevento"
                    persistent-hint
                    hint="Seleccione un tipo de subevento"
                    :items="typesSubEventDir"
                    item-text="field3"
                    item-value="field2"
                    v-model="typeSubEvent"
                    no-data-text="Datos no Disponibles"
                  ></v-autocomplete>
                </v-col>
              </v-row>-->
              <v-row>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Sucursal"
                    persistent-hint
                    hint="Seleccione una Sucursal (obligatorio)"
                    :items="branchOfficesDir"
                    item-value="branchCodeOficce"
                    item-text="branchOficceDescription"
                    v-model="branchOfficeCode"
                    :error-messages="branchOfficeCodeErrors"
                    @input="$v.branchOfficeCode.$touch()"
                    @blur="$v.branchOfficeCode.$touch()"
                    no-data-text="Datos no Disponibles"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Canal de Venta"
                    persistent-hint
                    hint="Seleccione un Canal de Venta (obligatorio)"
                    :items="salesChannelsDir"
                    item-text="channelCodeDescrption"
                    item-value="channelCode"
                    v-model="salesChannel"
                    :error-messages="salesChannelErrors"
                    @input="$v.salesChannel.$touch()"
                    @blur="$v.salesChannel.$touch()"
                    no-data-text="Datos no Disponibles"
                  ></v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Ramo"
                    persistent-hint
                    hint="Seleccione un Ramo (obligatorio)"
                    :items="branchsDir"
                    item-text="field3"
                    item-value="field1"
                    v-model="commercialBranchCode"
                    :error-messages="commercialBranchCodeErrors"
                    @input="$v.commercialBranchCode.$touch()"
                    @blur="$v.commercialBranchCode.$touch()"
                    no-data-text="Datos no Disponibles"
                    :readonly="readOnlyForm"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Producto"
                    persistent-hint
                    hint="Seleccione un Producto (obligatorio)"
                    :items="productStructuresDir"
                    item-text="productDescription"
                    item-value="productCode"
                    v-model="productCode"
                    :error-messages="productCodeErrors"
                    @input="$v.productCode.$touch()"
                    @blur="$v.productCode.$touch()"
                    no-data-text="Datos no Disponibles"
                    :readonly="readOnlyForm"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Clausulado"
                    persistent-hint
                    hint="Seleccione un Clausulado (obligatorio)"
                    :items="clausesDir"
                    item-text="field3"
                    item-value="field2"
                    v-model="clauseCode"
                    return-object
                    :error-messages="clauseCodeErrors"
                    @input="$v.clauseCode.$touch()"
                    @blur="$v.clauseCode.$touch()"
                    no-data-text="Datos no Disponibles"
                    :readonly="readOnlyForm"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Moneda"
                    persistent-hint
                    hint="Seleccione una Moneda (obligatorio)"
                    :items="currenciesDir"
                    item-text="field3"
                    item-value="field1"
                    v-model="currencyCode"
                    :error-messages="currencyCodeErrors"
                    @input="$v.currencyCode.$touch()"
                    @blur="$v.currencyCode.$touch()"
                    no-data-text="Datos no Disponibles"
                    :readonly="readOnlyForm"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    color="white"
                    label="Periodo Facturación"
                    persistent-hint
                    hint="Seleccione un Periodo Facturación (obligatorio)"
                    :items="periodsBillingDir"
                    item-text="field2"
                    item-value="field1"
                    v-model="billingPeriodCode"
                    return-object
                    :error-messages="billingPeriodCodeErrors"
                    @input="$v.billingPeriodCode.$touch()"
                    @blur="$v.billingPeriodCode.$touch()"
                    no-data-text="Datos no Disponibles"
                    :readonly="readOnlyForm"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="100%" light outlined style="border: none">
            <v-card-title>
              <u>Vigencia Poliza</u>
            </v-card-title>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="6" md="3">
                  <DatePickers
                    labelName="Fecha Inicio Vigencia"
                    hintText="DD/MM/YYYY"
                    v-model="validityDateFrom"
                    @inputValueDate="validityDateFrom = $event"
                    :inputValue="validityDateFrom"
                    :error-messages="validityDateFromErrors"
                    @input="$v.validityDateFrom.$touch()"
                    @blur="$v.validityDateFrom.$touch()"
                  />
                </v-col>
                <v-col cols="3" md="3">
                  <TimePicker
                    v-if="validityTimeFrom"
                    labelName="Hora Inicio Vigencia"
                    hintText="HH:mm"
                    v-model="validityTimeFrom"
                    inputNameSync="inputValueTimeFrom"
                    :inputDisabled="readOnlyForm"
                    :inputValue="validityTimeFrom"
                    :inputValueTimeFrom.sync="validityTimeFrom"
                    :error-messages="validityTimeFromErrors"
                    @input="$v.validityTimeFrom.$touch()"
                    @blur="$v.validityTimeFrom.$touch()"
                  />
                </v-col>
                <v-col cols="6" md="3">
                  <DatePickers
                    labelName="Fecha Fin Vigencia"
                    hintText="DD/MM/YYYY"
                    v-model="validityDateUpTo"
                    @inputValueDate="validityDateUpTo = $event"
                    :inputValue="validityDateUpTo"
                    :error-messages="validityDateUpToErrors"
                    @input="$v.validityDateUpTo.$touch()"
                    @blur="$v.validityDateUpTo.$touch()"
                  />
                </v-col>
                <v-col cols="3" md="3">
                  <TimePicker
                    v-if="validityTimeUpTo"
                    labelName="Hora Fin Vigencia"
                    hintText="HH:mm"
                    :inputDisabled="readOnlyForm"
                    v-model="validityTimeUpTo"
                    inputNameSync="inputValueTimeUpTo"
                    :inputValue="validityTimeUpTo"
                    :inputValueTimeUpTo.sync="validityTimeUpTo"
                    :error-messages="validityTimeUpToErrors"
                    @input="$v.validityTimeUpTo.$touch()"
                    @blur="$v.validityTimeUpTo.$touch()"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="100%" light outlined style="border: none">
            <v-card-title>Tomador</v-card-title>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    :items="typesDocumentDir"
                    item-text="field2"
                    item-value="field1"
                    label="Tipo de Documento"
                    hint="Seleccione un tipo de documento para el Tomador (obligatorio)"
                    persistent-hint
                    v-model="typeDocumentHolder"
                    :error-messages="typeDocumentHolderErrors"
                    @input="$v.typeDocumentHolder.$touch()"
                    @blur="$v.typeDocumentHolder.$touch()"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Número de Documento"
                    hint="Ingrese el Número de Documento del Tomador (obligatorio)"
                    persistent-hint
                    v-model="documentHolderNumber"
                    :value="documentHolderNumber"
                    :error-messages="documentHolderNumberErrors"
                    @input="$v.documentHolderNumber.$touch()"
                    @blur="findPersonCallTaker()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Nombre Tomador"
                    persistent-hint
                    v-model="takerName"
                    :value="takerName"
                    readonly
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-col cols="24" md="24">
                  <strong>* Indica campo requerido</strong>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="100%" light outlined style="border: none">
            <v-card-title>Pagador</v-card-title>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    :items="typesDocumentDir"
                    item-text="field2"
                    item-value="field1"
                    label="Tipo de Documento"
                    hint="Seleccione un tipo de documento para el Pagador (obligatorio)"
                    persistent-hint
                    v-model="typePayingDocument"
                    :error-messages="typePayingDocumentErrors"
                    @input="$v.typePayingDocument.$touch()"
                    @blur="$v.typePayingDocument.$touch()"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Número de Documento"
                    hint="Ingrese el Número de Documento del Pagador (obligatorio)"
                    persistent-hint
                    v-model="payingDocumentNumber"
                    :value="payingDocumentNumber"
                    :error-messages="payingDocumentNumberErrors"
                    @input="$v.payingDocumentNumber.$touch()"
                    @blur="findPersonCallPaying()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Nombre Pagador"
                    persistent-hint
                    v-model="payingName"
                    :value="payingName"
                    readonly
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-col cols="24" md="24">
                  <strong>* Indica campo requerido</strong>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn class="ma-2" block outlined color="sbs">
            Cancelar
            <v-icon dark right>mdi-cancel</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn class="ma-2" block outlined color="sbs" @click="submitHeaderPolicy()">
            Continuar
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" v-if="submitStatus === 'ERROR'">
          <v-alert type="error">Se ha generado un error. Por favor revise el formulario.</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
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
import { validationMixin } from "vuelidate";
import { mapState, mapMutations, mapActions } from "vuex";
import store from "@/store";
import NewPerson from "@/components/newPerson/NewPerson.vue";
import { createHelpers } from "vuex-map-fields";
import DatePickers from "@/components/globalComponents/DatePickers.vue";
import TimePicker from "@/components/globalComponents/TimePicker.vue";
import personModuleStore from "@/store/globalModules/personStore";

const { mapFields } = createHelpers({
  getterType: "formPropertyStore/getField",
  mutationType: "formPropertyStore/updateField"
});

export default {
  name: "Step1",

  data() {
    return {
      submitStatus: null,
      dateFormatted: "",
      personNameReturn: ""
    };
  },
  mixins: [validationMixin],
  validations: {
    policyNumber: { required },
    branchOfficeCode: { required },
    salesChannel: { required },
    commercialBranchCode: { required },
    productCode: { required },
    clauseCode: { required },
    currencyCode: { required },
    billingPeriodCode: { required },
    validityDateUpTo: { required },
    validityDateFrom: { required },
    validityTimeUpTo: { required },
    validityTimeFrom: { required },
    typeDocumentHolder: { required },
    documentHolderNumber: { required },
    typePayingDocument: { required },
    payingDocumentNumber: { required }
  },
  components: {
    NewPerson,
    DatePickers,
    TimePicker
  },
  computed: {
    ...mapFields({
      isReadOnly: "iReadOnly",
      isPreConfig: "isPreConfig",
      uniqueIdentifier: "step1.uniqueIdentifier",
      anniversary: "step1.anniversary",
      policyNumber: "step1.policyNumber",
      billingPeriodCode: "step1.billingPeriodCode",
      commercialBranchCode: "step1.commercialBranchCode",
      clauseCode: "step1.clauseCode",
      currencyCode: "step1.currencyCode",
      productCode: "step1.productCode",
      branchOfficeCode: "step1.branchOfficeCode",
      salesChannel: "step1.salesChannel",

      typeDocumentHolder: "step1.typeDocumentHolder",
      documentHolderNumber: "step1.documentHolderNumber",
      takerName: "step1.takerName",
      typePayingDocument: "step1.typePayingDocument",
      payingDocumentNumber: "step1.payingDocumentNumber",
      payingName: "step1.payingName",

      validityDateUpTo: "step1.validityDateUpTo",
      validityDateFrom: "step1.validityDateFrom",
      validityTimeUpTo: "step1.validityTimeUpTo",
      validityTimeFrom: "step1.validityTimeFrom",
      takerName: "step1.takerName",
      flagEvent: "eventPolicy.flagEvent",
      typeEvent: "eventPolicy.typeEvent",
      typeSubEvent: "eventPolicy.typeSubEvent"
    }),

    ...mapState("formPropertyStore", ["step1", "stepNumber"]),
    ...mapState("dictionariesStore", [
      "branchsDir",
      "branchOfficesDir",
      "salesChannelsDir",
      "products",
      "typesDocumentDir",
      "clausesDir",
      "currenciesDir",
      "periodsBillingDir",
      "typesEventDir",
      "typesSubEventDir"
    ]),
    ...mapState("productStore", ["productStructuresDir"]),
    ...mapState("productPlanStore", ["productPlanStructuresDir"]),
    ...mapActions("formPropertyStore", ["findPerson"]),

    policyNumberErrors() {
      const errors = [];
      if (!this.$v.policyNumber.$dirty) return errors;
      !this.$v.policyNumber.required &&
        errors.push("Número Poliza es requerido");
      return errors;
    },

    branchOfficeCodeErrors() {
      const errors = [];
      if (!this.$v.branchOfficeCode.$dirty) return errors;
      !this.$v.branchOfficeCode.required &&
        errors.push("Sucursal es requerida");
      return errors;
    },
    salesChannelErrors() {
      const errors = [];
      if (!this.$v.salesChannel.$dirty) return errors;
      !this.$v.salesChannel.required &&
        errors.push("Canal de venta es requerido.");
      return errors;
    },
    commercialBranchCodeErrors() {
      const errors = [];
      if (!this.$v.commercialBranchCode.$dirty) return errors;
      !this.$v.commercialBranchCode.required &&
        errors.push("Ramo es requerido");
      return errors;
    },
    productCodeErrors() {
      const errors = [];
      if (!this.$v.productCode.$dirty) return errors;
      !this.$v.productCode.required && errors.push("Producto es requerido");
      return errors;
    },

    clauseCodeErrors() {
      const errors = [];
      if (!this.$v.clauseCode.$dirty) return errors;
      !this.$v.clauseCode.required && errors.push("Clausulado es requerido");
      return errors;
    },
    currencyCodeErrors() {
      const errors = [];
      if (!this.$v.currencyCode.$dirty) return errors;
      !this.$v.currencyCode.required && errors.push("Moneda es requerido");
      return errors;
    },

    billingPeriodCodeErrors() {
      const errors = [];
      if (!this.$v.billingPeriodCode.$dirty) return errors;
      !this.$v.billingPeriodCode.required &&
        errors.push("Periodo de Facturación es requerido");
      return errors;
    },

    validityDateFromErrors() {
      const errors = [];
      if (!this.$v.validityDateFrom.$dirty) return errors;
      !this.$v.validityDateFrom.required &&
        errors.push("Fecha inicio vigencia requerido");
      return errors;
    },

    validityDateUpToErrors() {
      const errors = [];
      if (!this.$v.validityDateUpTo.$dirty) return errors;
      !this.$v.validityDateUpTo.required &&
        errors.push("Fecha fin vigencia requerido");
      return errors;
    },

    validityTimeFromErrors() {
      const errors = [];
      if (!this.$v.validityTimeFrom.$dirty) return errors;
      !this.$v.validityTimeFrom.required &&
        errors.push("Hora inicio vigencia requerido");
      return errors;
    },

    validityTimeUpToErrors() {
      const errors = [];
      if (!this.$v.validityTimeUpTo.$dirty) return errors;
      !this.$v.validityTimeUpTo.required &&
        errors.push("Hora fin vigencia requerido");
      return errors;
    },

    typeDocumentHolderErrors() {
      const errors = [];
      if (!this.$v.typeDocumentHolder.$dirty) return errors;
      !this.$v.typeDocumentHolder.required &&
        errors.push("El tipo de documento del tomador es requerido");
      return errors;
    },
    documentHolderNumberErrors() {
      const errors = [];
      if (!this.$v.documentHolderNumber.$dirty) return errors;
      !this.$v.documentHolderNumber.required &&
        errors.push("El número de documento del tomador es requerido");
      return errors;
    },

    typePayingDocumentErrors() {
      const errors = [];
      if (!this.$v.typePayingDocument.$dirty) return errors;
      !this.$v.typePayingDocument.required &&
        errors.push("El tipo de documento del pagador es requerido");
      return errors;
    },
    payingDocumentNumberErrors() {
      const errors = [];
      if (!this.$v.payingDocumentNumber.$dirty) return errors;
      !this.$v.payingDocumentNumber.required &&
        errors.push("El número de documento del pagador es requerido");
      return errors;
    },

    readOnlyForm: function() {
      if (this.isReadOnly) {
        return true;
      } else {
        if (this.isPreConfig) {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    product(newSelectedArray, oldSelectedArray) {
      if (newSelectedArray != null && oldSelectedArray != null) {
        if (newSelectedArray.productCode != oldSelectedArray.productCode) {
          this.productPlan = null;
        }
      }
    },
    commercialBranchCode() {
      if (this.commercialBranchCode) {
        store.dispatch("dictionariesStore/getDictionaries", {
          typeDictionaries: "clausulado",
          filterName: "field1",
          filterCondition: this.commercialBranchCode,
          dirName: "clausesDir"
        });
      }
    }
    //,
    // takerName() {
    //   if (this.takerName) {
    //     this.$refs.personModal.closeModal();
    //   } else {
    //     store.commit("personStore/setDataPerson", {
    //       typeDocument: this.takerTypeDocument,
    //       documentNumber: this.takerNumberDocument
    //     });
    //     this.$refs.personModal.openModal();
    //   }
    // }
    // flagEvent() {
    //   if (this.flagEvent) {
    //     store.dispatch("dictionariesStore/getDictionaries", {
    //       typeDictionaries: "eventos",
    //       fieldSort: "field2",
    //       dirName: "typesEventDir"
    //     });
    //   }
    // },
    // typeEvent(newSelectedArray, oldSelectedArray) {
    //   let flagQuery = false;
    //   if (newSelectedArray != null && oldSelectedArray != null) {
    //     if (newSelectedArray != oldSelectedArray) {
    //       flagQuery = true;
    //     }
    //   } else {
    //     if (newSelectedArray != null) {
    //       flagQuery = true;
    //     }
    //   }
    //   //alert(flagQuery);
    //   if (flagQuery == true) {
    //     store.dispatch("dictionariesStore/getDictionaries", {
    //       typeDictionaries: "subeventos",
    //       filterName: "field1",
    //       filterCondition: this.typeEvent,
    //       fieldSort: "field3",
    //       dirName: "typesSubEventDir"
    //     });

    //     // if(this.$store.state["formPropertyStore"].eventPolicy.typeEvent){

    //     //   this.typeSubEvent = this.$store.state["formPropertyStore"].eventPolicy.typeSubEvent
    //     //   store.commit("formPropertyStore/clearPolicyData")
    //     // }
    //   }
    // }
  },

  methods: {
    ...mapActions("formPropertyStore", ["stepState", "getIntermediaryPolicy"]),
    ...mapActions("dictionariesStore", [
      "getDictionaries",
      "getDictionariesFilter"
    ]),
    ...mapActions("productStore", ["getListProducts"]),
    ...mapActions("productPlanStore", ["getListProductsPlan"]),
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    submitHeaderPolicy() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (!this.uniqueIdentifier) {
          store
            .dispatch("formPropertyStore/generateUniqueIdentifier")
            .then(resp => {
              store
                .dispatch("formPropertyStore/createHeaderPolicy")
                .then(resp => {
                  this.$swal({
                    position: "center",
                    icon: "success",
                    title: "Proceso Exitoso",
                    text: "Se creó el encabezado de la Poliza con éxito.",
                    showConfirmButton: false,
                    timer: 4000
                  });
                  store.dispatch("formPropertyStore/stepState", { index: 2 });
		store.dispatch("formPropertyStore/getIntermediaryPolicy");
                  store.dispatch("propertyRiskPolicy/postPropertyRiskPolicy");
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
        } else {
          store
            .dispatch("formPropertyStore/updateHeaderPolicy")
            .then(resp => {
              this.$swal({
                position: "center",
                icon: "success",
                title: "Proceso Exitoso",
                text: "Se actualizó el encabezado de la Poliza con éxito.",
                showConfirmButton: false,
                timer: 4000
              });
              store.dispatch("formPropertyStore/stepState", { index: 2 });
store.dispatch("formPropertyStore/getIntermediaryPolicy");
              store.dispatch("formPropertyStore/getIntermediaryPolicy");
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
        }
      }
    },

    findPersonCallPaying() {
      this.$v.typePayingDocument.$touch();
      if (this.typePayingDocument) {
        this.findPersonCall(
          "payingPerson",
          this.typePayingDocument,
          this.payingDocumentNumber,
          "payingName"
        )
          .then(response => {
            if (this.personNameReturn) {
              this.payingName = this.personNameReturn;
              this.$refs.personModal.closeModal();
            } else {
              this.payingName = "";
              store.commit("personStore/setDataPerson", {
                typeDocument: this.typePayingDocument,
                documentNumber: this.payingDocumentNumber,
                readOnly: true
              });
              this.$refs.personModal.openModal();
            }
          })
          .catch(e => {
            reject(e);
          });
      }
    },
    findPersonCallTaker() {
      this.$v.typeDocumentHolder.$touch();
      if (this.typeDocumentHolder) {
        this.findPersonCall(
          "takerPerson",
          this.typeDocumentHolder,
          this.documentHolderNumber,
          "takerName"
        )
          .then(response => {
            if (this.personNameReturn) {
              this.takerName = this.personNameReturn;
              this.$refs.personModal.closeModal();
            } else {
              this.takerName = "";
              store.commit("personStore/setDataPerson", {
                typeDocument: this.typeDocumentHolder,
                documentNumber: this.documentHolderNumber,
                readOnly: true,
                moduleNewPerson: "takerPerson"
              });
              this.$refs.personModal.openModal();
            }
          })
          .catch(e => {
            reject(e);
          });
      }
    },
    findPersonCall(
      nameModule,
      typeDocumentFind,
      documentNumberFind,
      updateName
    ) {
      return new Promise((resolve, reject) => {
        if (!this.$store._modules.get([nameModule])) {
          this.$store.registerModule(nameModule, personModuleStore, {
            ignoreIfExists: true
          });
        }
        store
          .dispatch(nameModule + "/getPersonByTypeDocumentAndDocument", {
            typeDocument: typeDocumentFind,
            documentNumber: documentNumberFind
          })
          .then(resp => {
            if (this.$store.state[nameModule].newPerson.fullNameBusinessName) {
              this.personNameReturn = this.$store.state[
                nameModule
              ].newPerson.fullNameBusinessName;
            } else {
              this.personNameReturn = "";
            }

            resolve();
          })
          .catch(err => {
            this.personNameReturn = "";
            resolve();
          });
      });
    }
  },

  created: function() {
    store
      .dispatch("productConfigurationStore/getProductConfiguration")
      .then(resp => {
        if (this.$store.state["formPropertyStore"].uniqueIdentifierSelect) {
          store.dispatch("formPropertyStore/getHeaderPolicy", {
            uniqueIdentifier: this.$store.state["formPropertyStore"].eventUser
              .uniqueIdentifierSelect,
            anniversary: this.$store.state["formPropertyStore"].eventUser
              .anniversarySelect
          });
        } else {
          store.commit("formPropertyStore/setProductConfigurationHeaderPolicy");
        }

        store.commit("dictionariesStore/setDictionariesPreConfig");
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

    store.dispatch("productStore/getListProducts"); //Validar que microservicio uso -- Que parametro uso?

    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "ramo",
      fieldSort: "field3",
      dirName: "branchsDir"
    });

    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "moneda",
      fieldSort: "field3",
      dirName: "currenciesDir"
    });

    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "periodo_facturacion",
      fieldSort: "field2",
      dirName: "periodsBillingDir"
    });

    store.dispatch("dictionariesStore/getDictionaries", {
      typeDictionaries: "tipo_documento",
      fieldSort: "field2",
      dirName: "typesDocumentDir",
      customObj: true
    });
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style> 



