(function() {
  angular.module('starter').controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

  ForgotPasswordCtrl.$inject = ['starterConfig', 'utilService', 'forgotPasswordService'];

  function ForgotPasswordCtrl(sc, utilService, forgotPasswordService) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("ForgotPasswordCtrl start");

    var fpCtrl = this;
    fpCtrl.isMobileReg = false;
    var req = {};

    // Functions section
    fpCtrl.forgotPassword = forgotPassword;
    fpCtrl.resetPassword = resetPassword;

    function forgotPassword() {
      try {
        logger.debug("forgotPassword function");

        if (!utilService.isAppOnlineService()) {
          utilService.toastMessage(sc.msgs.noConnMsg);
          return;
        }

        var promise = forgotPasswordService.forgotPassword(fpCtrl.fp);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;

            if (resp.status !== SUCCESS) {
              utilService.showAlert(resp);
              return;
            }
            fpCtrl.isMobileReg = true;
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function resetPassword() {
      try {
        logger.debug("resetPassword function");

        if (!utilService.isAppOnlineService()) {
          utilService.toastMessage(sc.msgs.noConnMsg);
          return;
        }

        req.data = fpCtrl.rp;
        var promise = forgotPasswordService.resetPassword(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== SUCCESS) {
              utilService.showAlert(resp);
              return;
            }
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});

      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    logger.debug("ForgotPasswordCtrl end");
  }
})();
