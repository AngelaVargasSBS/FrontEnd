import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'
import {
  getField,
  updateField
} from 'vuex-map-fields';


const getters = {
  getField,
}
const actions = {

  getPersonByTypeDocumentAndDocument({
    commit
  }, dataConsulting) {

    let typeDocument = dataConsulting.typeDocument,
      documentNumber = dataConsulting.documentNumber
    return new Promise((resolve, reject) => {
      let url = Vue.prototype.$urlServices + `/api/v1/sbs/dataPerson/typeDocument/${typeDocument}/documentNumber/${documentNumber}`
      restApi.get(url)
        .then(response => {
          if (response.data.person.getResult.resultCode == 1) {

            commit('setDataPerson', response.data.person);

          } else {
            commit('clearDataPerson');


          }
          resolve()

        })
        .catch(e => {
          reject(e)
        })

    })

  },

  postNewPerson(state) {
    //console.log(state.state.newPerson);
    let url = Vue.prototype.$urlServices + `/api/v1/sbs/person`,
      // dataNewPerson = state.state.propertyController;
      dataNewPerson = Object.assign({}, state.state.newPerson);



    return new Promise((resolve, reject) => {
      restApi.post(url, dataNewPerson).then(response => {
        if (response.data.status.code == '200' && response.data.status.message.indexOf("Successful") > -1) {
          resolve(response);
        } else {
          reject(response);
        }
      }, error => {
        reject(error);
      });
    });
  },

  putNewPerson(state) {
    //console.log(state.state.newPerson);
    let url = Vue.prototype.$urlServices + `/api/v1/sbs/updatePerson/person`,
      // dataNewPerson = state.state.propertyController;
      dataNewPerson = Object.assign({}, state.state.newPerson);


    return new Promise((resolve, reject) => {
      restApi.put(url, dataNewPerson).then(response => {
        if (response.data.status.code == '200' && response.data.status.message.indexOf("Successful") > -1) {
          resolve(response);
        } else {
          reject(response);
        }
      }, error => {
        reject(error);
      });
    });
  },

  postNewPersonPhone(state, data) {

    //console.log(state.state.newPerson);
    let url = Vue.prototype.$urlServices + `/api/v1/sbs/personPhone`,
      dataNewPerson = Object.assign({}, data);
    var newPlone = {};
    newPlone.phoneTypeCode = dataNewPerson.data.phoneTypeCode.field1;
    newPlone.phone = dataNewPerson.data.phone;
    newPlone.countryCode = dataNewPerson.data.countryCode;
    newPlone.origin = state.state.newPerson.origin;
    newPlone.documentNumber = state.state.newPerson.documentNumber;
    newPlone.typeDocument = state.state.newPerson.typeDocument;

    return new Promise((resolve, reject) => {
      restApi.post(url, newPlone).then(response => {
        if (response.data.status.code == '200' && response.data.status.message.indexOf("Successful") > -1) {
          resolve(response);
        } else {
          reject(response);
        }
      }, error => {
        reject(error);
      });
    });
  },

  postNewPersonAddress(state, data) {

    //console.log(state.state.newPerson);
    let url = Vue.prototype.$urlServices + `/api/v1/sbs/personAddress`,
      dataNewAddress = Object.assign({}, data);

      var newAddress = {};

      newAddress.addressTypeCode = dataNewAddress.data.addresTypeCode.field1;
      newAddress.countryCode = dataNewAddress.data.countryCode;
      newAddress.departamentCode = dataNewAddress.data.departamentCode;
      newAddress.municipalityCode = dataNewAddress.data.municipalityCode;
      newAddress.address = dataNewAddress.data.addressForm;
      newAddress.postalCode = dataNewAddress.data.postalCode;
      newAddress.latitudeNumber = dataNewAddress.data.latitudeNumber;
      newAddress.lengthNumber = dataNewAddress.data.lengthNumber;

      newAddress.typeDocument = state.state.newPerson.typeDocument;
      newAddress.documentNumber = state.state.newPerson.documentNumber;
      newAddress.origin = state.state.newPerson.origin;

    return new Promise((resolve, reject) => {
      restApi.post(url, newAddress).then(response => {
        if (response.data.status.code == '200' && response.data.status.message.indexOf("Successful") > -1) {
          resolve(response);
        } else {
          reject(response);
        }
      }, error => {
        reject(error);
      });
    });
  }
}
const mutations = {
  updateField,

  setDataPerson(state, dataPerson) {
    state.newPerson.fullNameBusinessName = dataPerson.fullNameBusinessName
    state.newPerson.typeDocument = dataPerson.typeDocument
    state.newPerson.documentNumber = dataPerson.documentNumber
    state.newPerson.moduleNewPerson = dataPerson.moduleNewPerson

    if(dataPerson.readOnly){
      state.newPerson.formPersonReadOnly = dataPerson.readOnly
    }
  },
  clearDataPerson(state, dataPerson) {
    state.newPerson.fullNameBusinessName = ""
    state.newPerson.typeDocument = ""
    state.newPerson.documentNumber = ""
  }


}

export default {
  namespaced: true,
  dynamic: true,
  state() {
    return {

      numberUserPhones: 1,
      numberUserPhones2: [{
        id: 1,
        type: null,
        date: null
      }],
      newPerson: {
        moduleNewPerson: null,
        formPersonReadOnly:false,
        authorizeMedicalHistory: null,
        birthDate: null,
        birthDepartment: null,
        birthMunicipality: null,
        bloodType: null,
        childrenNumber: null,
        ciuCode: null,
        collectiontoken: null,
        countryOfBirth: null,
        creationDate: null,
        currentSarlaft: null,
        dateOfDeath: null,
        dateUpdate: null,
        documentNumber: null,
        employee: null,
        epsCode: null,
        fullNameBusinessName: null,
        gender: null,
        habeasData: null,
        height: null,
        issueDateDocument: null,
        maritalStatusCode: null,
        names: null,
        naturalPerson: 1, //Provisional solo se crean personas Naturales en SipaNew        
        nitVerificationDigit: null,
        occupation: null,
        origin: null,
        professionProfession: null,
        rhSanguineo: null,
        sarlaftFormDate: null,
        secondSurname: null,
        stratum: null,
        subCollectiontoken: null,
        surname: null,
        typeDocument: null,
        weight: null,
      },
      phonePerson: {
        countryCode: null,
        documentNumber: null,
        typeDocument: null,
        phoneTypeCode: null,
        phone: null,
        origin: null,
      }

    }
  },
  getters,
  actions,
  mutations
}