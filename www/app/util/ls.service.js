(function() {
  angular.module('starter').factory('lsService', lsService);
  lsService.$inject = ['starterConfig', 'utilService'];

  function lsService(sc, utilService) {
    // Variables section
    var lss = this;
    var logger = utilService.getLogger();

    // Declare services here
    lss.set = set;
    lss.get = get;

    function get(key) {
      logger.debug("get service");
      return localStorage.getItem(key);
    }

    function set(key, value) {
      logger.debug("set service");
      return localStorage.setItem(key, value);
    }

    return lss;
  }
})();
