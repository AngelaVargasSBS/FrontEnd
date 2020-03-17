<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-parallax height="300" jumbotron :src="getImageUrl('background-fomr.jpg')">
          <v-row align="center" justify="center">
            <v-col class cols="12">
              <div class="base-title">
                <h1>Hogar</h1>
                <p>Genera la póliza para hogar</p>
                <v-divider class="hr-line" inset></v-divider>
              </div>
            </v-col>
          </v-row>
        </v-parallax>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!--  <PropertyController /> -->
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-stepper v-model="stepNumber" :alt-labels="true">
          <v-stepper-header>
            <v-stepper-step :complete="stepNumber > 1" step="1"  color="sbs">Paso 1</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepNumber > 2" step="2"  color="sbs">Paso 2</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepNumber > 3" step="3"  color="sbs">Paso 3</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4"  color="sbs">Paso 4</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">           
              <Step1 />         
            </v-stepper-content>
            <v-stepper-content step="2">
              <Step2 />
            </v-stepper-content>

            <v-stepper-content step="3">
              <Step3 />
            </v-stepper-content>

            <v-stepper-content step="4">
              <Step4 />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Step1 from "@/components/propertyForm/Step1.vue";
import Step2 from "@/components/propertyForm/Step2.vue";
import Step3 from "@/components/propertyForm/Step3.vue";
import Step4 from "@/components/propertyForm/Step4.vue";
import Step5 from "@/components/propertyForm/Step5.vue";
import PropertyController from "@/components/propertyForm/propertyComponents/Property-controller.vue";
import { createHelpers } from "vuex-map-fields";
import { mapState } from "vuex";
import store from "@/store";

const { mapFields } = createHelpers({
  getterType: "formPropertyStore/getField",
  mutationType: "formPropertyStore/updateField"
});

export default {
  name: "FormProperty",
  methods: {
    getImageUrl(img) {
      return require(`@/assets/images/background/${img}`);
    }
  },
  computed: {
    ...mapState("formPropertyStore", ["stepNumber"]),
    ...mapFields({ flagEvent: "eventPolicy.flagEvent" })
  },
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    PropertyController
  },
  data() {
    return {};
  },
  created: function() {
 
    store.commit(
      "userStore/setProductConfigurationSelect", { productCodeSelect: this.$route.params.productCodeSelect,
      planCodeSelect: this.$route.params.planCodeSelect,
      typeRiskCodeSelect:this.$route.params.typeRiskCodeSelect }
  
    );

    
   }
};
</script>

<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/form";
</style>
