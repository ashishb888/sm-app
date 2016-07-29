(function() {
  angular.module('starter').factory('signupService', signupService);
  signupService.$inject = ['$http', 'utilService', 'starterConfig'];
  function signupService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var ss = this;

    ss.signup = signup;

    function signup(req) {
      logger.debug("signup() service");
      //return Ionic.Auth.signup(req);
      return $http.post(sc.ws + '/users', req, sc.httpReq.config);
    }

    return ss;
  }
})();
