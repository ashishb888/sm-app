(function() {
  angular.module('starter').factory('familyService', familyService);
  familyService.$inject = ['$http', 'utilService', 'starterConfig'];

  function familyService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var fc = this;

    logger.debug("familyService service");

    fc.updateFamily = updateFamily;
    fc.getFamily = getFamily;

    function getFamily(id) {
      logger.debug("getFamily() service");
      return $http.get(sc.ws + '/family/' + id, sc.httpReq.config);
    }

    function updateFamily(req) {
      logger.debug("updateFamily() service");
      return $http.post(sc.ws + '/family', req, sc.httpReq.config);
    }

    return fc;
  }
})();
