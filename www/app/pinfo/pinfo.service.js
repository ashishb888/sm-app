(function() {
  angular.module('starter').factory('pinfoService', pinfoService);
  pinfoService.$inject = ['$http', 'utilService', 'starterConfig'];

  function pinfoService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var pic = this;

    logger.debug("pinfoService service");

    pic.updatePInfo = updatePInfo;
    pic.getPInfo = getPInfo;

    function getPInfo(id) {
      logger.debug("getPInfo() service");
      return $http.get(sc.ws + '/pinfo/' + id, sc.httpReq.config);
    }

    function updatePInfo(req) {
      logger.debug("updatePInfo() service");
      return $http.post(sc.ws + '/pinfo', req, sc.httpReq.config);
    }

    return pic;
  }
})();
