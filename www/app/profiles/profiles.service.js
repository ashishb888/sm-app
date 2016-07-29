(function() {
  angular.module('starter').factory('profileService', profileService);
  profileService.$inject = ['$http', 'utilService', 'starterConfig'];
  function profileService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var ps = this;

    ps.updatePInfo = updatePInfo;
    ps.updateLocation = updateLocation;
    ps.updateFamily = updateFamily;
    ps.updateProfessional = updateProfessional;

    function updatePInfo(req) {
      logger.debug("updatePInfo() service");
      return $http.post(sc.ws + '/pinfo', req, sc.httpReq.config);
    }

    function updateLocation(req) {
      logger.debug("updateLocation() service");
      return $http.post(sc.ws + '/location', req, sc.httpReq.config);
    }

    function updateFamily(req) {
      logger.debug("updateFamily() service");
      return $http.post(sc.ws + '/family', req, sc.httpReq.config);
    }

    function updateProfessional(req) {
      logger.debug("updateProfessional() service");
      return $http.post(sc.ws + '/professional', req, sc.httpReq.config);
    }

    return ps;
  }
})();
