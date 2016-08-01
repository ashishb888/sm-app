(function() {
  angular.module('starter').factory('settingsService', settingsService);
  settingsService.$inject = ['$http', 'utilService', 'starterConfig'];

  function settingsService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var ss = this;

    ss.updatePassword = updatePassword;
    ss.updatePhone = updatePhone;

    function updatePassword(req) {
      logger.debug("updatePassword() service");
      return $http.post(sc.ws + '/password', req, sc.httpReq.config);
    }

    function updatePhone(req) {
      logger.debug("updatePhone() service");
      return $http.post(sc.ws + '/phone', req, sc.httpReq.config);
    }

    return ss;
  }
})();
