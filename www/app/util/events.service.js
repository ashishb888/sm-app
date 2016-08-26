(function() {
  angular.module('starter').factory('eventsService', eventsService);
  eventsService.$inject = ['utilService', '$ionicPlatform', 'httpCallsService'];

  function eventsService(utilService, $ionicPlatform, httpCallsService) {
    // Variables section
    var es = this;
    var logger = utilService.getLogger();

    // Declare services here
    es.startEvents = startEvents;
    // Functions definations
    function startEvents() {
      try {
        logger.debug("startEvents service");

      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    $ionicPlatform.on("offline", function() {
      logger.debug("$ionicPlatform offline");
    });

    $ionicPlatform.on("online", function() {
      logger.debug("$ionicPlatform online");
    });

    $ionicPlatform.on("pause", function() {
      httpCallsService.updateLastActive();
      logger.debug("$ionicPlatform pause");
    });

    $ionicPlatform.on("resume", function() {
      logger.debug("$ionicPlatform resume");
    });

    $ionicPlatform.on("exit", function() {
      logger.debug("$ionicPlatform exit");
    });

    return es;
  }
})();
