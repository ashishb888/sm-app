(function() {
  angular.module('starter').factory('professionService', professionService);
  professionService.$inject = ['$http', 'utilService', 'starterConfig'];

  function professionService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var pc = this;

    logger.debug("professionService service");

    pc.updateProfession = updateProfession;
    pc.getProfession = getProfession;

    function getProfession(id) {
      logger.debug("getProfession() service");
      return $http.get(sc.ws + '/profession/' + id, sc.httpReq.config);
    }

    function updateProfession(req) {
      logger.debug("updateProfession() service");
      return $http.post(sc.ws + '/profession', req, sc.httpReq.config);
    }

    return pc;
  }
})();
