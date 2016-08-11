(function() {
  angular.module('starter').factory('profileService', profileService);
  profileService.$inject = ['$http', 'utilService', 'starterConfig'];

  function profileService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var ps = this;

    logger.debug("profileService service");

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

    function updateProfilePreference(req) {
      logger.debug("updateProfilePreference() service");
      return $http.post(sc.ws + '/profilepreference', req, sc.httpReq.config);
    }

    function filterProfiles(req) {
      logger.debug("filterProfiles() service");
      return $http.post(sc.ws + '/filterprofiles/', req, sc.httpReq.config);
    }

    function getImgsById(id) {
      logger.debug("getImgsById() service");
      return $http.get(sc.ws + '/images/' + id, sc.httpReq.config);
    }

    function getRequestsIn(id) {
      logger.debug("getRequestsIn() service");
      return $http.get(sc.ws + '/requestsin/' + id, sc.httpReq.config);
    }

    function getRequestsOut(id) {
      logger.debug("getRequestsOut() service");
      return $http.get(sc.ws + '/requestsout/' + id, sc.httpReq.config);
    }

    function getShortlist(id) {
      logger.debug("getShortlist() service");
      return $http.get(sc.ws + '/shortlist/' + id, sc.httpReq.config);
    }

    function getImgs(type, id) {
      logger.debug("getImgs() service");
      return $http.get(sc.ws + '/images/' + type + "/" + id, sc.httpReq.config);
    }

    function disinterest(req) {
      logger.debug("disinterest() service");
      return $http.post(sc.ws + '/disinterest', req, sc.httpReq.config);
    }

    function interest(req) {
      logger.debug("interest() service");
      return $http.post(sc.ws + '/interest', req, sc.httpReq.config);
    }

    function unShortlist(req) {
      logger.debug("unShortlist() service");
      return $http.post(sc.ws + '/unshortlist', req, sc.httpReq.config);
    }

    function shortlist(req) {
      logger.debug("shortlist() service");
      return $http.post(sc.ws + '/shortlist', req, sc.httpReq.config);
    }

    function getProfile(userId) {
      logger.debug("getProfile() service");
      return $http.get(sc.ws + '/users/' + userId, sc.httpReq.config);
    }

    function searchProfile(userId) {
      logger.debug("searchProfile() service");
      return $http.get(sc.ws + '/users/search/' + userId, sc.httpReq.config);
    }

    /*function getProfiles() {
      logger.debug("getProfiles() service");
      return $http.get(sc.ws + '/users', sc.httpReq.config);
    }*/
    // Need to change
    function getProfiles(id) {
      logger.debug("getProfiles() service");
      return $http.get(sc.ws + '/userstoken/' + id, sc.httpReq.config);
    }

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

    function updateProfession(req) {
      logger.debug("updateProfession() service");
      return $http.post(sc.ws + '/profession', req, sc.httpReq.config);
    }

    return ps;
  }
})();
