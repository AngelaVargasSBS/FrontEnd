module.exports = {
  //configureWebpack: {
    devServer: {
        proxy: 'http://10.197.102.13:8090/',
      headers: { "Access-Control-Allow-Origin": "*" }
    }
 // }
};