<template>
  <div>
    <v-menu
      ref="menuTime"
      v-model="menuTimeModel"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="time"
          :label="labelName"
          :hint="hintText"
          persistent-hint
          readonly
          v-on="on"
          :disabled="timeDisabled"
          prepend-icon="mdi-clock"
        ></v-text-field>
      </template>
      <v-time-picker
        color="sbs"
        v-model="time"
        format="24hr"

        @click:minute="$refs.menuTime.save(time)"
      ></v-time-picker>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: ["labelName", "hintText", "inputValue", "inputNameSync", "inputDisabled"],
  data() {
    return {
      time: this.inputValue,
      menuTimeModel: false,
      timeDisabled: this.inputDisabled
    };
  },
  watch: {
    time(val) {
      this.$emit('update:'+this.inputNameSync, this.time);
    }
  }
};
</script>
