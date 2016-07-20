(function() {
  angular.module('starter').controller('SigninCtrl', SigninCtrl);

  SigninCtrl.$inject = ['starterConfig', 'utilService', '$state', '$scope', 'signinService', 'lsService', '$stateParams', 'addressService'];

  function SigninCtrl(sc, utilService, $state, $scope, signinService, lsService, $stateParams, addressService) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("SigninCtrl start");

    var signinCtrl = this;
    signinCtrl.isAddressPresent = false;
    var functionNm = $stateParams.functionNm;

    // Functions section
    signinCtrl.signin = signin;
    //var deploy = new Ionic.Deploy();
    var setView = setView;
    var bootstrap = bootstrap;

    // Update app code with new release from Ionic Deploy
    /*$scope.doUpdate = function() {
      deploy.update().then(function(res) {
        console.log('Ionic Deploy: Update Success! ', res);
      }, function(err) {
        console.log('Ionic Deploy: Update error! ', err);
      }, function(prog) {
        console.log('Ionic Deploy: Progress... ', prog);
      });
    };*/

    // Check Ionic Deploy for new code
    /*$scope.checkForUpdates = function() {
      console.log('Ionic Deploy: Checking for updates');
      deploy.check().then(function(hasUpdate) {
        console.log('Ionic Deploy: Update available: ' + hasUpdate);
        $scope.hasUpdate = hasUpdate;
      }, function(err) {
        console.error('Ionic Deploy: Unable to check for updates', err);
      });
    }*/

    function signin() {
      logger.debug("signin starts");

      if (!utilService.isAppOnlineService()) {
        utilService.appAlert(sc.msgs.noConnMsg);
        return;
      }

      var req = {};
      req.data = signinCtrl.sf;

      /*var promise = Ionic.Auth.login('basic', {
        'remember': true
      }, req);
      promise.then(function(sucResp) {
        try {
          logger.debug("success");
          var resp = sucResp.data;

          if (resp.status !== SUCCESS) {
            utilService.showAlert(resp);
            return;
          }
        } catch (exception) {
          logger.error("exception: " + exception);
        }
      }, function(errResp) {});*/
      var promise = signinService.signin(req);
      promise.then(function(sucResp) {
          try {
            logger.debug("success");
            var resp = sucResp.data;

            if (resp.status !== sc.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            lsService.set("isSignedIn", true);
            lsService.set("custId", resp.data.cust_id);

            if (lsService.get("isAddressPresent") == "true") {
              $state.go(sc.hfStates.placeorder);
              return;
            } else {
              addressService.getAddress(lsService.get("custId"))
                .then(function(sucResp1) {
                  var resp1 = sucResp1.data;
                  if (resp1.status !== sc.httpStatus.SUCCESS) {
                    utilService.appAlert(resp1.messages);
                    return;
                  }

                  if (resp1.data.isAddressPresent == true) {
                    lsService.set("isAddressPresent", true);
                    $state.go(sc.hfStates.placeorder);
                    return;
                  }
                  $state.go(sc.hfStates.address);
                }, function(errResp1) {});
            }
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
        /*.then(function(resp) {
          if (lsService.get("isAddressPresent") == "true") {
            $state.go(sc.hfStates.placeorder);
            return;
          } else {
            addressService.getAddress(lsService.get("custId"))
              .then(function(sucResp1) {
                var resp1 = sucResp1.data;
                if (resp1.status !== sc.httpStatus.SUCCESS) {
                  utilService.appAlert(resp1.messages);
                  return;
                }

                if (resp1.data.isAddressPresent == true) {
                  lsService.set("isAddressPresent", true);
                  $state.go(sc.hfStates.placeorder);
                  return;
                }
                $state.go(sc.hfStates.address);
              }, function(errResp1) {});
          }
        });*/

      /*if (signinCtrl.isAddressPresent) {
        $state.go(sc.hfStates.placeorder);
      }else{
        $state.go(sc.hfStates.address);
      }*/

      logger.debug("signin ends");
    }

    /**/
    function setView() {
      var isSignedIn = JSON.parse(lsService.get("isSignedIn"));
      if (isSignedIn) {
        if (lsService.get("isAddressPresent") == "true") {
          $state.go(sc.hfStates.placeorder);
          return;
        }
        $state.go(sc.hfStates.address);
      }
    }

    /* Executes function according function name */
    function bootstrap() {
      logger.debug("bootstrap() start");
      switch (functionNm) {
        case "setView":
          setView();
          break;
        default:
          setView();
      }
    }

    bootstrap();
    logger.debug("SigninCtrl end");
  }
})();
