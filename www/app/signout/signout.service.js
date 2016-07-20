(function() {
  angular.module('starter').factory('signoutService', signoutService);
  signoutService.$inject = ['$http', 'utilService', 'starterConfig'];

  function signoutService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var os = this;

    os.signout = signout;

    function signout(req) {
      logger.debug("signout() service");
      return $http.post(sc.ws + '/signout', JSON.stringify(req),
        sc.httpReq.config);
    }

    return os;
  }
})();
