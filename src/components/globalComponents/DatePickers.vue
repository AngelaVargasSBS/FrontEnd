<template>
  <div>
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateFormatted"
          :label="labelName"
          :hint="hintText"
          :error="errors"
          :error-messages="errorMsg"
          @input="errorMessage;"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @input="menu1 = false" locale="es"></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
import store from "@/store";
export default {
  props: [
    "labelName",
    "hintText",
    "inputValue",
    "inputValueDate",
    "requiredInput",
    "inputNameSync",
  ],
  data() {
    return {
      date: null,
      dateFormatted: null,
      errors: false,
      menu1: false,
      errorMsg: ""
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    normalizeToField(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month}-${day}`;
    }
  },

  computed: {
    errorMessage() {
      if (this.requiredInput != true) {
        this.errors = false;
        this.errorMsg = "";
        return false;
      } else {
        this.errorMsg = "El campo es requerido.";
        this.errors = true;
        return true;
      }
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit("inputValueDate", this.dateFormatted);
    }
  },

  created: function() {
    this.date = this.normalizeToField(this.inputValue);
    this.dateFormatted = this.formatDate(this.date);
  },

  mounted() {
    this.$emit("inputValue", this.date);
  }
};
</script>
