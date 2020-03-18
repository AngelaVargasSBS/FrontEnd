import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'
import {
  getField,
  updateField
} from 'vuex-map-fields'

const defaultState = {

  riskSummsAssured: [],
  riskCoverages: [],
  riskNumber: null,
  planCode: null,
  sumInsuredLocalCurrency: null,
  riskProperty: {
    address: null,
    complementaryAddress: null,
    constructionYear: null,
    countryCode: null,
    departamentCode: null,
    municipalityCode: null,
    intersectionStreetTypeCode: null,
    latitudeNumber: null,
    townCode: null,
    normalizedAddress: null,
    numberLength: null,
    numberOfFloors: null,
    numberUnits: null,
    postalCode: null,
    propertyName: null,
    streetTypeCode: null,
    street1: null,
    street1Letter: null,
    street1Prefix: null,
    street1LetterPrefix: null,
    street1QuadrantCode: null,
    intersectionStreetTypeCode: null,
    street2: null,
    street2Letter: null,
    street2Prefix: null,
    street2LetterPrefix: null,
    street2QuadrantCode: null,
    urban: true,
  }

}




const getters = {
  getField,
}
const actions = {


  getSerialRiskNumber({
    commit
  }) {

    let uniqueIdentifier = this.state.formPropertyStore.step1.uniqueIdentifier

    return new Promise((resolve, reject) => {
      let url = Vue.prototype.$urlServices + `/api/v1/sbs/riskPolicy/uniqueIdentifier/${uniqueIdentifier}`
      restApi.get(url)
        .then(response => {

          if (response.data.status.code == 200) {
            commit('setRiskNumber', response.data.riskNumberDTO)
            resolve()


          } else {
            reject(response.data.status.message)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  postPropertyController({
    state
  }, data) {
    let urlData = state.riskProperty;
    console.log(urlData);

    //console.log(data);
    let url = Vue.prototype.$urlServices + `/api/v1/sbs/property/create`,
      // dataPropertyController = state.state.propertyController;
      dataPropertyController = Object.assign({}, urlData);

    dataPropertyController.streetTypeCode = dataPropertyController.streetTypeCode != null ? dataPropertyController.streetTypeCode.field1 : null;
    dataPropertyController.intersectionStreetTypeCode = dataPropertyController.intersectionStreetTypeCode != null ? dataPropertyController.intersectionStreetTypeCode.field1 : null;

    dataPropertyController.latitudeNumber = Number(dataPropertyController.latitudeNumber);
    dataPropertyController.numberLength = Number(dataPropertyController.numberLength);

    //dataPropertyController.municipalityCode = dataPropertyController.townCode;
    //dataPropertyController.stateCode = dataPropertyController.departamentCode;
    dataPropertyController.normalizedAddress = 'Temporal';

    return new Promise((resolve, reject) => {

      restApi.post(url, dataPropertyController).then(response => {
        if (response.data.status.code == '200' && response.data.status.message.indexOf("Successful") > -1) {
          resolve(response);

        } else {
          reject(response);
        }
      }, error => {
        reject(error);
      })
    });


  },

  createRiskPolicy({
    commit,
    state
  }) {



    let uniqueIdentifier = this.state.formPropertyStore.step1.uniqueIdentifier,
      anniversary = this.state.formPropertyStore.step1.anniversary,
      planCode = this.state.formPropertyStore.step1.planCode,
      riskNumber = state.riskNumber


    return new Promise((resolve, reject) => {

      let url = Vue.prototype.$urlServices + `/api/v1/sbs/riskPolicy`
      let dataPost = {
        uniqueIdentifier: uniqueIdentifier,
        anniversary: anniversary,
        riskNumber: riskNumber,
        planCode: planCode
      }

      restApi.post(url, dataPost)
        .then(response => {

          if (response.data.status.code == 200) {

            commit('setNewRisk', dataPost);
            resolve()

          } else {

            reject(response.data.status.message)
          }

        })
        .catch(e => {

          reject(e)
        })

    })

  },
  createSummAssuredPolicy({
    commit,
    state
  }, dataSumm) {


    let dataPost = {
      uniqueIdentifier: this.state.formPropertyStore.step1.uniqueIdentifier,
      anniversary: this.state.formPropertyStore.step1.anniversary,
      riskNumber: state.riskNumber,
      typeRiskCode: this.state.formPropertyStore.step1.typeRiskCode,
      sumAssured: dataSumm.sumAssured,
      insuredSumCode: dataSumm.insuredSumCode
    }




    return new Promise((resolve, reject) => {

      let url = Vue.prototype.$urlServices + `/api/v1/oal/sumInsuredRisk`

      restApi.post(url, dataPost)
        .then(response => {

          if (response.data.status.code == 200) {

            commit('setNewSummAssuredRisk', dataPost);
            resolve()

          } else {

            reject(response.data.status.message)
          }

        })
        .catch(e => {

          reject(e)
        })

    })

  },
  postPropertyRiskPolicy(state, data) {
    let dataRisk = state.rootState.formPropertyStore.step2.risks[data.key + 1];
    return new Promise((resolve, reject) => {
      let url = Vue.prototype.$urlServices + `/api/v1/sbs/createPropertyRiskPolicy/propertyRiskPolicy`;
      let dataPost = {
        address: dataRisk.address,
        anniversary: this.state.formPropertyStore.step1.anniversary,
        uniqueIdentifier: this.state.formPropertyStore.step1.uniqueIdentifier,
        ciuCode: null,
        codeTypeRisk: this.state.formPropertyStore.step1.typeRiskCode,
        riskNumber: dataRisk.riskNumber,
        countryCode: dataRisk.countryCode,
        departamentCode: dataRisk.departamentCode,
        municipalityCode: dataRisk.municipalityCode,
      }

      restApi.post(url, dataPost)
        .then(response => {
          if (response.data.status.code == 200) {
            resolve()
          } else {
            reject(response.data.status.message)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  postNewFunctionalityTariffRisk({
    state
  }) {

    let dataTariffRisk = {};
    dataTariffRisk.riskNumber = state.riskNumber;
    dataTariffRisk.anniversary = this.state.formPropertyStore.step1.anniversary;
    dataTariffRisk.uniqueIdentifier = this.state.formPropertyStore.step1.uniqueIdentifier;
    return new Promise((resolve, reject) => {
      let url = Vue.prototype.$urlServices + `/api/v1/sbs/getFunctionalityTariffRisk/functionalityTariffRisk`;
      restApi.post(url, dataTariffRisk)
        .then(response => {
          if (response.data.status.code == '200' && response.data.status.message.indexOf("Successful") > -1) {
            resolve(response);
          } else {
            reject(response);
          }
        }, error => {
          reject(error);
        });
    })
  },
  getSummsAssuredRisk({
    commit,
    state
  }) {
    // let productPlanSummsAssuredProv = [

    //   { codigoSuma: 1, descripcion: 'ESTRUCTURA', sumaMinima: 50000000, sumaMaxima: 2000000000, obligatoria: false, summAssured: 100, summIncluded: true },
    //   { codigoSuma: 2, descripcion: 'CONTENIDOS', sumaMinima: 10000000, sumaMaxima: 500000000, obligatoria: true, summAssured: 200, summIncluded: true },
    //   { codigoSuma: 3, descripcion: 'TODO RIESGO', sumaMinima: 1000000, sumaMaxima: 50000000, obligatoria: false, summAssured: 300, summIncluded: true }
    // ]


    let uniqueIdentifier = this.state.formPropertyStore.step1.uniqueIdentifier,
      anniversary = this.state.formPropertyStore.step1.anniversary,
      riskNumber = state.riskNumber

    return new Promise((resolve, reject) => {
      let url = Vue.prototype.$urlServices + `/api/v1/oal/sumInsuredRisk/uniqueIdentifier/${uniqueIdentifier}/anniversary/${anniversary}/riskNumber/${riskNumber}`
      restApi.get(url)
        .then(response => {

          if (response.data.status.code == 200) {


            commit('loadSummsAsured', response.data.getSumInsuredRiskDTOS)
            resolve()


          } else {
            reject(response.data.status.message)
          }
        })
        .catch(e => {
          reject(e)
        })
    })



  },
  getCoveragesRisk({
    commit,
    state
  }) {


  },

  getCoveragePolicy({
    commit,
    state
  }, data) {
    let dataRisk = state.riskNumber;
    return new Promise((resolve, reject) => {
      let uniqueIdentifier = this.state.formPropertyStore.step1.uniqueIdentifier,
        anniversary = this.state.formPropertyStore.step1.anniversary;
      /*  let anniversary = -1;
       let uniqueIdentifier = 1; */
      let riskNumber = data.riskNumber;

      let url = Vue.prototype.$urlServices + `/api/v1/sbs/coveragePolicy/uniqueIdentifier/${uniqueIdentifier}/anniversary/${anniversary}/riskNumber/${riskNumber}`
      restApi.get(url)
        .then(response => {
          if (response.data.status.code == 200) {
            console.log('response');
            var dataCoverage = {
              key: data.riskNumber,
              data: response.data.getCoveragePolicyDTOS
            };
            commit('coveragePolicyMutation', dataCoverage);
            resolve()
          } else {
            reject(response)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },

}
const mutations = {
  updateField,
  
  coveragePolicyMutation(state, dataCoverage) {
    state.riskCoverages = dataCoverage.data;
  },

  setNewRisk(state, dataNewRisk) {

    state.riskNumber = dataNewRisk.riskNumber
    state.planCode = dataNewRisk.planCode

  },
  setNewSummAssuredRisk(state, dataNewSumm) {

    state.riskSummsAssured.push(dataNewSumm)

  },
  resetState(state) {
    Object.assign(state, defaultState)
  },

  loadRiskState(state, dataRisk) {
    Object.assign(state, dataRisk)
  },

  loadSummsAsured(state, listSummAssuredRisk) {

    state.riskSummsAssured = listSummAssuredRisk

  },
  setRiskNumber(state, dataDTO) {

    state.riskNumber = dataDTO.riskNumber

  }

}

export default {
  namespaced: true,
  state() {
    return {
      riskSummsAssured: [],
      riskCoverages: [],
      riskNumber: null,
      planCode: null,
      sumInsuredLocalCurrency: null,
      riskProperty: {
        address: null,
        complementaryAddress: null,
        constructionYear: null,
        countryCode: null,
        departamentCode: null,
        municipalityCode: null,
        intersectionStreetTypeCode: null,
        latitudeNumber: null,
        townCode: null,
        normalizedAddress: null,
        numberLength: null,
        numberOfFloors: null,
        numberUnits: null,
        postalCode: null,
        propertyName: null,
        streetTypeCode: null,
        street1: null,
        street1Letter: null,
        street1Prefix: null,
        street1LetterPrefix: null,
        street1QuadrantCode: null,
        intersectionStreetTypeCode: null,
        street2: null,
        street2Letter: null,
        street2Prefix: null,
        street2LetterPrefix: null,
        street2QuadrantCode: null,
        urban: true,
      },

    }
  },
  getters,
  actions,
  mutations
}
