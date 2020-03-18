import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'
import {
  getField
} from 'vuex-map-fields'
const getters = {
  getField
}
const actions = {
  getProductConfiguration({
    commit
  }) {

    let productCode = this.state.userStore.productCodeSelect,
      planCode = this.state.userStore.planCodeSelect,
      typeRiskCode = this.state.userStore.typeRiskCodeSelect

    return new Promise((resolve, reject) => {
      let url = Vue.prototype.$urlServices + `/api/v1/sbs/getProductConfiguration/productConfiguration/productCode/${productCode}/planCode/${planCode}/typeRiskCode/${typeRiskCode}`
      restApi.get(url).then((response) => {
        if (response.data.status.code == 200) {

          if (response.data.getProductConfiguration.productPlanConfiguration.productPlan.getResult.resultCode = 1) {

            if (response.data.getProductConfiguration.productPlanConfiguration.productPlan.productPlanBranchOficce && response.data.getProductConfiguration.productPlanConfiguration.productPlan.productPlanChannel) {

              commit('setProductPlanData', response.data.getProductConfiguration.productPlanConfiguration);
              resolve()
            } else {
              reject("Por favor verifique la configuración del producto")
            }

          } else {
            reject("Por favor verifique la configuración del producto")
          }
        } else {

          reject(response.data.status.message)
        }

      })
        .catch(err => {
          reject(err);
        })

    })
  }


}
const mutations = {


  setProductPlanData(state, productPlanConfigurationData) {

    let productPlanData = productPlanConfigurationData.productPlan
    state.productPlan.bouquetCodeCore = productPlanData.bouquetCodeCore
    state.productPlan.branchCodeCore = productPlanData.branchCodeCore
    state.productPlan.currencyCode = productPlanData.currencyCode
    state.productPlan.typeRiskCode = productPlanData.typeRiskCode
    state.productPlan.planCode = productPlanData.planCode
    state.productPlan.productCode = productPlanData.productCode
    state.productPlan.billingPeriodCode = productPlanData.billingPeriodCode
    state.productPlan.clampedCode = productPlanData.clampedCode
    state.productPlan.timeFrom = productPlanData.timeFrom
    state.productPlan.timeUp = productPlanData.timeUp

    if (productPlanData.productPlanBranchOficce) {
      state.productPlan.productPlanBranchOficce = productPlanData.productPlanBranchOficce
    }

    if (productPlanData.productPlanChannel) {
      state.productPlan.productPlanChannel = productPlanData.productPlanChannel
    }


    if (productPlanData.productPlanIntermediary) {
      state.productPlan.productPlanIntermediary = productPlanData.productPlanIntermediary
    }



  },

  resetProductPlanSummsAssured(state){
    let productPlanSummsAssuredInitial =  [
      //{ descripcion: 'SUMA LIBRE', sumaMinima: 0, sumaMaxima: 1000000000, obligatoria: false, sumAssured: null },
      { insuredSumCode:1, sumInsuredDescription:'ESTRUCTURA', sumaMinima: 50000000, sumaMaxima: 2000000000, obligatoria: false, sumAssured: null, summIncluded:null },
      { insuredSumCode:2, sumInsuredDescription: 'CONTENIDOS', sumaMinima: 10000000, sumaMaxima: 500000000, obligatoria: true, sumAssured: null, summIncluded:null },
      { insuredSumCode:3, sumInsuredDescription: 'TODO RIESGO', sumaMinima: 1000000, sumaMaxima: 50000000, obligatoria: false, sumAssured: null, summIncluded:null }
    ]


    Object.assign(state.productPlan.productPlanSummsAssured,  productPlanSummsAssuredInitial)


  }
}

export default {
  namespaced: true,
  state() {
    return {
      productPlan: {
        bouquetCodeCore: null,
        branchCodeCore: null,
        currencyCode: null,
        planCode: null,
        productCode: null,
        typeRiskCode: null,
        billingPeriodCode: null,
        clampedCode: null,
        productPlanBranchOficce: [],
        productPlanChannel: [],
        productPlanIntermediary: [],
        productPlanSummsAssured: [
          //{ descripcion: 'SUMA LIBRE', sumaMinima: 0, sumaMaxima: 1000000000, obligatoria: false, sumAssured: null },
          { insuredSumCode:1, sumInsuredDescription:'ESTRUCTURA', sumaMinima: 50000000, sumaMaxima: 2000000000, obligatoria: false, sumAssured: null, summIncluded:null },
          { insuredSumCode:2, sumInsuredDescription: 'CONTENIDOS', sumaMinima: 10000000, sumaMaxima: 500000000, obligatoria: true, sumAssured: null, summIncluded:null },
          { insuredSumCode:3, sumInsuredDescription: 'TODO RIESGO', sumaMinima: 1000000, sumaMaxima: 50000000, obligatoria: false, sumAssured: null, summIncluded:null }
        ],
        timeFrom: null,
        timeUp: null
      }


    }
  },
  getters,
  actions,
  mutations
}
