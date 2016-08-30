(function() {
  angular.module('starter').factory('profileService', profileService);
  profileService.$inject = ['$http', 'utilService', 'starterConfig', 'lsService'];

  function profileService($http, utilService, sConfig, lsService) {
    var logger = utilService.getLogger();
    var ps = this;

    logger.debug("profileService service");

    var httpConfig = JSON.parse(lsService.get("httpConfig"));

    ps.updatePInfo = updatePInfo;
    ps.updateLocation = updateLocation;
    ps.updateFamily = updateFamily;
    ps.updateProfession = updateProfession;
    ps.getProfiles = getProfiles;
    ps.getProfile = getProfile;
    ps.searchProfile = searchProfile;
    ps.shortlist = shortlist;
    ps.unShortlist = unShortlist;
    ps.interest = interest;
    ps.disinterest = disinterest;
    ps.getImgs = getImgs;
    ps.getShortlist = getShortlist;
    ps.getRequestsOut = getRequestsOut;
    ps.getRequestsIn = getRequestsIn;
    ps.getImgsById = getImgsById;
    ps.filterProfiles = filterProfiles;
    ps.updateProfilePreference = updateProfilePreference;
    ps.accept = accept;
    ps.reject = reject;
    ps.getAccepted = getAccepted;
    ps.getRejected = getRejected;
    ps.getVisitors = getVisitors;
    ps.getPaginateProfiles = getPaginateProfiles;

    // Functions definations
    function getPaginateProfiles(page) {
      logger.debug("getPaginateProfiles() service");
      return $http.get(sConfig.ws + '/users/paginate/' + page, httpConfig);
    }

    function getVisitors(page) {
      logger.debug("getVisitors() service");
      return $http.get(sConfig.ws + '/visitors/' + page, httpConfig);
    }

    function getRejected(type, page) {
      logger.debug("getRejected() service");
      return $http.get(sConfig.ws + '/reject/' + type + "/" + page, httpConfig);
    }

    function getAccepted(type, page) {
      logger.debug("getAccepted() service");
      return $http.get(sConfig.ws + '/accept/' + type + "/" + page, httpConfig);
    }

    function reject(req) {
      logger.debug("reject() service");
      return $http.post(sConfig.ws + '/reject', req, httpConfig);
    }

    function accept(req) {
      logger.debug("accept() service");
      return $http.post(sConfig.ws + '/accept', req, httpConfig);
    }

    function updateProfilePreference(req) {
      logger.debug("updateProfilePreference() service");
      return $http.post(sConfig.ws + '/profilepreference', req, httpConfig);
    }

    function filterProfiles(req) {
      logger.debug("filterProfiles() service");
      return $http.post(sConfig.ws + '/filterprofiles', req, httpConfig);
    }

    function getImgsById(id) {
      logger.debug("getImgsById() service");
      return $http.get(sConfig.ws + '/images/' + id, httpConfig);
    }

    function getRequestsIn(page) {
      logger.debug("getRequestsIn() service");
      return $http.get(sConfig.ws + '/requestsin/' + page, httpConfig);
    }

    function getRequestsOut(page) {
      logger.debug("getRequestsOut() service");
      return $http.get(sConfig.ws + '/requestsout/' + page, httpConfig);
    }

    function getShortlist(page) {
      logger.debug("getShortlist() service");
      return $http.get(sConfig.ws + '/shortlist/' + page, httpConfig);
    }

    function getImgs(type, id) {
      logger.debug("getImgs() service");
      return $http.get(sConfig.ws + '/images/' + type + "/" + id, httpConfig);
    }

    function disinterest(req) {
      logger.debug("disinterest() service");
      return $http.post(sConfig.ws + '/disinterest', req, httpConfig);
    }

    function interest(req) {
      logger.debug("interest() service");
      return $http.post(sConfig.ws + '/interest', req, httpConfig);
    }

    function unShortlist(req) {
      logger.debug("unShortlist() service");
      return $http.post(sConfig.ws + '/unshortlist', req, httpConfig);
    }

    function shortlist(req) {
      logger.debug("shortlist() service");
      return $http.post(sConfig.ws + '/shortlist', req, httpConfig);
    }

    function getProfile(userId, isView) {
      logger.debug("getProfile() service");

      if (isView === true)
        return $http.get(sConfig.ws + '/users/' + userId + "/" + isView, httpConfig);

      return $http.get(sConfig.ws + '/users/' + userId, httpConfig);
    }

    function searchProfile(userId) {
      logger.debug("searchProfile() service");
      return $http.get(sConfig.ws + '/users/search/' + userId, httpConfig);
    }

    /*function getProfiles() {
      logger.debug("getProfiles() service");
      return $http.get(sConfig.ws + '/users', httpConfig);
    }*/
    // Need to change
    function getProfiles(id) {
      logger.debug("getProfiles() service");
      return $http.get(sConfig.ws + '/users', httpConfig);
    }

    function updatePInfo(req) {
      logger.debug("updatePInfo() service");
      return $http.post(sConfig.ws + '/pinfo', req, httpConfig);
    }

    function updateLocation(req) {
      logger.debug("updateLocation() service");
      return $http.post(sConfig.ws + '/location', req, httpConfig);
    }

    function updateFamily(req) {
      logger.debug("updateFamily() service");
      return $http.post(sConfig.ws + '/family', req, httpConfig);
    }

    function updateProfession(req) {
      logger.debug("updateProfession() service");
      return $http.post(sConfig.ws + '/profession', req, httpConfig);
    }

    return ps;
  }
})();
