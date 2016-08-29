// Server values would be prod for production, dev for dev, uat for uat and local for localhost server.
var env = "local";
var envLs = {
  prod: "prod",
  uat: "uat",
  dev: "dev",
  local: "local"
};

/* Global URLs for all environments */
var urls = {
  prod: "",
  uat: "",
  dev: "",
  local: "/api",
  /*local: "http://10.1.1.86:3000",*/
  /*local: "http://ec2-52-41-241-164.us-west-2.compute.amazonaws.com/marryme",*/
  tcUrl: "",
  prodStaticResUrl: "",
  devStaticResUrl: "",
  uatStaticResUrl: ""
};

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ngMessages', 'angular-md5',
  'satellizer', 'ion-gallery'
])

.run(function($ionicPlatform, $rootScope, $ionicLoading, utilService, lsService,
  $state, dbService, eventsService, httpCallsService, hwBackBtnService) {
  $ionicPlatform.ready(function() {
    utilService.getLogger().debug("run starts");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      //StatusBar.backgroundColorByName("purple");
      StatusBar.backgroundColorByHexString("#886aea");
    }

    // Init database
    //dbService.initDB()

    hwBackBtnService.tapToExit();
  });

  $rootScope.$on('initApp', function(event) {
    try {
      utilService.getLogger().debug("initApp function");

      var promise = httpCallsService.initApp();
    } catch (exception) {
      utilService.getLogger().error("exception: " + exception);
    }
  });

  eventsService.startEvents();

  /* Logs every request. */
  $rootScope.$on('logReqResp', function(event, data, key) {
    utilService.logReqResp(data, key);
  });

  // Handle HTTP erros
  $rootScope.$on('errorHandler', function(event, respErr) {
    utilService.errorHandler(respErr);
  });

  /* Shows ionicLoading */
  $rootScope.$on('loadingShow', function() {
    utilService.getLogger().debug("loadingShow");
    $ionicLoading.show({
      template: '<ion-spinner icon="lines"></ion-spinner>'
        /*template: 'Loading...'*/
    });
  });

  /* Hides ionicLoading */
  $rootScope.$on('loadingHide', function() {
    utilService.getLogger().debug("loadingHide");
    $ionicLoading.hide();
  });

  /*$rootScope.$on('$stateChangeStart', function (event, toState) {
      utilService.getLogger().debug("inside root scope");
      var jwtToken = JSON.parse(localStorage.getItem("jwtToken"));

      if (jwtToken) {
          $rootScope.authenticated = true;

          $rootScope.jwtToken = jwtToken;

        if (toState.name === "intro") {
              event.preventDefault();
              $state.go('');
          }
      }
  });*/


  /*$rootScope.$on('$stateChangeStart', function(event, toState) {
    utilService.getLogger().debug("stateChangeStart function");

    if (!utilService.isAppOnlineService()) {
        event.preventDefault();
        utilService.noNetwork();
    }
  });*/
  utilService.getLogger().debug("run ends");
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,
  $httpProvider, $logProvider, $sceDelegateProvider, $authProvider) {
  console.debug("config() start");
  console.debug("env: " + env);
  var urlWhiteListSuffix = "/**";
  var urlWhiteList = ["self"];

  /* Depending upon env it Enables/disables debug statements */
  switch (env) {
    case envLs.prod:
      $logProvider.debugEnabled(false);
      break;
    case envLs.uat:
      $logProvider.debugEnabled(false);
      break;
    case envLs.dev:
      $logProvider.debugEnabled(true);
      break;
    case envLs.local:
      $logProvider.debugEnabled(true);
      break;
    default:
      $logProvider.debugEnabled(false);
  }

  /* Depending upon env it sets backend URLs */
  switch (env) {
    case envLs.prod:
      urlWhiteList.push(urls.prod + urlWhiteListSuffix);
      break;
    case envLs.uat:
      urlWhiteList.push(urls.uat + urlWhiteListSuffix);
      break;
    case envLs.dev:
      urlWhiteList.push(urls.dev + urlWhiteListSuffix);
      break;
    case envLs.local:
      urlWhiteList.push(urls.local + urlWhiteListSuffix);
      break;
    default:
      urlWhiteList.push(urls.prod + urlWhiteListSuffix);
  }

  /* Depending upon env it sets backend URLs */
  switch (env) {
    case envLs.prod:
      $authProvider.loginUrl = urls.prod + "/signin";
      $authProvider.signupUrl = urls.prod + "/users";
      urlWhiteList.push(urls.prod + urlWhiteListSuffix);
      break;
    case envLs.uat:
      $authProvider.loginUrl = urls.uat + "/signin";
      $authProvider.signupUrl = urls.uat + "/users";
      urlWhiteList.push(urls.uat + urlWhiteListSuffix);
      break;
    case envLs.dev:
      $authProvider.loginUrl = urls.dev + "/signin";
      $authProvider.signupUrl = urls.dev + "/users";
      urlWhiteList.push(urls.dev + urlWhiteListSuffix);
      break;
    case envLs.local:
      $authProvider.loginUrl = urls.local + "/signin";
      $authProvider.signupUrl = urls.local + "/users";
      urlWhiteList.push(urls.local + urlWhiteListSuffix);
      break;
    default:
      $authProvider.loginUrl = urls.prod + "/signin";
      $authProvider.signupUrl = urls.prod + "/users";
      urlWhiteList.push(urls.prod + urlWhiteListSuffix);
  }

  // Satellizer configuration that specifies which API
  // route the JWT should be retrieved from
  $authProvider.tokenRoot = "resp";
  $authProvider.signupRedirect = null;

  /* Whitelists URLs */
  $sceDelegateProvider.resourceUrlWhitelist(urlWhiteList);

  // Common headers
  // $httpProvider.defaults.headers.common.'Content-Type' = 'application/json;charset=UTF-8';

  /* Interceptors pool */
  $httpProvider.interceptors.push(
    loadingInterceptor,
    /*loggerInterceptor,*/
    errorHandlerInterceptor
  );

  function checkNetwork($rootScope, $q) {
    return {
      request(req) {
        if (req !== undefined || req !== null) {
          if (urlCheck(req.url)) {
            $rootScope.$broadcast("checkNetwork");
          }
        }
        return req;
      }
    };
  }

  function errorHandlerInterceptor($rootScope, $q) {
    return {
      request(req) {
        return req;
      },
      response(resp) {
        return resp;
      },
      responseError(respErr) {
        if (respErr.config !== undefined || respErr.config !== null) {
          /*if (respErr.config.url.endsWith("/login")) {
            return $q.reject(respErr);
          }*/

          if (urlCheck(respErr.config.url)) {
            $rootScope.$broadcast('errorHandler', respErr);
          }
        }
        return $q.reject(respErr);
      }
    };
  }

  /* Loads/hides ionicLoading for every request */
  function loadingInterceptor($rootScope, $q) {
    return {
      request(req) {
        if (req !== undefined || req !== null) {
          if (urlCheck(req.url)) {
            $rootScope.$broadcast("loadingShow");
          }
        }
        return req;
      },
      response(resp) {
        if (resp.config !== undefined || resp.config !== null) {
          if (urlCheck(resp.config.url)) {
            $rootScope.$broadcast("loadingHide");
          }
        }
        return resp;
      },
      responseError(respErr) {
        if (respErr.config !== undefined || respErr.config !== null) {
          if (urlCheck(respErr.config.url)) {
            $rootScope.$broadcast("loadingHide");
          }
        }
        return $q.reject(respErr);
      }
    };
  }

  /* Logs every request's req & resp */
  function loggerInterceptor($rootScope, $q) {
    return {
      request(req) {
        if (req !== undefined || req !== null) {
          if (req.url.includes("images"))
            return req;
          if (urlCheck(req.url)) {
            $rootScope.$broadcast("logReqResp", req.data, "req");
          }
        }
        return req;
      },
      response(resp) {
        if (resp.config !== undefined || resp.config !== null) {
          if (resp.config.url.includes("images"))
            return resp;
          if (urlCheck(resp.config.url)) {
            $rootScope.$broadcast("logReqResp", resp.data, "resp");
          }
        }
        return resp;
      },
      responseError(respErr) {
        if (respErr.config !== undefined || respErr.config !== null) {
          if (urlCheck(respErr.config.url)) {
            $rootScope.$broadcast("logReqResp", respErr, "respErr");
          }
        }
        return $q.reject(respErr);
      }
    };
  }

  /* Checks if URL start with HTTP or HTTPS */
  function urlCheck(url) {
    url = url.toLowerCase();

    if (url.startsWith("http:") || url.startsWith("https:") || url.startsWith(
        "/api")) {
      return true;
    }
    return false;
  }

  // To disable caching of views
  $ionicConfigProvider.views.maxCache(0);

  $stateProvider
    .state("signin", {
      url: "/signin",
      templateUrl: "app/signin/signin.html",
      controller: "SigninCtrl as signinCtrl"
    })
    .state("signup", {
      url: "/signup",
      templateUrl: "app/signup/signup.html",
      controller: "SignupCtrl as sc"
    })
    .state("forgotpassword", {
      url: "/forgotpassword",
      templateUrl: "app/forgotpassword/forgotpassword.html",
      controller: "ForgotPasswordCtrl as fpCtrl"
    })
    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'app/menu/menu.html',
      controller: 'MenuCtrl as mc'
    })
    .state('menu.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'app/help/help.html'
        }
      }
    })
    .state('menu.tc', {
      url: '/tc',
      views: {
        'menuContent': {
          templateUrl: 'app/tc/tc.html'
        }
      }
    })
    .state('menu.profiles', {
      params: {
        'functionNm': 'getPaginateProfiles'
      },
      url: '/profiles',
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/profiles.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    })
    .state('menu.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'app/settings/settings.html',
          controller: 'SettingsCtrl as sc'
        }
      }
    })
    .state('menu.images', {
      params: {
        'functionNm': 'getOwnImgs'
      },
      url: '/images',
      views: {
        'menuContent': {
          templateUrl: 'app/images/images.html',
          controller: 'ImagesCtrl as ic'
        }
      }
    })
    .state('menu.profilesp', {
      params: {
        'functionNm': 'setProfilesP'
      },
      url: '/profilesp',
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/profilesp.html',
          controller: 'ProfilesPCtrl as ppc'
        }
      }
    })
    .state('menu.slprofiles', {
      params: {
        'functionNm': 'getShortlist'
      },
      url: '/slprofiles',
      views: {
        'menuContent': {
          templateUrl: 'app/slprofiles/shortlisted-profiles.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    })
    .state('menu.requests', {
      params: {
        'functionNm': 'getRequestsOut'
      },
      url: '/requests',
      views: {
        'menuContent': {
          templateUrl: 'app/requests/requests.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    })
    .state('menu.visitors', {
      params: {
        'functionNm': 'getVisitors'
      },
      url: '/visitors',
      views: {
        'menuContent': {
          templateUrl: 'app/visitors/visitors.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    })
    .state('menu.editprofile', {
      params: {
        'functionNm': 'viewProfile'
      },
      url: '/editprofile',
      views: {
        'menuContent': {
          templateUrl: 'app/editprofile/editprofile.html',
          controller: 'EditProfileCtrl as epc'
        }
      }
    })
    .state('welcome', {
      params: {
        'functionNm': 'wcFunction'
      },
      url: '/welcome',
      templateUrl: 'app/welcome/welcome.html',
      controller: 'WelcomeCtrl as wc'
    })
    .state('dp', {
      /*params: {
        'functionNm': 'dpFunction'
      },*/
      url: '/dp',
      templateUrl: 'app/editprofile/dp.html',
      controller: 'EditProfileCtrl as epc'
    })
    .state('menu.innerdp', {
      params: {
        'functionNm': 'getDP'
      },
      url: '/inneerdp',
      views: {
        'menuContent': {
          templateUrl: 'app/editprofile/inner-dp.html',
          controller: 'EditProfileCtrl as epc'
        }
      }
    })
    .state('otp', {
      url: '/otp',
      templateUrl: 'app/otp/otp.html'
    })
    .state('filteredprofiles', {
      url: '/filteredprofiles',
      templateUrl: 'app/profiles/filtered-profiles.html',
      controller: 'ProfilesCtrl as pc'
    })
    .state('retry', {
      params: {
        'state': "menu.profiles"
      },
      url: '/retry',
      templateUrl: 'app/retry/retry.html',
      controller: 'RetryCtrl as rc'
    })
    .state('menu.inbox', {
      params: {
        'functionNm': 'inbox'
      },
      url: '/inbox',
      views: {
        'menuContent': {
          templateUrl: 'app/inbox/inbox.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    })
    .state('menu.outbox', {
      params: {
        'functionNm': 'outbox'
      },
      url: '/outbox',
      views: {
        'menuContent': {
          templateUrl: 'app/outbox/outbox.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    });

  $urlRouterProvider.otherwise('/signin');
  console.debug("config() end");
});
