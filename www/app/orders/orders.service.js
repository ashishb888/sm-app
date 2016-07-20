(function() {
  angular.module('starter').factory('ordersService', ordersService);
  ordersService.$inject = ['$http', 'utilService', 'starterConfig'];

  function ordersService($http, utilService, sc) {
    var logger = utilService.getLogger();
    var os = this;

    os.placeOrder = placeOrder;
    os.orders = orders;

    function placeOrder(req) {
      logger.debug("placeOrder() service");
      return $http.post(sc.ws + '/placeorder', req, sc.httpReq.config);
    }

    function orders() {
      logger.debug("orders() service");
      return $http.get(sc.ws + '/orders', sc.httpReq.config);
    }

    return os;
  }
})();
