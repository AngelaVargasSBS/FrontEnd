import Vue from 'vue'
import axios from 'axios'
import restApi from '@/store/utils/restApi.js'


const state = {

  status: '',
  errorLogin: '',
  token: '',
  user: {},
  registeredComponents: '',
  userProfile: {},
  userModules: {},
  appComponents: {},
  productCodeSelect: '',
  planCodeSelect: '',
  typeRiskCodeSelect:''
}
const getters = {
  isAuthenticated: state => !!state.token,
  isRejected: state => !!state.errorLogin,
  authStatus: state => state.status,
  errorStatus: state => state.errorLogin,
  getAppComponents: state => state.appComponents,
  getRegisteredComponents:  state =>state.registeredComponents,
  getTokenData: state => state.token,
  getUserModules: state => state.userModules,
  getGroupBranchSelect: state => state.groupBranchSelect
}
const actions = {
  async login({
    commit
  }, user) {
    return new Promise((resolve, reject) => {

      let url = Vue.prototype.$urlServices + '/api/v1/sbs/login'
      let data = user
      restApi.post(url, data)
        .then(resp => {
          commit('auth_request')
          if (resp.data.resultObject.resultCode === 1) {
            let payload = {
              user: user,
              profileUser: resp.data.resultObject.person,
              componentsUser: resp.data.resultObject.appComponents,
              modulesUser: resp.data.resultObject.moduleProfileAppAuthenticate
            }

            let validationData = true
            if (resp.data.resultObject.appComponents != undefined && resp.data.resultObject.moduleProfileAppAuthenticate != undefined) {
              if (resp.data.resultObject.moduleProfileAppAuthenticate.length == 0) {
                validationData = false
              }
            } else {
              validationData = false
            }

            if (validationData == true) {
              this.dispatch('userStore/getToken', payload).then(resp => {
                  resolve()
                })
                .catch(err => {
                  commit('auth_error', err)
                  localStorage.removeItem('token')
                  reject(err)
                })
            } else {

              let err = 'Usuario sin Permisos'
              commit('auth_error', err)
              localStorage.removeItem('token')
              reject(err)
            }

          } else {
            let error = resp.data.resultObject.status.message
            console.log(error)
            commit('auth_error', error)
            // location.reload(true)
            resolve()
          }
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout({
    commit
  }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
  async getToken({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      let username = Vue.prototype.$stratioUser
      let password = Vue.prototype.$stratioPassword

      let url = Vue.prototype.$urlStratio + '/api/v1/login'
      let data = {
        username,
        password
      }

      restApi.post(url, data).then(resp => {
          if (resp.data.status.code === '200') {
            const token = resp.data.token
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('token_success', token)
            commit('auth_success', payload)
            resolve(resp)
          } else {
            commit('token_error', resp.data.status.message)
            resolve(resp)
          }
        })
        .catch(err => {
          commit('token_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  }

}

const mutations = {
  registeredComponentsSuccess(state) {
    state.registeredComponents= 'true'
  },
  auth_request(state) {
    state.status = 'Loading'
  },
  auth_success(state, payload) {
    state.status = 'Success Authentication'
    state.user = payload.user
    state.userProfile = payload.profileUser
    state.appComponents = payload.componentsUser
    state.userModules = payload.modulesUser
    state.errorLogin = ''
  },
  auth_error(state, errorLogin) {
    state.status = 'Error Authentication'
    state.errorLogin = errorLogin
    state.user = {}
    state.profileUser = {}
    state.permissionUserModules = {}
  },
  token_error(state, errorLogin) {
    state.status = 'Error Token'
    state.errorLogin = errorLogin
    state.user = {}
    state.profileUser = {}
    state.permissionUserModules = {}
  },
  token_success(state, token) {
    state.status = 'Success Token'
    state.token = token
    state.errorLogin = ''
  },
  logout(state) {
    state.status = ''
    state.errorLogin = ''
    state.token = ''
    state.user = {}
    state.profileUser = {}
    state.permissionUserModules = {}
  },

  setProductConfigurationSelect(state, dataSelect) {

    state.productCodeSelect = dataSelect.productCodeSelect
    state.planCodeSelect = dataSelect.planCodeSelect
    state.typeRiskCodeSelect = dataSelect.typeRiskCodeSelect
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
