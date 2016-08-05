(function() {
  angular.module('starter').controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', 'settingsService'];

  function SettingsCtrl(sConfig, utilService, $state, $ionicPopup, lsService, settingsService) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("SettingsCtrl start");

    var sc= this;

    // Variables section
    //Password form
    sc.isUpdatePassword = true;
    sc.passuf = {};
    sc.passuf.oldPassword;
    sc.passuf.password;
    sc.passuf.rePassword;
    //Phone form
    sc.puf = {};
    sc.puf.oldPhone;
    sc.puf.phone;

    // Function section
    sc.showUpdatePasswordForm = showUpdatePasswordForm;
    sc.showUpdatePhoneForm = showUpdatePhoneForm;
    sc.updatePassword = updatePassword;
    sc.updatePhone = updatePhone;

    // Functions definations
    function updatePhone() {
      try {
        logger.debug("updatePhone function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            phone: sc.puf
          }
        };
        var promise = settingsService.updatePhone(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              // utilService.appAlert(resp.messages);
              return;
            }
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            //sc.puf = {};
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function updatePassword() {
      try {
        logger.debug("updatePassword function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            password: sc.passuf
          }
        };
        var promise = settingsService.updatePassword(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              //utilService.appAlert(resp.messages);
              return;
            }
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            //sc.passuf = {};
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

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
