(function() {
  angular.module('starter').factory('settingsService', settingsService);
  settingsService.$inject = ['$http', 'utilService', 'starterConfig', 'lsService'];

  function settingsService($http, utilService, sConfig, lsService) {
    var logger = utilService.getLogger();
    var ss = this;
    logger.debug("settingsService service");

    var httpConfig = JSON.parse(lsService.get("httpConfig"));

    ss.updatePassword = updatePassword;
    ss.updatePhone = updatePhone;

    function updatePassword(req) {
      logger.debug("updatePassword() service");
      return $http.post(sConfig.ws + '/password', req, httpConfig);
    }

    function updatePhone(req) {
      logger.debug("updatePhone() service");
      return $http.post(sConfig.ws + '/phone', req, httpConfig);
    }

    return ss;
  }
})();
