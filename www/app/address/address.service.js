(function() {
  angular.module('starter').factory('addressService', addressService);
  addressService.$inject = ['$http', 'utilService', 'starterConfig'];

  function addressService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var as = this;

    // Services
    as.setAddress = setAddress;
    as.getAddress = getAddress;

    function setAddress(req) {
      logger.debug("setAddress() service");
      return $http.post(sc.ws + '/address', req, sc.httpReq.config);
    }

    function getAddress(req) {
      logger.debug("getAddress() service");
      return $http.get(sc.ws + '/address' + '/' + req, sc.httpReq.config);
    }

    return as;
  }
})();
