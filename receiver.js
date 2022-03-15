/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module',
      });
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = '';
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__(
    (__webpack_require__.s = './server/receiver/index.ts')
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './server/receiver/index.ts':
      /*!**********************************!*\
  !*** ./server/receiver/index.ts ***!
  \**********************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CAFReceiver; });\nconst CAST_MESSAGE_NAMESPACE = 'urn:x-cast:com.bitmovin.player.caf';\nclass CAFReceiver {\n    constructor() {\n        this.onLoad = (loadRequestData) => {\n            const customData = loadRequestData.media\n                .customData;\n            if (customData === null || customData === void 0 ? void 0 : customData.options) {\n                this.setWithCredentials(customData.options);\n            }\n            if (customData === null || customData === void 0 ? void 0 : customData.drm) {\n                this.setDRM(customData.drm);\n            }\n            return loadRequestData;\n        };\n        this.onCustomMessage = (message) => {\n            console.log('Received custom channel message', message);\n        };\n        this.context = cast.framework.CastReceiverContext.getInstance();\n        this.player = this.context.getPlayerManager();\n    }\n    init() {\n        this.attachEvents();\n        this.context.start();\n    }\n    attachEvents() {\n        this.player.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, this.onLoad);\n        this.context.addCustomMessageListener(CAST_MESSAGE_NAMESPACE, this.onCustomMessage);\n    }\n    setDRM({ protectionSystem, licenseUrl, headers, withCredentials, }) {\n        this.context\n            .getPlayerManager()\n            .setMediaPlaybackInfoHandler((_loadRequest, playbackConfig) => {\n            playbackConfig.licenseUrl = licenseUrl;\n            playbackConfig.protectionSystem = protectionSystem;\n            if (typeof headers === 'object') {\n                playbackConfig.licenseRequestHandler = (requestInfo) => {\n                    requestInfo.headers = headers;\n                };\n            }\n            if (withCredentials) {\n                playbackConfig.licenseRequestHandler = setWithCredentialsFlag;\n            }\n            return playbackConfig;\n        });\n    }\n    setWithCredentials(options) {\n        const playerManager = this.context.getPlayerManager();\n        const playbackConfig = Object.assign(new cast.framework.PlaybackConfig(), playerManager.getPlaybackConfig());\n        if (options.withCredentials) {\n            playbackConfig.segmentRequestHandler = setWithCredentialsFlag;\n            playbackConfig.captionsRequestHandler = setWithCredentialsFlag;\n        }\n        if (options.manifestWithCredentials) {\n            playbackConfig.manifestRequestHandler = setWithCredentialsFlag;\n        }\n        playerManager.setPlaybackConfig(playbackConfig);\n    }\n}\nfunction setWithCredentialsFlag(requestInfo) {\n    requestInfo.withCredentials = true;\n}\nwindow.onload = () => {\n    console.log('loaded');\n    const CafReceiver = new CAFReceiver();\n    CafReceiver.init();\n};\n\n\n//# sourceURL=webpack:///./server/receiver/index.ts?"
        );

        /***/
      },

    /******/
  }
);
