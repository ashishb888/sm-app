(function() {
  angular.module('starter').factory('utilService', utilService);
  utilService.$inject = ['$ionicPopup', 'starterConfig', '$http', '$state', '$log', '$q', '$cordovaNetwork'];

  function utilService($ionicPopup, sc, $http, $state, $log, $q, $cordovaNetwork) {
    // Variables section
    var us = this;
    var logger = $log;

    // Declare services here
    us.appAlert = appAlert;
    us.reloadScreen = reloadScreen;
    us.retryService = retryService;
    us.isAppOnlineService = isAppOnlineService;
    us.getLogger = getLogger;
    us.errorHandler = errorHandler;
    us.logReqResp = logReqResp;
    us.initSQLite = initSQLite;
    us.initDB = initDB;
    us.executeQuery = executeQuery;
    us.selectQuery = selectQuery;
    us.insertQuery = insertQuery;

    /* Logs every request's data */
    function logReqResp(data, key) {
      switch (key) {
        case sc.httpKeys.req:
          logger.debug(sc.httpKeys.req + ": " + JSON.stringify(data));
          break;
        case sc.httpKeys.resp:
          logger.debug(sc.httpKeys.resp + ": " + JSON.stringify(data));
          break;
        case sc.httpKeys.respErr:
          logger.debug(sc.httpKeys.respErr + ": " + JSON.stringify(data));
          break;
        default:
          logger.debug("loggerInterceptor: " + JSON.stringify(data));
      }
    }

    /* Shows error messages accourding HTTP error codes */
    function errorHandler(respErr) {
      logger.debug("errorHandler() service")
      switch (respErr.status) {
        case 400:
            appAlert(sc.msgs.globalCommonError);
          break;
        case 401:
          appAlert(sc.msgs.globalCommonError);
          break;
        case 500:
          appAlert(sc.msgs.globalCommonError);
          break;
        default:
            appAlert(sc.msgs.globalCommonError);
      }
    }

    // Returns logger
    function getLogger() {
      logger.debug("getLogger() service")
      return logger;
    }

    // Check whether connection is available or not
    function isAppOnlineService() {
      logger.debug("isAppOnlineService() service");
      var isAppOnline = true;

      try {
        document.addEventListener("deviceready", function() {
          isAppOnline = $cordovaNetwork.isOnline();
        }, false);
      } catch (exception) {
        logger.error("exception: " + exception);
        return isAppOnline;
      } finally {
        logger.debug("isAppOnline: " + isAppOnline);
      }

      return isAppOnline;
    }

    // Reload the current screen
    function reloadScreen() {
      $state.go($state.current, {}, {
        reload: true
      });
    }


    // Shows no connection screen
    function retryService(title, screen, navBarVal) {
      if (navBarVal != undefined || navBarVal != null) {
        $state.go('retry', {
          screenTitle: title,
          screenState: screen,
          navBar: navBarVal
        });
      } else {
        $state.go('retry', {
          screenTitle: title,
          screenState: screen
        });
      }
    }


    /* Shows ionic alertPopup, and on the click of button it redirects to the state
     passed as parameter. */
    function appAlert(msg, state, title) {
      var alertPopup = $ionicPopup.alert({
        title: (title == null || title == undefined) ? "Error" : title,
        template: msg
      });
      alertPopup.then(function(res) {
        if (state != undefined || state != null) {
          $state.go(state);
        }
      });
    }


    function initDB(dbName, dbVersion, dbDescription, dbSize) {
      logger.debug("initDB service");
      db = window.openDatabase(dbName, dbVersion, dbDescription, dbSize);
    }

    function executeQuery(query) {
      logger.debug("executeQuery service");
      logger.debug("query: " + query);
      db.transaction(function(transaction) {
        transaction.executeSql(query);
      });
    }

    function insertQuery(query, params) {
      logger.debug("executeQuery service");
      logger.debug("query: " + query);
      logger.debug("params: " + params);
      db.transaction(function(transaction) {
        transaction.executeSql(query, params);
      });
    }

    function selectQuery(query, params) {
      logger.debug("selectQuery service");
      logger.debug("query: " + query);

      if (params == null || params == undefined) {
        params = [];
      }

      db.transaction(function(transaction) {
        transaction.executeSql(query, params, function(transaction, results) {
          logger.debug("results: " + JSON.stringify(results.rows));
        }, null);
      });
    }

    function initSQLite() {
      angular.forEach(tables.tables, function(table) {
        var columns = [];

        angular.forEach(table.columns, function(column) {
          columns.push(column.name + ' ' + column.type);
        });

        /*var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
        query11(query);*/

        db.transaction(function(tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
          tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
          tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');

          tx.executeSql('SELECT * FROM LOGS', [], function(tx, results) {
            logger.log("Hi");
            var len = results.rows.length,
              i;
            logger.debug("results: " + JSON.stringify(results));
            for (i = 0; i < len; i++) {
              logger.debug(results.rows.item(i));
            }

          }, null);
        });

        db.transaction(function(tx) {
          tx.executeSql('SELECT * FROM LOGS', [], function(tx, results) {
            var len = results.rows.length,
              i;
            logger.debug("results: " + JSON.stringify(results));
            for (i = 0; i < len; i++) {
              logger.debug(results.rows.item(i));
            }

          }, null);
        });

        var a = "abc"
        db.transaction(function(t) {
          t.executeSql("INSERT INTO documents1 (id, title) VALUES (?, ?)", [a, a]);
        });

        /*  db.transaction(function(transaction) {
              transaction.executeSql(query, bindings, function(transaction, result) {
                  deferred.resolve(result);
              }, function(transaction, error) {
                  deferred.reject(error);
              });
          });
          query11(query);*/
        console.log('Table ' + table.name + ' initialized');
      });

    }

    return us;
  }
})();
