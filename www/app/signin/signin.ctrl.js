(function() {
  angular.module('starter').controller('SigninCtrl', SigninCtrl);

  SigninCtrl.$inject = ['starterConfig', 'utilService', '$state', '$scope', 'signinService', 'lsService', '$stateParams', 'hwBackBtnService', '$rootScope', '$auth'];

  function SigninCtrl(sc, utilService, $state, $scope, signinService, lsService, $stateParams, hwBackBtnService, $rootScope, $auth) {
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
      logger.debug("signin starts");

      if (!utilService.isAppOnlineService()) {
        utilService.appAlert(sc.msgs.noConnMsg);
        return;
      }

      var req = {};
      req.data = signinCtrl.sf;

      var promise = signinService.signin(req);
      promise.then(function(sucResp) {
        try {
          var resp = sucResp.data;

          if (resp.status !== sc.httpStatus.SUCCESS) {
            utilService.appAlert(resp.messages);
            return;
          }

          lsService.set("isSignedIn", true);
          lsService.set("_id", resp.data._id);
          lsService.set("userId", resp.data.userId);
          // $rootScope.userId = resp.data.userId;
          lsService.set("fullName", resp.data.basicDetails.fullName);

          if (resp.data.isDP == true) {
            // $rootScope.rootDP = resp.data.dp;
            lsService.set("dp", resp.data.dp);
            $state.go(sc.appStates.menu_profiles);
            return;
          }

          $state.go(sc.appStates.welcome);
        } catch (exception) {
          logger.error("exception: " + exception);
        }
      }, function(errResp) {}).finally(function() {
        // $rootScope.$broadcast("setBanner");
      });

      /*$auth.login(credentials).then(function() {
        // Return an $http request for the authenticated user
        $http.get('http://localhost:8000/api/authenticate/user').success(function(response) {
            // Stringify the retured data
            var user = JSON.stringify(response.user);

            // Set the stringified user data into local storage
            localStorage.setItem('user', user);

            // Getting current user data from local storage
            $rootScope.currentUser = response.user;
            // $rootScope.currentUser = localStorage.setItem('user');;

            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.jokes');
          })
          .error(function() {
            $scope.loginError = true;
            $scope.loginErrorText = error.data.error;
            console.log($scope.loginErrorText);
          })
      });*/

      logger.debug("signin ends");
    }

    /**/
    function setView() {
      $rootScope.$broadcast("setBanner");
      if (lsService.get("isSignedIn") != "true")
        return;

      /*if (lsService.get("isDP") != "true") {
        $state.go(sc.appStates.welcome);
        return;
      }*/

      $state.go(sc.appStates.menu_profiles);
    }

    /* Executes function according function name */
    function bootstrap() {
      logger.debug("bootstrap() start");

      hwBackBtnService.tapToExit();

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
