(function() {
  angular.module('starter').factory('imagesService', imagesService);
  imagesService.$inject = ['$http', 'utilService', 'starterConfig', 'lsService'];
  function imagesService($http, utilService, sConfig, lsService) {
    var logger = utilService.getLogger();
    logger.debug("imagesService service");
    var is = this;
    var httpConfig = JSON.parse(lsService.get("httpConfig"));

    is.updateImgs = updateImgs;
    is.getImgs = getImgs;
    is.removeImg = removeImg;
    is.updateDP = updateDP;
    is.getImgsById = getImgsById;

    function getImgsById(type, id) {
      logger.debug("getImgsById() service");
      return $http.get(sConfig.ws + '/images/' + id, httpConfig);
    }

    function updateDP(req) {
      logger.debug("updateDP() service");
      return $http.post(sConfig.ws + '/images/dp', req, httpConfig);
    }

    function removeImg(id) {
      logger.debug("removeImg() service");
      return $http.delete(sConfig.ws + '/images/' + id, httpConfig);
    }

    function updateImgs(req) {
      logger.debug("updateImgs() service");
      return $http.post(sConfig.ws + '/images', req, httpConfig);
    }

    function getImgs(type, id) {
      logger.debug("getImgs() service");
      return $http.get(sConfig.ws + '/images/' + type + "/" + id, httpConfig);
    }

    return is;
  }
})();
