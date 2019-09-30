// vue.config.js
module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        data: `
          @import "materialize-css/sass/materialize.scss";
          @import "../colors.scss";
          @import "../common.scss";`
      }
    }
  }
};
