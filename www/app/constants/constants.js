angular.module('starter').constant('starterConfig', (function() {
  console.debug("env: " + env);
  var ws;
  var httpReq = {
    timeout: 60000,
    config: {
      timeout: 60000,
      headers: {
        'Content-Type': 'applcation/json'
      }
    }
  };
  var msgs = {
    globalCommonError: "Oops. Something went wrong. Please try again later.",
    noConnMsg: "Unable to reach server. Please check your internet connection and try again.",
    error: "Error",
    success: "Success"
  };
  var httpStatus = {
    ERROR: "ERROR",
    SUCCESS: "SUCCESS"
  };
  var hfStates = {
    address: "address",
    placeorder: "menu.placeorder",
    signin: "signin",
    profiles: "menu.profiles"
  };
  var screenTitles = {
    signin: "Sign in",
    signup: "Sign up",
  };
  var httpKeys = {
    req: "req",
    resp: "resp",
    respErr: "respErr"
  };
  var modal = {
    animation: "slide-in-up"
  };
  var pullRefresher = {
    text: "Pull to refresh..."
  };

  var dbConfig = {
    dbName: "ashtest",
    dbVersion: "1.0",
    dbDescription: "Test database",
    dbSize: -1,
    tables: [{
      name: 'documents',
      columns: [{
        name: 'id',
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

  var operatorStatus = {
      avail: "AVAIL",
      unavail: "UNAVAIL"
  };

  var picSrc = {
    camera: "camera",
    galary: "galary"
  };
  var picType = {
    own: "own",
    home: "home",
    dp: "dp"
  };
  var dataOf = {
    pinfo: "pinfo",
    address: "address",
    pown: "pown",
    phome: "phome",
    family: "family",
    occupation: "occupation"
  };

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
    hfStates: hfStates,
    httpKeys: httpKeys,
    httpStatus: httpStatus,
    screenTitles: screenTitles,
    httpReq: httpReq,
    modal: modal,
    pullRefresher: pullRefresher,
    dbConfig: dbConfig,
    operatorStatus: operatorStatus,
    picSrc: picSrc,
    picType: picType,
    dataOf: dataOf
  };

})());
