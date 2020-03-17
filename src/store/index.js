import Vue from 'vue'
import Vuex from 'vuex'
import '@/assets/images/logos/favicon.ico'

/* globalModules */
import userStore from './appModules/userStore'
import dictionariesStore from './globalModules/dictionariesStore'
import personStore from './globalModules/personStore'
import productStore from './globalModules/productStore'
import productPlanStore from './globalModules/productPlanStore'
import productConfigurationStore from './globalModules/productConfigurationStore'

/* logicModules */
import formPropertyStore from './logicModules/propertyRiskPolicy/formPropertyStore'
import riskPolicyStore from './logicModules/propertyRiskPolicy/riskPolicyStore'
import propertyRiskPolicy from './logicModules/propertyRiskPolicy/propertyRiskPolicy'
import coveragePolicyStore from './logicModules/propertyRiskPolicy/coveragePolicyStore'
import riskSummAssuredStrore from './logicModules/propertyRiskPolicy/riskSummAssuredStrore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    dictionariesStore,
    formPropertyStore,
    personStore,
    productStore,
    productPlanStore,
    productConfigurationStore,
    riskPolicyStore,
    propertyRiskPolicy,
    coveragePolicyStore,
    riskSummAssuredStrore
  }
})
