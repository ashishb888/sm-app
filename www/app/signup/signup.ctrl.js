(function() {
  angular.module('starter').controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject = ['$state', 'starterConfig', 'utilService', 'signupService'];
  function SignupCtrl($state, sConfig, utilService, signupService) {
    // Variables section
    var logger = utilService.getLogger();

    logger.debug("SignupCtrl start");

    // Variables section
    var sc = this;

    sc.sf = {};
    sc.genderArr = ["Male", "Female"];
    sc.sf.gender = sc.genderArr[0];

    // Functions section
    sc.signup = signup;

    function signup() {
      try {
        logger.debug("signup function");

        if (!utilService.isAppOnlineService()) {
            utilService.appAlert(sc.msgs.noConnMsg);
            return;
        }

        if (sc.sf.password !== sc.sf.rePassword) {
          utilService.toastMessage("Password mismatches");
          return;
        }
        var req = {};
        req.data = sc.sf;

        var promise = signupService.signup(req);
        promise.then(function(sucResp){
            try {
                var resp = sucResp.data;
                if (resp.status !== sConfig.httpStatus.SUCCESS) {
                    utilService.appAlert(resp.messages);
                    return;
                }

                utilService.toastMessage(resp.messages, sConfig.appStates.signin, sConfig.msgs.success);
                $state.go(sConfig.appStates.signin);
                //utilService.appAlert(resp.messages, sConfig.appStates.signin, sConfig.msgs.success);
            } catch (exception) {
                logger.error("exception: " + exception);
            }
        }, function(errResp){
        });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    logger.debug("SignupCtrl end");
  }
})();
