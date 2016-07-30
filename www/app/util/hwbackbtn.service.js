(function() {
  angular.module('starter').service('hwBackBtnService', hwBackBtnService);
  hwBackBtnService.$inject = ['$ionicPlatform', 'utilService', '$cordovaToast', '$timeout'];

  function hwBackBtnService($ionicPlatform, utilService, $cordovaToast, $timeout) {
    var logger = utilService.getLogger();
    this.HWBackbtnDeregister = undefined;

    this.disableHWBackBtn = function() {
      logger.debug("disableHWBackBtn() service");
      this.HWBackbtnDeregister = $ionicPlatform.registerBackButtonAction(function(e) {
        e.preventDefault();
        return false;
      }, 100);
    }

    this.enableHWBackBtn = function() {
      logger.debug("enableHWBackBtn() service");
      if (this.HWBackbtnDeregister !== undefined) {
        this.HWBackbtnDeregister();
        this.HWBackbtnDeregister = undefined;
      }
    }

    this.tapToExit = function() {
      logger.debug("tapToExit() service");

      var backBtnCnt = 0;

      $ionicPlatform.registerBackButtonAction(function(e) {
        // Add some states in if statement
        if (backBtnCnt == 0) {
          backBtnCnt++;
          $cordovaToast.showShortBottom("Press back again to exit app").then(function(success) {
            logger.debug("cordovaToast: " + success);
          }, function(error) {
            logger.error("cordovaToast: " + error);
          });

          $timeout(function() {
            backBtnCnt = 0;
          }, 2000);
        }else {
          navigator.app.exitApp();
        }
      }, 100);
    }

    return this;
  }
})();
