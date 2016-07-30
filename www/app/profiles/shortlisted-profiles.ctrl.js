(function() {
  angular.module('starter').controller('SProfilesCtrl', SProfilesCtrl);

  SProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', 'lsService', '$scope', '$stateParams', 'profileService'];

  function SProfilesCtrl(sConfig, utilService, $state, lsService, $scope, $stateParams, profileService) {
    var logger = utilService.getLogger();
    logger.debug("SProfilesCtrl start");

    // Variables section
    var pfc = this;



    // Function section
    var bootstrap = bootstrap;


    function bootstrap() {
      try {
        logger.debug("bootstrap function");

        // Add switch block  here
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("SProfilesCtrl end");
  }
})();
