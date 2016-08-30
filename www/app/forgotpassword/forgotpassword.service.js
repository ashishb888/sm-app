(function() {
  angular.module('starter').factory('forgotPasswordService', forgotPasswordService);
  forgotPasswordService.$inject = ['$http', 'utilService', 'starterConfig', 'lsService'];

  function forgotPasswordService($http, utilService, sConfig, lsService) {
    var logger = utilService.getLogger();
    logger.debug("forgotPasswordService service");

    var fp = this;
    var httpConfig = JSON.parse(lsService.get("httpConfig"));

    fp.forgotPassword = forgotPassword;
    fp.resetPassword = resetPassword;

    function forgotPassword(req) {
      logger.debug("forgotPassword() service");
      return $http.post(sConfig.ws + '/forgotpassword', req, httpConfig);
    }

    function resetPassword(req) {
      logger.debug("resetPassword() service");
      return $http.post(sConfig.ws + '/resetpassword', req, httpConfig);
    }

    return fp;
  }
})();
