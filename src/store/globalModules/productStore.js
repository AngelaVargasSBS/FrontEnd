import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'

const getters = {

}
const actions = {


  getListProducts({
    commit
  }) {



    let url = Vue.prototype.$urlServices + '/api/v1/oal/productStructures'
    restApi.get(url).then((response) => {


      if (response.data.status.code = '200') {
        const list = response.data.productStructures;
        //console.log(response.data.productStructures)
        commit('setListProducts', list);
      }



    })
      .catch(err => {
        console.log(err);
      })


  }

}
const mutations = {

  setListProducts(state, list) {

    state.productStructuresDir = list;
  }
}

export default {
  namespaced: true,
  state() {
    return {
      productStructuresDir: []

    }
  },
  getters,
  actions,
  mutations
}
