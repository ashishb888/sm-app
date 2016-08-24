(function() {
  angular.module('starter').factory('initAppService', initAppService);
  initAppService.$inject = ['$http', 'utilService', 'starterConfig'];
  function initAppService($http, utilService, sConfig) {
    var logger = utilService.getLogger();
    var ia = this;

    ia.initApp = initApp;

    function initApp() {
      logger.debug("initApp() service");
      return $http.get(sConfig.ws + '/initapp', sConfig.httpReq.config);
    }

    return ia;
  }
})();
