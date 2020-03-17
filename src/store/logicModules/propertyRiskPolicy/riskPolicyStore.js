import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'

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


  postPropertyRiskPolicy({
    commit,
    state
  }) {
    console.log('postPropertyRiskPolicy');
    return new Promise((resolve, reject) => {

      let url = Vue.prototype.$urlServices + `/api/v1/sbs/createPropertyRiskPolicy/propertyRiskPolicy
      `
      let dataPost = {
        address: null,
        anniversary: this.state.formPropertyStore.step1.anniversary,
        uniqueIdentifier: this.state.formPropertyStore.step1.uniqueIdentifier,
        ciuCode: null,
        codeTypeRisk: null,
        riskNumber: null,
        countryCode: null,
        departamentCode: null,
        municipalityCode: null,
      }

      restApi.post(url, dataPost)
        .then(response => {
          if (response.data.status.code == 200) {
            // dataNewRisk = Object.assign({}, state);
            // commit('formPropertyStore/addNewRiskList', dataNewRisk);
            console.log(response);
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
