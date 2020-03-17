import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'

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

}
const actions = {

  createRiskPolicy({
    commit,
    state
  }) {



    let uniqueIdentifier = this.state.formPropertyStore.step1.uniqueIdentifier,
      anniversary = this.state.formPropertyStore.step1.anniversary,
      planCode = this.state.formPropertyStore.step1.planCode,
      riskNumber = this.state.formPropertyStore.step1.serialNumberRisk


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
      sumAssured: dataSumm.summAssured,
      insuredSumCode: dataSumm.codigoSuma
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
}
const mutations = {
  setNewRisk(state, dataNewRisk) {

    state.riskNumber = dataNewRisk.riskNumber
    state.planCode = dataNewRisk.planCode

  },
  setNewSummAssuredRisk(state, dataNewSumm) {

    state.riskSummsAssured.push(dataNewSumm)

  },
  resetState(state) {
    Object.assign(state, defaultState)
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
