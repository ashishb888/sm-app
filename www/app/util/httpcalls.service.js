(function() {
  angular.module('starter').factory('httpCallsService', httpCallsService);
  httpCallsService.$inject = ['$http', 'utilService', 'starterConfig', 'lsService'];
  function httpCallsService($http, utilService, sConfig, lsService) {
    var logger = utilService.getLogger();
    var hcs = this;

    logger.debug("httpCallsService service");

    hcs.updateLastActive = updateLastActive;
    hcs.initApp = initApp;

    function updateLastActive() {
      logger.debug("updateLastActive() service");
      $http.post(sConfig.ws + '/lastactive', lsService.get("httpConfig") ? JSON.parse(lsService.get("httpConfig")) : sConfig.httpReq.config)
      .then(function(sucResp) {
      }).catch(function(errResp) {
      });
    }

    function initApp() {
      logger.debug("initApp() service");
      $http.get(sConfig.ws + '/initapp', lsService.get("httpConfig") ? JSON.parse(lsService.get("httpConfig")) : sConfig.httpReq.config)
      .then(function(sucResp) {
        var resp = sucResp.data;

        lsService.set("age", JSON.stringify(resp.data.age));
        lsService.set("height", JSON.stringify(resp.data.height));
        lsService.set("bodyTypes", JSON.stringify(resp.data.bodyTypes));
        lsService.set("martitalStatus", JSON.stringify(resp.data.martitalStatus));
        lsService.set("complexion", JSON.stringify(resp.data.complexion));
        lsService.set("physicalStatus", JSON.stringify(resp.data.physicalStatus));
        lsService.set("subCaste", JSON.stringify(resp.data.subCaste));
        lsService.set("zodiac", JSON.stringify(resp.data.zodiac));
        lsService.set("education", JSON.stringify(resp.data.education));
        lsService.set("sideMenuTitles", JSON.stringify(resp.data.sideMenuTitles));
        lsService.set("familyType", JSON.stringify(resp.data.familyType));
        lsService.set("familyValues", JSON.stringify(resp.data.familyValues));
        lsService.set("familyStatus", JSON.stringify(resp.data.familyStatus));
        lsService.set("occupation", JSON.stringify(resp.data.occupation));
        lsService.set("gender", JSON.stringify(resp.data.gender));
        lsService.set("district", JSON.stringify(resp.data.location.district));
        lsService.set("taluka", JSON.stringify(resp.data.location.taluka));
        lsService.set("httpConfig", JSON.stringify(resp.data.httpConfig));
        lsService.set("camera", JSON.stringify(resp.data.camera));

        resp.data.age.splice(0, 0, "Any");
        resp.data.height.splice(0, 0, "Any");
        resp.data.bodyTypes.splice(0, 0, "Any");
        resp.data.complexion.splice(0, 0, "Any");
        resp.data.subCaste.splice(0, 0, "Any");
        resp.data.zodiac.splice(0, 0, "Any");

        lsService.set("ageAny", JSON.stringify(resp.data.age));
        lsService.set("heightAny", JSON.stringify(resp.data.height));
        lsService.set("bodyTypesAny", JSON.stringify(resp.data.bodyTypes));
        lsService.set("complexionAny", JSON.stringify(resp.data.complexion));
        lsService.set("subCasteAny", JSON.stringify(resp.data.subCaste));
        lsService.set("zodiacAny", JSON.stringify(resp.data.zodiac));
      }).catch(function(errResp) {
      });
    }

    return hcs;
  }
})();
