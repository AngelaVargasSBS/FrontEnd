import axios from "axios"
import store from "@/store"



const getClient = () => {

    const options = {};

    if (store.getters['userStore/getTokenData']) {
        options.headers = {
            Authorization: `Bearer ${store.getters['userStore/getTokenData']}`,
        };
    }

    const client = axios.create(options);

    client.interceptors.request.use(
        requestConfig => requestConfig,
        (requestError) => {
            //Raven.captureException(requestError);
            return Promise.reject(requestError);
        },
    );

    client.interceptors.response.use(
        response => response,
        (error) => {
       
            //console.log(error)    
            //
            // /Raven.captureException(error);           
            return Promise.reject(error);
        },
    );

    return client;
};




export default {


    get(url, conf = {}) {
        
        const  client = getClient()
        return client.get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    delete(url, conf = {}) {
        const  client = getClient()
        return client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    head(url, conf = {}) {
        const  client = getClient()
        return client.head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    options(url, conf = {}) {
        const  client = getClient()
        return client.options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    post(url, data = {}, conf = {}) {
        const  client = getClient()
        return client.post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    put(url, data = {}, conf = {}) {
        const  client = getClient()
        return client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    patch(url, data = {}, conf = {}) {
        const  client = getClient()
        return client.patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }
}