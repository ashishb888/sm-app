(function() {
  angular.module('starter').controller('SigninCtrl', SigninCtrl);

  SigninCtrl.$inject = ['starterConfig', 'utilService', '$state', '$scope',
    'signinService', 'lsService', '$stateParams', 'hwBackBtnService',
    '$rootScope', '$auth', '$ionicHistory'
  ];

  function SigninCtrl(sConfig, utilService, $state, $scope, signinService,
    lsService, $stateParams, hwBackBtnService, $rootScope, $auth,
    $ionicHistory) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("SigninCtrl start");

    var signinCtrl = this;
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
      try {
        logger.debug("signin function");

        if (!utilService.isAppOnlineService()) {
          utilService.toastMessage(sConfig.msgs.noConnMsg);
          return;
        }

        var req = {};
        req.data = signinCtrl.sf;

        /*var promise = signinService.signin(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;

            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            lsService.set("isSignedIn", true);
            lsService.set("_id", resp.data._id);
            lsService.set("userId", resp.data.userId);
            lsService.set("location", JSON.stringify(resp.data.locationInfo));
            lsService.set("dob", resp.data.basicDetails.dob);
            lsService.set("height", JSON.stringify(resp.data.basicDetails.height));
            lsService.set("fullName", resp.data.basicDetails.fullName);
            lsService.set("gender", resp.data.basicDetails.gender);

            if (resp.data.isDP == true) {
              // $rootScope.rootDP = resp.data.dp;
              lsService.set("dp", resp.data.dp);
              $state.go(sConfig.appStates.menu_profiles);
              return;
            }

            $state.go(sConfig.appStates.welcome);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {}).finally(function() {
          // $rootScope.$broadcast("setBanner");
        });*/

        $rootScope.$broadcast("initApp");

        $auth.login(req).then(function(sucResp) {
          var resp = sucResp.data;

          if (resp.status !== sConfig.httpStatus.SUCCESS) {
            utilService.toastMessage(resp.messages);
            return;
          }

          lsService.set('jwtToken', JSON.stringify($auth.getPayload()));
          // lsService.set("isSignedIn", true);
          lsService.set("_id", resp.data._id);
          lsService.set("userId", resp.data.userId);
          lsService.set("userLocation", JSON.stringify(resp.data.locationInfo));
          lsService.set("dob", resp.data.basicDetails.dob);
          lsService.set("userHeight", JSON.stringify(resp.data.basicDetails.height));
          lsService.set("fullName", resp.data.basicDetails.fullName);
          lsService.set("userGender", resp.data.basicDetails.gender);

          if (resp.data.isDP !== true) {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });

            $state.go(sConfig.appStates.dp);
            return;
          }

          lsService.set("dp", resp.data.dp);
          $state.go(sConfig.appStates.menu_profiles);
        }).catch(function(errResp) {
        });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    /**/
    function setView() {
      try {
        logger.debug("setView() function");

        if (!utilService.isAppOnlineService()) {
          utilService.toastMessage(sConfig.msgs.noConnMsg);
          return;
        }

        $rootScope.$broadcast("setBanner");

        if (!lsService.get("satellizer_token"))
          return;

        var promise = signinService.getFlags();
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;

            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            /*if (resp.data.isDP !== true) {
              $ionicHistory.nextViewOptions({
                disableBack: true
              });

              $state.go(sConfig.appStates.dp);
              return;
            }*/

            $state.go(sConfig.appStates.menu_profiles);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
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
