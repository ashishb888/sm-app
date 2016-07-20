(function() {
  angular.module('starter').controller('MenuCtrl', MenuCtrl);

  MenuCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService'];

  function MenuCtrl(sc, utilService, $state, $ionicPopup, lsService) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("MenuCtrl start");

    var menuCtrl = this;

    // Functions section
    menuCtrl.signout = signout;

    function signout() {
      try {
        logger.debug("signout function");
        var confirmPopup = $ionicPopup.confirm({
          title: 'Sign out',
          template: 'Are you sure you want to signout?'
        });

        confirmPopup.then(function(res) {
          if (res) {
            logger.debug("Signed out");
            lsService.set("isSignedIn", false);
            lsService.set("isAddressPresent", false);
            $state.go(sc.hfStates.signin);
          }
        });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    logger.debug("MenuCtrl end");
  }
})();
