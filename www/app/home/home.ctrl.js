(function() {
  angular.module("starter").controller("HomeCtrl", HomeCtrl);
  HomeCtrl.$inject = ["$state", "starterConfig", "utilService", "$ionicModal", "$scope", "$stateParams", "$ionicBackdrop", "$ionicPopover", "dbService"];

  function HomeCtrl($state, starterConfig, utilService, $ionicModal, $scope, $stateParams, $ionicBackdrop, $ionicPopover, dbService) {
    var logger = utilService.getLogger();

    logger.debug("HomeCtrl start");

    var homeCtrl = this;


    logger.debug("HomeCtrl end");
  }
})();
