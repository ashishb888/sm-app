angular.module('starter').constant('starterConfig', (function() {
  console.debug("env: " + env);

  var ws;
  var httpReq = {
    timeout: 60000,
    config: {
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  };
  var msgs = {
    globalCommonError: "Oops. Something went wrong. Please try again later.",
    noConnMsg: "Unable to reach server. Please check your internet connection and try again.",
    connMsg: "Connected to internet",
    error: "Error",
    success: "Success"
  };
  var httpStatus = {
    ERROR: "ERROR",
    SUCCESS: "SUCCESS"
  };
  var appStates = {
    signin: "signin",
    signup: "signup",
    forgotpassword: "forgotpassword",
    menu: "menu",
    menu_account: "menu.account",
    menu_help: "menu.help",
    menu_tc: "menu.tc",
    menu_profiles: "menu.profiles",
    menu_settings: "menu.settings",
    menu_profile: "menu.profile",
    menu_images: "menu.images",
    menu_pprofiles: "menu.pprofiles",
    menu_eprofile: "menu.eprofile",
    menu_emyprofile: "menu.emyprofile",
    menu_profilesp: "menu.profilesp",
    menu_slprofiles: "menu.slprofiles",
    menu_pinfo: "menu.pinfo",
    welcome: "welcome",
    dp: "dp",
    retry: "retry"
  };
  var screenTitles = {
    signin: "Sign in",
    signup: "Sign up",
    profile: "Profile"
  };
  var httpKeys = {
    req: "req",
    resp: "resp",
    respErr: "respErr"
  };
  var modal = {
    animation: "slide-in-up"
  };
  var offlineStates = [appStates.signin, appStates.signup, appStates.forgotpassword];

  var dbConfig = {
    dbName: "appdb",
    dbVersion: "1.0",
    dbDescription: "App database",
    dbSize: -1,
    tables: [{
      name: 'images',
      columns: [{
        name: '_id',
        type: 'text'
      }, {
        name: 'title',
        type: 'text'
      }]
    }, {
      name: 'test',
      columns: [{
        name: 'id',
        type: 'text'
      }, {
        name: 'name',
        type: 'text'
      }]
    }, {
      name: 'user',
      columns: [{
        name: 'fullname',
        type: 'text'
      }, {
        name: 'username',
        type: 'text'
      }, {
        name: 'password',
        type: 'text'
      }]
    }]
  };

  // Photos properties
  var picSrc = {
    camera: "camera",
    galary: "galary"
  };
  var picType = {
    own: "own",
    home: "home",
    dp: "dp",
    pp: "pp"
  };
  var picProps = {
    quality: 50,
    width: 400,
    height: 400
  };
  var dataOf = {
    pinfo: "pinfo",
    address: "address",
    pown: "pown",
    phome: "phome",
    family: "family",
    occupation: "occupation"
  };
  var toastMsgs = {
    appExit: "Press BACK again to exit."
  };
  var imgsURIs = {
    noImg: "img/no-avatar.png"
  }
  switch (env) {
    case envLs.prod:
      ws = urls.prod;
      break;
    case envLs.uat:
      ws = urls.uat;
      break;
    case envLs.dev:
      ws = urls.dev;
      break;
    case envLs.local:
      ws = urls.local;
      break;
    default:
      ws = urls.prod;
  }

  return {
    ws: ws,
    msgs: msgs,
    appStates: appStates,
    httpKeys: httpKeys,
    httpStatus: httpStatus,
    screenTitles: screenTitles,
    httpReq: httpReq,
    modal: modal,
    dbConfig: dbConfig,
    picSrc: picSrc,
    picType: picType,
    picProps: picProps,
    dataOf: dataOf,
    toastMsgs: toastMsgs,
    imgsURIs: imgsURIs,
    offlineStates: offlineStates
  };

})());
