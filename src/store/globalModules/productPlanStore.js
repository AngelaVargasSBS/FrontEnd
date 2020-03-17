import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'


const getters = {

}
const actions = {


  getListProductsPlan({
    commit
  }, productPlanObj) {

    if (productPlanObj) {
      let productCode = productPlanObj.productCode
      let url = Vue.prototype.$urlServices + `/api/v1/oal/productPlanStructure/codeProduct/${productCode}`
      restApi.get(url).then((response) => {



          if (response.data.status.code = '200') {
            const list = response.data.productPlanStructures;
            commit('setListProductsPlan', list);
          }



        })
        .catch(err => {
          console.log(err);
        })
    }

  }

}
const mutations = {

  setListProductsPlan(state, list) {

    state.productPlanStructuresDir = list;
  }
}

export default {
  namespaced: true,
  state() {

    return {
      productPlanStructuresDir: []
    }


  },
  getters,
  actions,
  mutations
}
