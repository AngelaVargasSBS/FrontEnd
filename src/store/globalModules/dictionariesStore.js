import Vue from 'vue'
import restApi from '@/store/utils/restApi.js'
import {
  getField,
  updateField
} from 'vuex-map-fields';

const getters = {

}
const actions = {

  getDictionaries({
    commit
  }, typeDictionaries) {


    let typeDictionary = typeDictionaries.typeDictionaries,
      fieldSort = typeDictionaries.fieldSort,
      dirName = typeDictionaries.dirName,
      filterName = typeDictionaries.filterName


    if (dirName.length != 0 || filterName) {
      if (!fieldSort) {
        fieldSort = 'field2'
      }

      let url = Vue.prototype.$urlDictionariesLocal + `/api/v1/modyo/dictionary?dictionaryName=${typeDictionary}`
      restApi.get(url)
        .then(response => {
          if (response.data.status.code = '200') {
            const dictionaries = response.data.dictionaries;

            dictionaries.sort((a, b) => (a[fieldSort].trim() > b[fieldSort].trim()) ? 1 : -1);


            typeDictionaries.dictionaries = dictionaries
            commit('setDictionariesFilter', typeDictionaries);
          }
        })
        .catch(e => {
          console.log(e);
        })


    }
  }

}
const mutations = {
  setDictionariesFilter(state, dataDictionaries) {
    const dictionaries = dataDictionaries.dictionaries,
      filterName = dataDictionaries.filterName,
      filterCondition = dataDictionaries.filterCondition,
      dirName = dataDictionaries.dirName,
      customObj = dataDictionaries.customObj,
      typeDictionary = dataDictionaries.typeDictionaries

    if (filterName) {

      state[dirName] = [];

    }
    for (const key in dictionaries) {

      if (customObj) {
        switch (typeDictionary) {
          case 'anio_construccion':
            dictionaries[key].customProperty = `${dictionaries[key].field2} a ${(dictionaries[key].field3 == undefined ? "actualidad" : dictionaries[key].field3)} `;
            break;

          case 'numero_pisos':
            dictionaries[key].customProperty = `${dictionaries[key].field2} a ${(dictionaries[key].field3 == undefined ? "Superiores " : dictionaries[key].field3)}`;

            break;

          case 'sucursal':
            dictionaries[key].customProperty = dictionaries[key].field2 + ' - ' + dictionaries[key].field6

            break;
        }

      }

      let fieldNumber1 = Number(dictionaries[key].field1);
      if (!isNaN(fieldNumber1)) {
        dictionaries[key].field1 = fieldNumber1
      }

      let fieldNumber2 = Number(dictionaries[key].field2);
      if (!isNaN(fieldNumber2)) {
        dictionaries[key].field2 = fieldNumber2
      }


      let fieldNumber3 = Number(dictionaries[key].field3);
      if (!isNaN(fieldNumber3)) {
        dictionaries[key].field3 = fieldNumber3
      }


      if (dictionaries[key][filterName] == filterCondition) {
        state[dirName].push(dictionaries[key]);
      } else {
        if (!filterName) {
          state[dirName].push(dictionaries[key]);
        }
      }

    }

  },
  setDictionariesPreConfig(state) {


    state.branchOfficesDir = this.state.productConfigurationStore.productPlan.productPlanBranchOficce
    state.salesChannelsDir = this.state.productConfigurationStore.productPlan.productPlanChannel


  }

}
export default {
  namespaced: true,
  state() {
    return {
      typeAddress: [],
      genderDir: [],
      branchsDir: [],
      branchOfficesDir: [],
      salesChannelsDir: [],
      numberOfFloorsDir: [],
      typeOfConstructions: [],
      typesDocumentDir: [],
      constructionYear: [],
      clausesDir: [],
      currenciesDir: [],
      periodsBillingDir: [],
      countryCodeDir: [],
      constructionYearDir: [],
      maritalStatusCodeDir: [],
      ciiuCodeDir: [],
      municipalityCodeDir: [],
      occupationTypeDir: [],
      originSystemDir: [],
      maritalStatusDir: [],
      departmentsDir: [],
      typesEventDir: [],
      typesSubEventDir: [],
      streetTypeDir:[],
      neighborhoodCodeDir:[],
      appleCodeDir:[],
      urbanizationCodeDir:[],
    }
  },
  getters,
  actions,
  mutations
}
