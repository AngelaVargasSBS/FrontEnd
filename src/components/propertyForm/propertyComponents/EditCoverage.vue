<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="riskCoverages"
      item-key="nameCobertura"
      :single-select="false"
      show-select
      v-model="selected"
    ></v-data-table>
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
  getterType: "formPropertyStore/getField",
  mutationType: "formPropertyStore/updateField"
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
        value: "coverageDescription"
      },
      { text: "Código de cobertura", value: "coverageCode" },
      { text: "Porcentaje extra", value: "extraPercentage" },
      { text: "Premium Coin Local", value: "premiumCoinLocal" },
      { text: "Premium Tax Currency Issue", value: "premiumTaxCurrencyIssue" }
    ]
  }),

  computed: {
    ...mapFields({
      desserts: "step2.coverages"
    }),
     ...mapState("riskPolicyStore", [ "riskCoverages"]),
  },

  watch: {},

  methods: {
    ...mapMutations("formPropertyStore", ["coveragePolicyUpdate"]),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
