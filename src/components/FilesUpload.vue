<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"     
      max-width="50vw"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="sbs"  outlined dark v-on="on">Subir Archivo</v-btn>
      </template>
      <v-card>
        <v-card-title color="sbs">
          <v-toolbar flat color="sbs" dark>           
            <v-toolbar-title> Subir Archivos</v-toolbar-title>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row  justify="center">
              <v-col cols="12" md="6">
                <FilePond   
                ref="pond"
                class-name="my-pond"
                label-idle='Arrastrar y Soltar Archivos <span class="filepond--label-action"> Explorar </span>'
                allow-multiple="true"        
                v-bind:files="uploadFiles"
                v-on:init="filePondInit"/>
              </v-col>           
            </v-row>
          </v-container>
        </v-card-text>
         <v-card-actions>
          <v-spacer></v-spacer>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-btn color="sbs" block outlined @click="dialog = false">
                  Cerrar
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="sbs" block outlined @click="submitFiles">
                  Subir
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import vueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
const FilePond = vueFilePond( FilePondPluginImagePreview );

export default {
    name: 'FilesUpload',
    data: function() {
        return {
         uploadFiles: [] ,
         modal: true,
         dialog: false
        
        };
    },
    methods: {
        filePondInit: function() {
           this.$refs.pond.removeFiles()
        },
        submitFiles: function(){        
          this.$store.commit("userStore/uploadFilesSuccess", this.$refs.pond.getFiles());
          this.dialog = false
          this.$refs.pond.removeFiles()
        }
    },
    components: {
        FilePond
    }
};

</script>
