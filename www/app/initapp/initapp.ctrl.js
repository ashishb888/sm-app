(function() {
  angular.module('starter').controller('InitAppCtrl', InitAppCtrl);

  InitAppCtrl.$inject = ['starterConfig', 'utilService', '$state', '$scope',
    '$rootScope', 'initAppService'
  ];

  function InitAppCtrl(sConfig, utilService, $state, $scope, $rootScope, initAppService) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("InitAppCtrl start");

    // Functions definations
    $rootScope.$on('initApp', function(event) {
      try {
        logger.debug("initApp function");

        var promise = initAppService.initApp();

        promise.then(function(sucResp) {
          var resp = sucResp.data;

          if (resp.status !== sConfig.httpStatus.SUCCESS) {
            utilService.toastMessage(resp.messages);
            return;
          }

          lsService.set("_id", resp.data._id);
          lsService.set("userId", resp.data.userId);
          lsService.set("location", JSON.stringify(resp.data.locationInfo));
          lsService.set("dob", resp.data.basicDetails.dob);
          lsService.set("height", JSON.stringify(resp.data.basicDetails.height));
          lsService.set("fullName", resp.data.basicDetails.fullName);
          lsService.set("gender", resp.data.basicDetails.gender);
        }).catch(function(errResp) {
        });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    });

    logger.debug("InitAppCtrl end");
  }
})();
