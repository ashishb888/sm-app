(function() {
  angular.module('starter').factory('forgotPasswordService', forgotPasswordService);
  forgotPasswordService.$inject = ['$http', 'utilService', 'starterConfig'];

  function forgotPasswordService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var fp = this;

    fp.forgotPassword = forgotPassword;
    fp.resetPassword = resetPassword;

    function forgotPassword(req) {
      logger.debug("forgotPassword() service");
      return $http.post(sc.ws + '/forgotpassword', req, sc.httpReq.config);
    }

    function resetPassword(req) {
      logger.debug("resetPassword() service");
      return $http.post(sc.ws + '/resetpassword', req, sc.httpReq.config);
    }

    return fp;
  }
})();
