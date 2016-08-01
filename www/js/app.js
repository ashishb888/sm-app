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
angular.module('starter', ['ionic', 'ngCordova', 'ngMessages', 'angular-md5'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, utilService, lsService, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  /* Logs every request. */
  $rootScope.$on('logReqResp', function(event, data, key) {
    utilService.logReqResp(data, key);
  });

  $rootScope.$on('errorHandler', function(event, respErr) {
    utilService.errorHandler(respErr);
  });

  /* Shows ionicLoading */
  $rootScope.$on('loadingShow', function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="lines"></ion-spinner>',
    });
  });

  /* Hides ionicLoading */
  $rootScope.$on('loadingHide', function() {
    $ionicLoading.hide();
  });

  /*$rootScope.$on('$stateChangeStart', function(event, toState) {
    utilService.getLogger().debug("stateChangeStart function");

    var isSignedIn = JSON.parse(lsService.get("isSignedIn"));

    if (isSignedIn) {
      if (toState.name == "signin") {
        event.preventDefault();
        $state.go("menu.placeorder");
      }
    }
  });*/
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $logProvider, $sceDelegateProvider) {
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

  /* Whitelists URLs */
  $sceDelegateProvider.resourceUrlWhitelist(urlWhiteList);

  /* Interceptors pool */
  $httpProvider.interceptors.push(
    loadingInterceptor,
    loggerInterceptor,
    errorHandlerInterceptor
  );

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
          if (respErr.config.url.endsWith("/login")) {
            return $q.reject(respErr);
          }

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
          if (urlCheck(req.url)) {
            $rootScope.$broadcast("logReqResp", req.data, "req");
          }
        }
        return req;
      },
      response(resp) {
        if (resp.config !== undefined || resp.config !== null) {
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
    if (url.startsWith("http:") || url.startsWith("https:") || url.startsWith("/api")) {
      return true;
    }
    return false;
  }

  // To disable caching of views
  $ionicConfigProvider.views.maxCache(0);

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "app/home/home.html",
      controller: "HomeCtrl as homeCtrl"
    })
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
    .state('menu.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'app/account/account.html'
        }
      }
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
      url: '/profiles',
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/profiles.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    })
    .state('menu.profilesv1', {
      url: '/profilesv1',
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/profiles-v1.html',
          controller: 'ProfilesCtrlv1 as pc'
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
    .state('menu.profile', {
      url: '/profile',
      params: {'functionNm': 'viewProfile', 'userId': null},
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/profile.html',
          controller: 'ProfileCtrl as pc'
        }
      }
    })
    .state('menu.profile1', {
      url: '/profile1',
      views: {
        'menuContent': {
          templateUrl: 'app/profile/profile.html',
          controller: 'ProfileCtrl as pc'
        }
      }
    })
    .state('menu.images', {
      url: '/images',
      views: {
        'menuContent': {
          templateUrl: 'app/images/images.html',
          controller: 'ImagesCtrl as ic'
        }
      }
    })
    .state('menu.pprofiles', {
      url: '/pprofiles',
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/pprofiles.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    })
    .state('menu.eprofile', {
      params: {'functionNm': 'setEProfile'},
      url: '/eprofile',
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/eprofile.html',
          controller: 'ProfilesCtrl as pc'
        }
      }
    })
    .state('menu.emyprofile', {
      url: '/emyprofile',
      views: {
        'menuContent': {
          templateUrl: 'app/emyprofile/emyprofile.html',
          controller: 'EMyProfileCtrl as emp'
        }
      }
    })
    .state('menu.profilesp', {
      params: {'functionNm': 'setProfilesP'},
      url: '/profilesp',
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/profilesp.html',
          controller: 'ProfilesPCtrl as ppc'
        }
      }
    })
    .state('menu.family', {
      url: '/family',
      views: {
        'menuContent': {
          templateUrl: 'app/family/family.html',
          controller: 'FamilyCtrl as fc'
        }
      }
    })
    .state('menu.location', {
      url: '/location',
      views: {
        'menuContent': {
          templateUrl: 'app/location/location.html',
          controller: 'LocationCtrl as lc'
        }
      }
    })
    .state('menu.pinfo', {
      url: '/pinfo',
      views: {
        'menuContent': {
          templateUrl: 'app/pinfo/pinfo.html',
          controller: 'PInfoCtrl as pic'
        }
      }
    })
    .state('menu.profession', {
      url: '/profession',
      views: {
        'menuContent': {
          templateUrl: 'app/profession/profession.html',
          controller: 'ProfessionCtrl as pfc'
        }
      }
    })
    .state('menu.slprofiles', {
      url: '/slprofiles',
      views: {
        'menuContent': {
          templateUrl: 'app/profiles/shortlisted-profiles.html',
          controller: 'SProfilesCtrl as spc'
        }
      }
    });

  $urlRouterProvider.otherwise('/signin');
  console.debug("config() end");
});
