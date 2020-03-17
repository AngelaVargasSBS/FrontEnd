<template>
  <v-sheet v-if="!!isAuthenticated" class="overflow-hidden headerSBS">
    <v-card flat height="60px" tile>
      <v-toolbar dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/">
            <img src="@/assets/images/logos/logo-sbs.png" />
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-list-item two-line class="m-multiselect mr-4">
          <v-list-item-content>
            <div class="typo__label">Nombre Usuario:</div>
            <div class="user-name">{{ userProfile.fullNameBusinessName }}</div>
          </v-list-item-content>
        </v-list-item>
        <v-menu open-on-hover offset-y offset-x>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" fab dark small color="purple" v-on="on">
              <v-icon dark>fas fa-user</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(itemUser, index) in itemsUser"
              :key="index"
              @click="menuUserSwitch(index, itemUser.title)"
            >
              <v-list-item-title>{{ itemUser.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-card>
    <v-navigation-drawer v-model="drawer" absolute temporary width="60%" height="100vh">
      <v-container fill-height>
        <v-row justify="center" align="center">
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <div class="navBarr__header">
                  <div class="navBar__title">
                    <v-row>
                      <v-col cols="12" md="6">
                        <h2>Productos en Línea</h2>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-btn class="mx-2 float-right" fab outlined  small color="sbs" @click.stop="drawer = !drawer">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="navBar__subtitle">
                    <h2>Para comenzar selecciona uno de los productos.</h2>
                  </div>
                </div>
              </v-col>
            </v-row>
            <div
              v-for="moduleMenu in userModules"
              :key="moduleMenu.moduleApp.moduleTitle"
            >
              <v-row>
                <v-col cols="12" class="text-left">
                  <div class="product-line">
                    <h4>{{moduleMenu.moduleApp.moduleTitle }}</h4>
                    <img
                      :src="
                        require(`@/assets/images/nav/${moduleMenu.moduleApp.image}`)
                      " @error="loadImageDefault"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col
                  cols="4"
                  class="itemMenu text-center"
                  v-for="subModule in moduleMenu.subModuleProfileAppAuthenticate"
                  :key="subModule.subModuleApp.moduleTitle"
                  link
                >
                  <router-link :to="{ name: 'FormProperty', params: { productCodeSelect: 2, planCodeSelect:1, typeRiskCodeSelect:1 } }"> <!--Ramos Propiedad -- pendiente cambiar -->
                    <img
                      :src="require(`@/assets/images/nav/${subModule.subModuleApp.image}`)" @error="loadImageDefault"
                    />
                    {{ subModule.subModuleApp.moduleTitle }}
                  </router-link>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      drawer: null,     
      itemsUser: [{ title: "Cerrar Sesión" }]
    };
  },
  computed: {
    ...mapGetters("userStore", ["isAuthenticated", "authStatus"]),
    ...mapState("userStore", ["user", "userProfile", "userModules"])
  },
  methods: {
    menuUserSwitch(index, value) {
      switch (index) {
        case 0:
          this.$store
            .dispatch("userStore/logout")
            .then(() => {
              this.$router.push("/login");
            })
            .catch(err => console.log(err));

          break;
      }
    },
    loadImageDefault(event){
      event.target.src =""
    }
  }
};
</script>

<style lang="scss" scoped>
/****** layouts ******/
@import "~@/assets/styles/layouts/navBar";
</style>
