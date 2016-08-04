(function() {
  angular.module('starter').factory('imagesService', imagesService);
  imagesService.$inject = ['$http', 'utilService', 'starterConfig'];
  function imagesService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var is = this;

    is.updateImgs = updateImgs;
    is.getImgs = getImgs;

    function updateImgs(req) {
      logger.debug("updateImgs() service");
      return $http.post(sc.ws + '/images', req, sc.httpReq.config);
    }

    function getImgs(type, id) {
      logger.debug("getImgs() service");
      return $http.get(sc.ws + '/images/' + type + "/" + id, sc.httpReq.config);
    }

    return is;
  }
})();
