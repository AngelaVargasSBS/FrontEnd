<template>
  <v-form>
    <div class="generalContainer">
      <div
        id="leftContainer"
        :style="{ backgroundImage: `url(${backgroundUrl})` }"
      ></div>
      <div id="bodyContainer">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <header>
                <div class="logo">
                  <img src="@/assets/images/logos/logo-sbs.png" />
                </div>
                <div class="title">
                  ¡Bienvenido!
                </div>
                <div id="message">
                  Inicia sesión para acceder al portafolio de productos
                </div>
              </header>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                v-model.trim="user"
                :error-messages="userErrors"
                label="Usuario"
                required              
                @blur="$v.user.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col  cols="12" md="6" lg="4">
              <!-- <v-text-field
                v-model.trim="password"
                :error-messages="passwordErrors"
                label="CONTRASEÑA"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field> -->
              <v-text-field
                v-model.trim="password"
                :error-messages="passwordErrors"
                :append-icon="passwordState ? 'mdi-eye' : 'mdi-eye-off'"              
                :type="passwordState ? 'text' : 'password'"               
                label="Contraseña"          
                class="input-group--focused"
                @click:append="passwordState = !passwordState"              
                @blur="$v.password.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!!isRejected" justify="center">
            <v-col  cols="12" md="6" lg="4">
              <div
                style="text-align:center;"
                class="v-messages theme--light error--text"
              >{{status}}: {{errorLogin}}</div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col  cols="12" md="6" lg="4">
              <vue-recaptcha
                ref="recaptcha"
                sitekey="6LcYGscUAAAAAO4ef02mtN4r1rv7vnlR3GDelQJa"
                :loadRecaptchaScript="true"
                badge=true
                @verify="validateCaptcha"
                @expired="onCaptchaExpired"             
              ></vue-recaptcha>
            </v-col>
          </v-row>
          <v-row>
           <!-- <v-col cols="12" v-if="!submitHidden" style="text-align:center" >-->
             <v-col cols="12" style="text-align:center" > 
              <v-btn class="btn-login" @click="submit">Entrar</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <footer>
                <div class="copyright" >
                  <span
                    >Copyright © 2019 -SBS SEGUROS COLOMBIA S.A. - COMPAÑÍA DE  SEGUROS
                    </span>
                </div>
                <div class="terms-and-conditions">
                  <a
                    href="https://www.sbseguros.co/terminos-y-condiciones"
                    target="_blank"
                    >Términos y Condiciones</a>
                  <span>|</span>
                  <a
                    href="https://www.sbseguros.co/politicas-de-privacidad"
                    target="_blank"
                    >Políticas de privacidad</a>
                </div>
              </footer>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required,  minLength, } from "vuelidate/lib/validators";
import md5 from "md5";
import backgroundUrl from "@/assets/images/login/people.png";
import { mapGetters, mapState } from "vuex";
import VueRecaptcha from "vue-recaptcha";

export default {
  mixins: [validationMixin],

  validations: {
    user: { required },
    password: { required, min: minLength(3) }
  },
  components: {
    "vue-recaptcha": VueRecaptcha
  },
  data: () => ({
    user: "",
    password: "",
    backgroundUrl,
    submitHidden: true,
    passwordState: false,   
  }),
  computed: {
    userErrors() {
      const errors = [];
      if (!this.$v.user.$dirty) return errors;
      !this.$v.user.required && errors.push("Usuario Requerido.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password Requerido.");
      !this.$v.password.min && errors.push("Longitud Requerida: 4 caracteres.");
      return errors;
    },
    ...mapGetters("userStore", ["isRejected"]),
    ...mapState("userStore", ["errorLogin", "status"])
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let user = this.user;
        let password = md5(this.password);
        let applicationCode = this.$applicationCode;
        this.$store
          .dispatch("userStore/login", { user, password, applicationCode })
          .then(() => {
            this.$router.push("/");
            this.submitHidden = true;
            this.onCaptchaExpired();           
          })
          .catch(err => console.log(err));
      } else {
        this.onCaptchaExpired();
      }
    },
    validateCaptcha() {
      this.submitHidden = false;
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
          
   }
    
  }
};
</script>
<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/login";
</style>
