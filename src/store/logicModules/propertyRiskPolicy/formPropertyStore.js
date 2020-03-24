import Vue from 'vue'
import axios from 'axios'
import {
  getField,
  updateField
} from 'vuex-map-fields'
//import restApi from '@/store/utils/restApi.js'
import restApi from '@/store/utils/restApiNoToken.js'

const getters = {
  getField,
}
const actions = {
  stepState(state, numberStep) {
    state.state.stepNumber = numberStep.index;
  },

  postPropertyController(state, data) {
    let urlData = state.state.step2.risks[data.key];
    console.log(urlData);
    console.log(data);

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

  generateProtection(state, dataGenerateProtection) {
    commit('generateProtectionMutation', dataGenerateProtection);
  },

  postNewFunctionalityTariffRisk(state, data) {

    let dataTariffRisk = {};
    dataTariffRisk.riskNumber = data.data.id;
    dataTariffRisk.anniversary = state.state.step1.anniversary;
    dataTariffRisk.uniqueIdentifier = state.state.step1.uniqueIdentifier;
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
  postNewFunctionalityTariffRiskAll(state, data) {
    let dataTariffRisk = {};
    //dataTariffRisk.riskNumber = data.data.id;
    dataTariffRisk.anniversary = state.state.step1.anniversary;
    dataTariffRisk.uniqueIdentifier = state.state.step1.uniqueIdentifier;
    return new Promise((resolve, reject) => {
      let url = Vue.prototype.$urlServices + `/api/v1/sbs/getFunctionalityTariffingAll/functionalityTariffingAll`;
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

  getHeaderPolicy({
    commit
  }, dataConsulting) {

    let uniqueIdentifier = dataConsulting.uniqueIdentifier,
      anniversary = dataConsulting.anniversary
    return new Promise((resolve, reject) => {
      let url = Vue.prototype.$urlServices + `/api/v1/sbs/headerPolicy/uniqueIdentifier/${uniqueIdentifier}/anniversary/${anniversary}`
      restApi.get(url)
        .then(response => {

          if (response.data.status.code == 200) {
            if (response.data.getHeaderPolicy.getResult.resultCode == 1) {
              commit('setDataHeaderPolicy', response.data.getHeaderPolicy);


              this.dispatch('formPropertyStore/getRisksPolicy').then(resp => {
                resolve()
              })
                .catch(e => {
                  reject(e)
                })

            } else {
              commit('setProductConfigurationHeaderPolicy');
              resolve()
            }

          } else {
            reject(response.data.status.message)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  generateUniqueIdentifier({
    commit
  }) {

    return new Promise((resolve, reject) => {

      let url = Vue.prototype.$urlServices + `/api/v1/sbs/generateUniqueIdentifier`
      let dataPost = {
        vcampo1: 'certificadoOAL',
        vcampo2: '',
        vcampo3: '',
        vtabla: ''
      }

      restApi.post(url, dataPost)
        .then(response => {

          if (response.data.status.code == 200) {

            commit('setUniqueIdentifier', response.data.generateUniqueIdentifierDTO);
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
  createHeaderPolicy({
    commit,
    state
  }) {

    return new Promise((resolve, reject) => {

      let url = Vue.prototype.$urlServices + `/api/v1/sbs/createHeaderPolicy/headerPolicy `
      let dataPost = state.step1

      restApi.post(url, dataPost)
        .then(response => {
            if (response.data.status.code == 200) {
        
            let payloadTaker ={
              anniversary: state.step1.anniversary,
              codeLinksPerson: 1,
              documentNumber: state.step1.documentHolderNumber,
              typeDocument: state.step1.typeDocumentHolder,
              uniqueIdentifier:state.step1.uniqueIdentifier
            }  
            this.dispatch('formPropertyStore/createPersonPolicy', payloadTaker).then(resp => {
              let payloadPaying ={
                anniversary: state.step1.anniversary,
                codeLinksPerson: 1,
                documentNumber: state.step1.payingDocumentNumber,
                typeDocument: state.step1.typePayingDocument,
                uniqueIdentifier:state.step1.uniqueIdentifier
              }  
              
              this.dispatch('formPropertyStore/createPersonPolicy', payloadPaying).then(resp => {
                resolve()
              
              })
              .catch(err => {
  
                reject(err)
              })


            
            })
            .catch(err => {

              reject(err)
            })

          } else {

            reject(response.data.status.message)
          }

        })
        .catch(e => {

          reject(e)
        })

    })

  },
  updateHeaderPolicy({
    commit,
    state
  }) {

    return new Promise((resolve, reject) => {

      let url = Vue.prototype.$urlServices + `/api/v1/sbs/updateHeaderPolicy/headerPolicy`
      let dataPost = state.step1

      restApi.put(url, dataPost)
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
  getRisksPolicy({
    commit,
    state
  }) {

    return new Promise((resolve, reject) => {

      let uniqueIdentifier = state.step1.uniqueIdentifier
      anniversary = state.step1.anniversary


      let url = Vue.prototype.$urlServices + `/api/v1/sbs/riskPolicy/uniqueIdentifier/${uniqueIdentifier}/anniversary/${anniversary}`
      restApi.get(url)
        .then(response => {

          if (response.data.status.code == 200) {


            resolve()
            commit('setRisksPolicy', response.data.getRiskPolicy);

          } else {

            reject(response.data.status.message)
          }

        })
        .catch(e => {

          reject(e)
        })

    })


  },

  getIntermediaryPolicy({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      let uniqueIdentifier = this.state.formPropertyStore.step1.uniqueIdentifier,
        anniversary = this.state.formPropertyStore.step1.anniversary;
      // let uniqueIdentifier = 1,
      //   anniversary = -1

      let url = Vue.prototype.$urlServices + `/api/v1/sbs/intermediaryPolicy/uniqueIdentifier/${uniqueIdentifier}/anniversary/${anniversary}`
      restApi.get(url)
        .then(response => {
          if (response.data.status.code == 200) {
            resolve()
            console.log(response);
            commit('setIntermediaryPolicy', response.data.getIntermediaryPolicyDTOS);
          } else {
            reject(response.data.status.message)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getPersonsPolicy({
    commit,
    state
  }) {

    return new Promise((resolve, reject) => {

      let uniqueIdentifier = state.step1.uniqueIdentifier
      anniversary = state.step1.anniversary


      let url = Vue.prototype.$urlServices + `/api/v1/sbs/policyLinksPerson/uniqueIdentifier/${uniqueIdentifier}/anniversary/${anniversary}`
      restApi.get(url)
        .then(response => {

          if (response.data.status.code == 200) {


            resolve()
            commit('setPersonsPolicy', response.data.getPolicyLinksPersonDTOList);

          } else {

            reject(response.data.status.message)
          }

        })
        .catch(e => {

          reject(e)
        })

    })


  },

  createPersonPolicy({
    commit,
    state
  }, dataPerson) {

    return new Promise((resolve, reject) => {


      let url = Vue.prototype.$urlServices + `/api/v1/oal/createPolicylinksperson`
      restApi.post(url, dataPerson)
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
  }
  // getCoveragePolicy(state, data) {
  //   let urlData = state.state.step2.risks[data.key];
  //   console.log('urlData');
  //   console.log(data);
  //   console.log(urlData);
  //   console.log('/ urlData');
  //   return new Promise((resolve, reject) => {
  //     // console.log(state.step1.anniversary);

  //     //let uniqueIdentifier = state.step1.uniqueIdentifier,
  //     let anniversary = -1;
  //     let uniqueIdentifier = 1;
  //     let riskNumber = 1;
  //     let url = Vue.prototype.$urlServices + `/api/v1/sbs/coveragePolicy/uniqueIdentifier/${uniqueIdentifier}/anniversary/${anniversary}/riskNumber/${riskNumber}`
  //     restApi.get(url)
  //       .then(response => {
  //         if (response.data.status.code == 200) {
  //           resolve()
  //           console.log(response);
  //           commit('setCoveragePolicy', response.data.getCoveragePolicyDTOS);
  //         } else {
  //           reject(response.data.status.message)
  //         }
  //       })
  //       .catch(e => {
  //         reject(e)
  //       })
  //   })
  // }


}
const mutations = {
  updateField,

  generateProtectionMutation(state, dataGenerateProtection) {
    console.log('state');
    console.log(state);
    console.log('dataGenerateProtection');
    console.log(dataGenerateProtection.dataGenerateProtection);
    let data = dataGenerateProtection.dataGenerateProtection
    //state.step2.risks = numberStep;
    state.step2.risks.push(dataGenerateProtection.dataGenerateProtection);
  },

  // Coverage Policy update
  coveragePolicyUpdate(state, dataCoveragePolicy) {
    if (typeof dataCoveragePolicy == 'object') {
      axios({
        method: 'post',
        url: Vue.prototype.$urlServices + '/api/v1/sbs/coveragePolicy',
        withCredentials: true,
        headers: {
          'Accept': '*/*',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        data: dataCoveragePolicy
      }).then(response => {
        response.customProperty = dataCoveragePolicy;
        state.coverageUpdate.push(response);
      }).catch(e => {
        console.log('Error');
        console.log(e);
      });
    } else {

    }
  },

  // crear intermediaria -  update
  SBSRestApi(state, data) {
    axios({
      method: `${data.typeAction}`,
      url: Vue.prototype.$urlServices + `/api/v1/sbs/${data.microserviceName}`,
      withCredentials: true,
      headers: {
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      },
      data: data.dataForm
    }).then(response => {
      response.customProperty = data.dataForm;
      state.coverageUpdate.push(response);

    }).catch(e => {
      console.log('Error');
      console.log(e);
    });
  },

  setPolicyData(state, data) {

    state.step1.validityDateFrom = data.validityDateFrom
    state.step1.validityDateUpTo = data.validityDateUpTo
    state.eventPolicy.flagEvent = true
    state.eventPolicy.typeEvent = data.typeEvent
    state.eventPolicy.typeSubEvent = data.typeSubEvent


  },

  clearPolicyData(state) {

    state.eventPolicy.typeEvent = null
    state.eventPolicy.typeSubEvent = null


  },


  setUniqueIdentifier(state, data) {

    state.step1.uniqueIdentifier = data.uniqueIdentifier
    state.step1.anniversary = -1 //Valor Provisional para grabar solo cotizaciones

  },

  setHeaderPolicy(state, data) {

    // /Validar si no existen datos dejar por default los de la configuración?
    state.step1.uniqueIdentifier = data.uniqueIdentifier
    state.step1.anniversary = data.anniversary
    state.step1.billingPeriodCode = data.billingPeriodCode
    state.step1.branchOfficeCode = data.branchOfficeCode
    state.step1.channelCode = data.channelCode
    state.step1.clauseCode = data.clauseCode
    state.step1.commercialBranchCode = data.commercialBranchCode
    state.step1.currencyCode = data.currencyCode
    state.step1.effectiveDateFrom = data.effectiveDateFrom
    state.step1.effectiveDateUntil = data.effectiveDateUntil
    state.step1.origin = data.origin
    state.step1.policyNumber = data.policyNumber
    state.step1.productCode = data.productCode
    state.step1.planCode = data.planCode

  },

  setRisksPolicy(state, data) {
    state.step2.intermediaries = data;
  },
  setIntermediaryPolicy(state, data) {
    state.step4.intermediaries = data;
  },
  setCoveragePolicy(state, data) {
    state.step2.coverages = data;
  },

  clearHeaderPolicy(state) {

    state.step1.uniqueIdentifier = null
    state.step1.anniversary = null
    state.step1.billingPeriodCode = null
    state.step1.branchOfficeCode = null
    state.step1.channelCode = null
    state.step1.clauseCode = null
    state.step1.commercialBranchCode = null
    state.step1.currencyCode = null
    state.step1.effectiveDateFrom = null
    state.step1.effectiveDateUntil = null
    state.step1.origin = null
    state.step1.policyNumber = null
    state.step1.productCode = null

  },

  setProductConfigurationHeaderPolicy(state) {

    // /Validar si no existen datos dejar por default los de la configuración?   
    state.step1.validityTimeFrom = this.state.productConfigurationStore.productPlan.timeFrom + ":00"
    state.step1.validityTimeUpTo = this.state.productConfigurationStore.productPlan.timeUp + ":00"
    state.step1.uniqueIdentifier = null
    state.step1.anniversary = null
    state.step1.billingPeriodCode = this.state.productConfigurationStore.productPlan.billingPeriodCode
    state.step1.branchOfficeCode = null
    state.step1.channelCode = null
    state.step1.clauseCode = this.state.productConfigurationStore.productPlan.clampedCode
    state.step1.currencyCode = this.state.productConfigurationStore.productPlan.currencyCode
    state.step1.commercialBranchCode = this.state.productConfigurationStore.productPlan.bouquetCodeCore
    state.step1.effectiveDateUntil = null
    state.step1.origin = null
    //state.step1.policyNumber = null
    state.step1.productCode = this.state.productConfigurationStore.productPlan.productCode
    state.step1.planCode = this.state.productConfigurationStore.productPlan.planCode
    state.step1.typeRiskCode = this.state.productConfigurationStore.productPlan.typeRiskCode

  },
  addNewRiskList(state) {

    console.log(this.state.riskPolicyStore)
    let dataNewRisk = Object.assign({}, this.state.riskPolicyStore);
    state.step2.risks.push(dataNewRisk);
  },

  setPersonsPolicy(state, dataPersons) {

    dataPersons.forEach(element => {




      if (element.codeLinkPerson == 1) {
        state.step1.documentHolderNumber = element.documentNumber
        state.step1.typeDocumentHolder = element.typeDocument
        state.step1.takerName = element.fullNameCompanyName
      } else {


        if (element.codeLinkPerson == 11) {

          state.step1.typePayingDocument = element.typeDocument
          state.step1.payingDocumentNumber = element.documentNumber
          state.step1.payingName = element.fullNameCompanyName
        }
      }


    })

  }
}
export default {
  namespaced: true,
  state() {
    return {
      namespaced: true,
      stepNumber: 0,
      isReadOnly: false,
      isPreConfig: true,
      step1: {
        serialNumberRisk: 1,
        applicationCode: Vue.prototype.$applicationCode,
        processCode: 1, //Datos Provisionales COTIZACIÓN - NUEVA
        stateCode: 0, //Datos Provisionales COTIZACIÓN - NUEVA
        uniqueIdentifier: '',
        anniversary: '',
        billingPeriodCode: '',
        branchOfficeCode: '',
        channelCode: '',
        clauseCode: '',
        commercialBranchCode: '',
        currencyCode: '',
        effectiveDateFrom: '',
        effectiveDateUntil: '',
        origin: '',
        policyNumber: '999',
        productCode: '',
        planCode: '',
        typeRiskCode: '',
        validityTimeFrom: null,
        validityTimeUpTo: null,
        typeDocumentHolder: null,
        documentHolderNumber: null,
        takerName: null,
        typePayingDocument: null,
        payingDocumentNumber: null,
        payingName: null,
        validityDateFrom: null,
        validityDateUpTo: null,
        taker: null,
        insured: null,
        wayToPay: null,
        payment: null,
        takerTypeDocument: null,
        takerNumberDocument: null,
        typeEvent: null,
        typeSubEvent: null,
        flagEvent: null

      },
      step2: {
        tipoDireccion: null,
        riskDirection: null,
        numberOfFloors: null,
        buildingDate: null,
        typeOfConstruction: null,
        risks: [],
        coverages: [],
        editedIndexrisks: -1,
        editedItemrisks: {
          tipoAmparo: null,
          valorAsegurado: null,
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
        defaultItemrisks: {
          tipoAmparo: null,
          valorAsegurado: null,
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
          street1: null,
          street1Complement: null,
          street2: null,
          street2Complement: null,
          streetTypeCode: null,
          urban: true,
        }
      },
      step3: {
        riskDirection: null,
        numberOfFloors: null,
        buildingDate: null,
        typeOfConstruction: null,
      },
      step4: {
        intermediaries: [],
      },
      coverageUpdate: [],
      dataForm: {},
      propertyController: {
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
        street1: null,
        street1Complement: null,
        street2: null,
        street2Complement: null,
        streetTypeCode: null,
        urban: true,
      },
      eventUser: {
        uniqueIdentifierSelect: null,
        anniversarySelect: null,
        typeEventSelect: null,
        typeSubEventSelect: null,
        flagEventSelect: null
      }

    }
  },
  getters,
  actions,
  mutations
}
