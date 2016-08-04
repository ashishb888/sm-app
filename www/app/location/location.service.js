(function() {
  angular.module('starter').factory('locationService', locationService);
  locationService.$inject = ['$http', 'utilService', 'starterConfig'];

  function locationService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var pc = this;

    logger.debug("locationService service");

    pc.updateLocation = updateLocation;
    pc.getLocation = getLocation;

    function getLocation(id) {
      logger.debug("getLocation() service");
      return $http.get(sc.ws + '/location/' + id, sc.httpReq.config);
    }

    function updateLocation(req) {
      logger.debug("updateLocation() service");
      return $http.post(sc.ws + '/location', req, sc.httpReq.config);
    }

    return pc;
  }
})();
