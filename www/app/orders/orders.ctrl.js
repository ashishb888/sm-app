(function() {
  angular.module('starter').controller('OrdersCtrl', OrdersCtrl);

  OrdersCtrl.$inject = ['starterConfig', 'utilService', '$scope', 'ordersService'];

  function OrdersCtrl(sc, utilService, $scope, ordersService) {
    // Variables section
    var ordersCtrl = this;
    var logger = utilService.getLogger();
    logger.debug("OrdersCtrl starts");
    ordersCtrl.po = {};
    ordersCtrl.orderTypes = ["Lunch", "Dinner"];
    ordersCtrl.rotiArr = ["Chapati", "Bhakari"];
    ordersCtrl.po.roti = ordersCtrl.rotiArr[0];
    ordersCtrl.bhajiArr = ["A", "B"];
    ordersCtrl.po.bhaji = ordersCtrl.bhajiArr[0];
    ordersCtrl.po.order;
    var dinnerHoursArr = [10, 15];
    var lunchHoursArr = [17, 20];
    //var lunchHoursArr = [22, 23];
    ordersCtrl.orderDate = null;
    var dateSepeator = "-";

    // Functions section
    ordersCtrl.setOrder = setOrder;
    ordersCtrl.placeOrder = placeOrder;
    ordersCtrl.orders = orders;

    function setOrder() {
      try {
        logger.debug("setOrder function");
        var date = new Date();
        var time = date.getHours();

        if (time >= dinnerHoursArr[0] && time <= dinnerHoursArr[1]) {
          ordersCtrl.po.order = ordersCtrl.orderTypes[1];
          ordersCtrl.orderDate = "Dinner order for " + date.getDate() + dateSepeator + date.getMonth() + dateSepeator + date.getFullYear();
        }
        if (time >= lunchHoursArr[0] && time <= lunchHoursArr[1]) {
          date.setDate(date.getDate() + 1);
          ordersCtrl.po.order = ordersCtrl.orderTypes[0];
          ordersCtrl.orderDate = "Lunch order for " + date.getDate() + dateSepeator + date.getMonth() + dateSepeator + date.getFullYear();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    ordersCtrl.setOrder();

    function placeOrder() {
      try {
        logger.debug("placeOrder starts");

        if (!utilService.isAppOnlineService()) {
          utilService.retryService(screenTitle, screenState);
          return;
        }

        logger.debug("ordersCtrl.pc: " + JSON.stringify(ordersCtrl.po));
        var promise = ordersService.placeOrder(ordersCtrl.po);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;

            if (resp.status !== SUCCESS) {
              utilService.showAlert(resp);
              return;
            }
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function orders() {
      try {
        logger.debug("orders function");
        var promise = ordersService.orders();
        promise.then(function(sucResp) {
          var resp = sucResp.data;
          if (resp.status !== sc.httpStatus.SUCCESS) {
            utilService.appAlert(resp.messages);
            return;
          }

        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    logger.debug("OrdersCtrl ends");
  }
})();
