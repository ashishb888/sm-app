(function() {
  angular.module('starter').factory('editProfileService', editProfileService);
  editProfileService.$inject = ['$http', 'utilService', 'starterConfig'];

  function editProfileService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var eps = this;

    logger.debug("editProfileService service");

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
    eps.updateProfilePreference = updateProfilePreference;
    eps.getProfilePreference = getProfilePreference;

    function getProfilePreference(id) {
      logger.debug("getProfilePreference() service");
      return $http.get(sc.ws + '/profilepreference', sc.httpReq.config);
    }

    function updateProfilePreference(req) {
      logger.debug("updateProfilePreference() service");
      return $http.post(sc.ws + '/profilepreference', req, sc.httpReq.config);
    }

    function updateDP(req) {
      logger.debug("updateDP() service");
      return $http.post(sc.ws + '/images/dp', req, sc.httpReq.config);
    }

    function removeImg(id) {
      logger.debug("removeImg() service");
      return $http.delete(sc.ws + '/images/' + id, sc.httpReq.config);
    }

    function updateImgs(req) {
      logger.debug("updateImgs() service");
      return $http.post(sc.ws + '/images', req, sc.httpReq.config);
    }

    function getImgs(type, id) {
      logger.debug("getImgs() service");
      return $http.get(sc.ws + '/images/' + type, sc.httpReq.config);
    }

    function getFamilyInfo(id) {
      logger.debug("getFamilyInfo() service");
      return $http.get(sc.ws + '/family', sc.httpReq.config);
    }

    function updateFamilyInfo(req) {
      logger.debug("updateFamilyInfo() service");
      return $http.post(sc.ws + '/family', req, sc.httpReq.config);
    }

    function getLocationInfo(id) {
      logger.debug("getLocationInfo() service");
      return $http.get(sc.ws + '/location', sc.httpReq.config);
    }

    function updateLocationInfo(req) {
      logger.debug("updateLocationInfo() service");
      return $http.post(sc.ws + '/location', req, sc.httpReq.config);
    }

    function getProfessionInfo(id) {
      logger.debug("getProfessionInfo() service");
      return $http.get(sc.ws + '/profession', sc.httpReq.config);
    }

    function updateProfessionInfo(req) {
      logger.debug("updateProfessionInfo() service");
      return $http.post(sc.ws + '/profession', req, sc.httpReq.config);
    }

    function getReligiousInfo(id) {
      logger.debug("getReligiousInfo() service");
      return $http.get(sc.ws + '/religious', sc.httpReq.config);
    }

    function updateReligiousInfo(req) {
      logger.debug("updateReligiousInfo() service");
      return $http.post(sc.ws + '/religious', req, sc.httpReq.config);
    }

    function getBasicDetails(id) {
      logger.debug("getBasicDetails() service");
      return $http.get(sc.ws + '/basicdetails', sc.httpReq.config);
    }

    function updateBasicDetails(req) {
      logger.debug("updateBasicDetails() service");
      return $http.post(sc.ws + '/basicdetails', req, sc.httpReq.config);
    }

    return eps;
  }
})();
