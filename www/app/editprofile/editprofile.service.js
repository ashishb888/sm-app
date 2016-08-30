(function() {
  angular.module('starter').factory('editProfileService', editProfileService);
  editProfileService.$inject = ['$http', 'utilService', 'starterConfig', 'lsService'];

  function editProfileService($http, utilService, sConfig, lsService) {
    var logger = utilService.getLogger();
    var eps = this;

    logger.debug("editProfileService service");

    var httpConfig = JSON.parse(lsService.get("httpConfig"));

    eps.updateBasicDetails = updateBasicDetails;
    eps.getBasicDetails = getBasicDetails;
    eps.updateReligiousInfo = updateReligiousInfo;
    eps.getReligiousInfo = getReligiousInfo;
    eps.updateProfessionInfo = updateProfessionInfo;
    eps.getProfessionInfo = getProfessionInfo;
    eps.updateLocationInfo = updateLocationInfo;
    eps.getLocationInfo = getLocationInfo;
    eps.updateFamilyInfo = updateFamilyInfo;
    eps.getFamilyInfo = getFamilyInfo;
    eps.updateImgs = updateImgs;
    eps.getImgs = getImgs;
    eps.removeImg = removeImg;
    eps.updateDP = updateDP;
    eps.getDP = getDP;
    eps.updateProfilePreference = updateProfilePreference;
    eps.getProfilePreference = getProfilePreference;

    function getProfilePreference(id) {
      logger.debug("getProfilePreference() service");
      return $http.get(sConfig.ws + '/profilepreference', httpConfig);
    }

    function updateProfilePreference(req) {
      logger.debug("updateProfilePreference() service");
      return $http.post(sConfig.ws + '/profilepreference', req, httpConfig);
    }

    function updateDP(req) {
      logger.debug("updateDP() service");
      return $http.post(sConfig.ws + '/images/dp', req, httpConfig);
    }

    function getDP() {
      logger.debug("getDP() service");
      return $http.get(sConfig.ws + '/images/dp', httpConfig);
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

    function getFamilyInfo(id) {
      logger.debug("getFamilyInfo() service");
      return $http.get(sConfig.ws + '/family', httpConfig);
    }

    function updateFamilyInfo(req) {
      logger.debug("updateFamilyInfo() service");
      return $http.post(sConfig.ws + '/family', req, httpConfig);
    }

    function getLocationInfo(id) {
      logger.debug("getLocationInfo() service");
      return $http.get(sConfig.ws + '/location', httpConfig);
    }

    function updateLocationInfo(req) {
      logger.debug("updateLocationInfo() service");
      return $http.post(sConfig.ws + '/location', req, httpConfig);
    }

    function getProfessionInfo(id) {
      logger.debug("getProfessionInfo() service");
      return $http.get(sConfig.ws + '/profession', httpConfig);
    }

    function updateProfessionInfo(req) {
      logger.debug("updateProfessionInfo() service");
      return $http.post(sConfig.ws + '/profession', req, httpConfig);
    }

    function getReligiousInfo(id) {
      logger.debug("getReligiousInfo() service");
      return $http.get(sConfig.ws + '/religious', httpConfig);
    }

    function updateReligiousInfo(req) {
      logger.debug("updateReligiousInfo() service");
      return $http.post(sConfig.ws + '/religious', req, httpConfig);
    }

    function getBasicDetails(id) {
      logger.debug("getBasicDetails() service");
      return $http.get(sConfig.ws + '/basicdetails', httpConfig);
    }

    function updateBasicDetails(req) {
      logger.debug("updateBasicDetails() service");
      return $http.post(sConfig.ws + '/basicdetails', req, httpConfig);
    }

    return eps;
  }
})();
