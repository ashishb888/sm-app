(function() {
  angular.module('starter').controller('WelcomeCtrl', WelcomeCtrl);

  WelcomeCtrl.$inject = ['$state', 'starterConfig', 'utilService', '$ionicHistory'];

  function WelcomeCtrl($state, sConfig, utilService, $ionicHistory) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("WelcomeCtrl start");

    var wc = this;

    // Functions section
    wc.goToDP = goToDP;

    // Functions definations
    function goToDP() {
      try {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        $state.go(sConfig.appStates.dp);
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    logger.debug("WelcomeCtrl end");
  }
})();
