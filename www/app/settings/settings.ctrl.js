(function() {
  angular.module('starter').controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal'];

  function SettingsCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("SettingsCtrl start");

    var sc= this;

    // Variables section
    sc.isUpdatePassword = true;

    // Function section
    sc.showUpdatePasswordForm = showUpdatePasswordForm;
    sc.showUpdatePhoneForm = showUpdatePhoneForm;

    function showUpdatePasswordForm() {
      logger.debug("showUpdatePasswordForm function");
      sc.isUpdatePassword = true;
    }

    function showUpdatePhoneForm() {
      logger.debug("showUpdatePhoneForm function");
      sc.isUpdatePassword = false;
    }

    logger.debug("SettingsCtrl end");
  }
})();
