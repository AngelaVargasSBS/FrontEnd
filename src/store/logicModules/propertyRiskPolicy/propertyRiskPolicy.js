import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'

const getters = {

}
const actions = {

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
const mutations = {}

export default {
  namespaced: true,
  state() {
    return {}
  },
  getters,
  actions,
  mutations
}
