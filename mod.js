var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray2;
    exports2.fromByteArray = fromByteArray2;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray2(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray2(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// node_modules/fn-annotate/index.js
var require_fn_annotate = __commonJS({
  "node_modules/fn-annotate/index.js"(exports2, module2) {
    "use strict";
    module2.exports = annotate2;
    function annotate2(fn) {
      if (typeof fn !== "function") {
        throw new Error("Could not parse function signature for injection dependencies: Object is not a function");
      }
      if (!fn.length)
        return [];
      var injects = /^()\(?([^)=]*)\)? *=>/.exec(fn + "") || /^[^(]+([^ \(]*) *\(([^\)]*)\)/.exec(fn + "");
      if (!injects) {
        throw new Error("Could not parse function signature for injection dependencies: " + fn + "");
      }
      var argumentString = injects[2].replace(/\/\*[\S\s]*?\*\//g, " ").replace(/\/\/.*/g, " ");
      function groupSubArguments(_, type, keys) {
        return type + keys.split(",").map(function(arg) {
          return arg && arg.trim();
        }).filter(Boolean).join("@");
      }
      argumentString = argumentString.replace(/(\{)([^}]*)\}/g, groupSubArguments);
      argumentString = argumentString.replace(/(\[)([^}]*)\]/g, groupSubArguments);
      return argumentString.split(",").map(function(arg) {
        return arg && arg.trim();
      }).map(function(arg) {
        if (arg[0] === "{") {
          return arg.substring(1).split("@");
        }
        if (arg[0] === "[") {
          return { items: arg.substring(1).split("@") };
        }
        return arg;
      }).filter(Boolean);
    }
  }
});

// src/query/index.js
var query_exports = {};
__export(query_exports, {
  Abort: () => Abort,
  Abs: () => Abs,
  AccessProvider: () => AccessProvider,
  AccessProviders: () => AccessProviders,
  Acos: () => Acos,
  Add: () => Add,
  All: () => All,
  And: () => And,
  Any: () => Any,
  Append: () => Append,
  Asin: () => Asin,
  At: () => At,
  Atan: () => Atan,
  BitAnd: () => BitAnd,
  BitNot: () => BitNot,
  BitOr: () => BitOr,
  BitXor: () => BitXor,
  Bytes: () => Bytes2,
  Call: () => Call,
  Casefold: () => Casefold,
  Ceil: () => Ceil,
  Class: () => Class_default,
  Classes: () => Classes_default,
  Collection: () => Collection,
  Collections: () => Collections,
  Concat: () => Concat,
  Contains: () => Contains_default,
  ContainsField: () => ContainsField,
  ContainsPath: () => ContainsPath,
  ContainsStr: () => ContainsStr,
  ContainsStrRegex: () => ContainsStrRegex,
  ContainsValue: () => ContainsValue,
  Cos: () => Cos,
  Cosh: () => Cosh,
  Count: () => Count,
  Create: () => Create,
  CreateAccessProvider: () => CreateAccessProvider,
  CreateClass: () => CreateClass_default,
  CreateCollection: () => CreateCollection,
  CreateDatabase: () => CreateDatabase,
  CreateFunction: () => CreateFunction,
  CreateIndex: () => CreateIndex,
  CreateKey: () => CreateKey,
  CreateRole: () => CreateRole,
  Credentials: () => Credentials,
  CurrentIdentity: () => CurrentIdentity,
  CurrentToken: () => CurrentToken,
  Database: () => Database,
  Databases: () => Databases,
  Date: () => Date2,
  DayOfMonth: () => DayOfMonth,
  DayOfWeek: () => DayOfWeek,
  DayOfYear: () => DayOfYear,
  Degrees: () => Degrees,
  Delete: () => Delete,
  Difference: () => Difference,
  Distinct: () => Distinct,
  Divide: () => Divide,
  Do: () => Do,
  Documents: () => Documents,
  Drop: () => Drop,
  EndsWith: () => EndsWith,
  Epoch: () => Epoch,
  Equals: () => Equals,
  Events: () => Events,
  Exists: () => Exists,
  Exp: () => Exp,
  FaunaFunction: () => FaunaFunction,
  FaunaIndex: () => FaunaIndex,
  FaunaObject: () => FaunaObject_default,
  Filter: () => Filter,
  FindStr: () => FindStr,
  FindStrRegex: () => FindStrRegex,
  Floor: () => Floor,
  Foreach: () => Foreach,
  Format: () => Format,
  Functions: () => Functions,
  GT: () => GT,
  GTE: () => GTE,
  Get: () => Get,
  HasCurrentIdentity: () => HasCurrentIdentity,
  HasCurrentToken: () => HasCurrentToken,
  HasIdentity: () => HasIdentity_default,
  Hour: () => Hour,
  Hypot: () => Hypot,
  Identify: () => Identify,
  Identity: () => Identity_default,
  If: () => If,
  Indexes: () => Indexes,
  Insert: () => Insert,
  Intersection: () => Intersection,
  IsArray: () => IsArray,
  IsBoolean: () => IsBoolean,
  IsBytes: () => IsBytes,
  IsCollection: () => IsCollection,
  IsCredentials: () => IsCredentials,
  IsDatabase: () => IsDatabase,
  IsDate: () => IsDate,
  IsDoc: () => IsDoc,
  IsDouble: () => IsDouble,
  IsEmpty: () => IsEmpty,
  IsFunction: () => IsFunction,
  IsIndex: () => IsIndex,
  IsInteger: () => IsInteger,
  IsKey: () => IsKey,
  IsLambda: () => IsLambda,
  IsNonEmpty: () => IsNonEmpty,
  IsNull: () => IsNull,
  IsNumber: () => IsNumber,
  IsObject: () => IsObject,
  IsRef: () => IsRef,
  IsRole: () => IsRole,
  IsSet: () => IsSet,
  IsString: () => IsString,
  IsTimestamp: () => IsTimestamp,
  IsToken: () => IsToken,
  Join: () => Join,
  KeyFromSecret: () => KeyFromSecret,
  Keys: () => Keys,
  LT: () => LT,
  LTE: () => LTE,
  LTrim: () => LTrim,
  Lambda: () => Lambda,
  Length: () => Length,
  Let: () => Let,
  Ln: () => Ln,
  Log: () => Log,
  Login: () => Login,
  Logout: () => Logout,
  LowerCase: () => LowerCase,
  Map: () => Map2,
  Match: () => Match,
  Max: () => Max,
  Mean: () => Mean,
  Merge: () => Merge,
  Min: () => Min,
  Minute: () => Minute,
  Modulo: () => Modulo,
  Month: () => Month,
  MoveDatabase: () => MoveDatabase,
  Multiply: () => Multiply,
  NGram: () => NGram,
  NewId: () => NewId,
  NextId: () => NextId_default,
  Not: () => Not,
  Now: () => Now,
  Or: () => Or,
  Paginate: () => Paginate,
  Pow: () => Pow,
  Prepend: () => Prepend,
  Query: () => Query2,
  RTrim: () => RTrim,
  Radians: () => Radians,
  Range: () => Range,
  Reduce: () => Reduce,
  Ref: () => Ref2,
  RegexEscape: () => RegexEscape,
  Remove: () => Remove,
  Repeat: () => Repeat,
  Replace: () => Replace,
  ReplaceStr: () => ReplaceStr,
  ReplaceStrRegex: () => ReplaceStrRegex,
  Reverse: () => Reverse,
  Role: () => Role,
  Roles: () => Roles,
  Round: () => Round,
  Second: () => Second,
  Select: () => Select,
  SelectAll: () => SelectAll_default,
  Sign: () => Sign,
  Sin: () => Sin,
  Singleton: () => Singleton,
  Sinh: () => Sinh,
  Space: () => Space,
  Sqrt: () => Sqrt,
  StartsWith: () => StartsWith,
  SubString: () => SubString,
  Subtract: () => Subtract,
  Sum: () => Sum,
  Take: () => Take,
  Tan: () => Tan,
  Tanh: () => Tanh,
  Time: () => Time,
  TimeAdd: () => TimeAdd,
  TimeDiff: () => TimeDiff,
  TimeSubtract: () => TimeSubtract,
  TitleCase: () => TitleCase,
  ToArray: () => ToArray,
  ToDate: () => ToDate,
  ToDouble: () => ToDouble,
  ToInteger: () => ToInteger,
  ToMicros: () => ToMicros,
  ToMillis: () => ToMillis,
  ToNumber: () => ToNumber,
  ToObject: () => ToObject,
  ToSeconds: () => ToSeconds,
  ToString: () => ToString,
  ToTime: () => ToTime,
  Tokens: () => Tokens,
  Trim: () => Trim,
  Trunc: () => Trunc,
  Union: () => Union,
  Update: () => Update,
  UpperCase: () => UpperCase,
  Var: () => Var,
  Year: () => Year
});

// package.json
var name = "@yacinehmito/faunadb";
var version = "5.0.0-deno-alpha9";
var apiVersion = "5";
var description = "FaunaDB Javascript driver for Node.JS and Browsers";
var homepage = "https://fauna.com";
var repository = "fauna/faunadb-js";
var license = "MPL-2.0";
var keywords = [
  "database",
  "fauna",
  "official",
  "driver"
];
var bugs = {
  url: "https://github.com/fauna/faunadb-js/issues"
};
var files = [
  "index.d.ts",
  "src/",
  "dist/",
  "cjs/",
  "esm5/",
  "query/",
  "tools/printReleaseNotes.js"
];
var main = "./cjs/index.js";
var module = "./esm5/index.js";
var es2015 = "./src/index.js";
var exports = {
  ".": {
    require: "./cjs/index.js",
    import: "./esm5/index.js"
  },
  "./stream": {
    require: "./cjs/stream.js",
    import: "./esm5/stream.js"
  },
  "./query": {
    require: "./cjs/query/index.js",
    import: "./esm5/query/index.js"
  },
  "./query/": {
    require: "./cjs/query/",
    import: "./esm5/query/"
  },
  "./query/*": {
    require: "./cjs/query/*.js",
    import: "./esm5/query/*.js"
  }
};
var scripts = {
  doc: "jsdoc -c ./jsdoc.json",
  prettify: 'prettier --write "{src,test}/**/*.{js,ts}"',
  test: "jest --env=node --testTimeout 200000 --verbose=true --forceExit --runInBand ./test",
  "bundle:analyze": "webpack --env analyze",
  "bundle:stats": "webpack --env analyze --env stats",
  "bundle:diff": "node tools/bundleDiff.js",
  "build:clean": "shx rm -rf ./dist ./cjs ./esm5 ./query ./mod.js ./mod.d.ts",
  "build:browser": "webpack",
  "build:cjs": "cross-env BABEL_ENV=cjs npx babel src -d ./cjs",
  "build:esm5": "cross-env BABEL_ENV=esm npx babel src -d ./esm5",
  "build:package": "npm-run-all build:clean build:deno",
  "build:deno": "esbuild --bundle src/index.js --outfile=mod.js --platform=neutral --format=esm --target=esnext && api-extractor run",
  "postbuild:package": "node tools/postBuildPackage.js",
  posttest: "node ./test/afterComplete",
  "semantic-release": "semantic-release",
  wp: "webpack",
  "load-test": "node ./tools/loadTest"
};
var types = "index.d.ts";
var dependencies = {
  "core-js": "^3.9.1",
  "base64-js": "^1.2.0",
  dotenv: "^8.2.0",
  "fn-annotate": "^1.1.3",
  "object-assign": "^4.1.0"
};
var devDependencies = {
  "@actions/core": "^1.2.6",
  "@actions/github": "^4.0.0",
  "@babel/cli": "^7.13.10",
  "@babel/core": "^7.13.10",
  "@babel/preset-env": "^7.13.10",
  "@microsoft/api-extractor": "^7.18.19",
  "babel-loader": "^8.2.2",
  "cross-env": "^7.0.3",
  esbuild: "^0.13.13",
  "ansi-regex": ">=5.0.1",
  eslint: "^5.3.0",
  "eslint-config-prettier": "^6.5.0",
  "eslint-plugin-prettier": "^3.1.1",
  husky: "^7.0.4",
  "ink-docstrap": "^1.2.1",
  jest: "^27.4.7",
  jsdoc: "^3.6.10",
  "json-schema": ">=0.4.0",
  "lint-staged": ">=8",
  marked: ">=4.0.10",
  "modify-source-webpack-plugin": "^1.1.0-beta.3",
  "npm-run-all": "^4.1.5",
  prettier: "1.18.2",
  "semantic-release": "^19.0.3",
  shx: "^0.3.3",
  terser: "^4.3.9",
  webpack: "^5.23.0",
  "webpack-bundle-analyzer": "^4.4.0",
  "webpack-bundle-diff": "^1.0.0",
  "webpack-cli": "^4.5.0",
  yargs: "^16.2.0"
};
var lint_staged = {
  "*.{js,css,json,md}": [
    "prettier --write",
    "git add"
  ],
  "*.js": [
    "eslint --fix",
    "git add"
  ]
};
var release = {
  branches: [
    "main"
  ]
};
var browser = {
  http2: false,
  http: false,
  https: false,
  os: false
};
var jest = {
  transform: {
    "^.+\\.js$": "babel-jest"
  }
};
var volta = {
  node: "16.13.0",
  npm: "8.1.3"
};
var package_default = {
  name,
  version,
  apiVersion,
  description,
  homepage,
  repository,
  license,
  keywords,
  bugs,
  files,
  main,
  module,
  es2015,
  exports,
  scripts,
  types,
  dependencies,
  devDependencies,
  "lint-staged": lint_staged,
  release,
  browser,
  jest,
  volta
};

// src/_util.js
"use strict";
function inherits(ctor, superCtor) {
  if (ctor === void 0 || ctor === null) {
    throw new TypeError('The constructor to "inherits" must not be null or undefined');
  }
  if (superCtor === void 0 || superCtor === null) {
    throw new TypeError('The super constructor to "inherits" must not be null or undefined');
  }
  if (superCtor.prototype === void 0) {
    throw new TypeError('The super constructor to "inherits" must have a prototype');
  }
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}
function getEnvVariable(envKey) {
  var areEnvVarsAvailable = !!(typeof process !== "undefined" && process && process.env);
  if (areEnvVarsAvailable && process.env[envKey] != null) {
    return process.env[envKey];
  }
}
function getBrowserDetails() {
  var browser2 = navigator.appName;
  var browserVersion = "" + parseFloat(navigator.appVersion);
  var nameOffset, verOffset, ix;
  if ((verOffset = navigator.userAgent.indexOf("Opera")) != -1) {
    browser2 = "Opera";
    browserVersion = navigator.userAgent.substring(verOffset + 6);
    if ((verOffset = navigator.userAgent.indexOf("Version")) != -1) {
      browserVersion = navigator.userAgent.substring(verOffset + 8);
    }
  } else if ((verOffset = navigator.userAgent.indexOf("MSIE")) != -1) {
    browser2 = "Microsoft Internet Explorer";
    browserVersion = navigator.userAgent.substring(verOffset + 5);
  } else if (browser2 == "Netscape" && navigator.userAgent.indexOf("Trident/") != -1) {
    browser2 = "Microsoft Internet Explorer";
    browserVersion = navigator.userAgent.substring(verOffset + 5);
    if ((verOffset = navigator.userAgent.indexOf("rv:")) != -1) {
      browserVersion = navigator.userAgent.substring(verOffset + 3);
    }
  } else if ((verOffset = navigator.userAgent.indexOf("Chrome")) != -1) {
    browser2 = "Chrome";
    browserVersion = navigator.userAgent.substring(verOffset + 7);
  } else if ((verOffset = navigator.userAgent.indexOf("Safari")) != -1) {
    browser2 = "Safari";
    browserVersion = navigator.userAgent.substring(verOffset + 7);
    if ((verOffset = navigator.userAgent.indexOf("Version")) != -1) {
      browserVersion = navigator.userAgent.substring(verOffset + 8);
    }
    if (navigator.userAgent.indexOf("CriOS") != -1) {
      browser2 = "Chrome";
    }
  } else if ((verOffset = navigator.userAgent.indexOf("Firefox")) != -1) {
    browser2 = "Firefox";
    browserVersion = navigator.userAgent.substring(verOffset + 8);
  } else if ((nameOffset = navigator.userAgent.lastIndexOf(" ") + 1) < (verOffset = navigator.userAgent.lastIndexOf("/"))) {
    browser2 = navigator.userAgent.substring(nameOffset, verOffset);
    browserVersion = navigator.userAgent.substring(verOffset + 1);
    if (browser2.toLowerCase() == browser2.toUpperCase()) {
      browser2 = navigator.appName;
    }
  }
  if ((ix = browserVersion.indexOf(";")) != -1)
    browserVersion = browserVersion.substring(0, ix);
  if ((ix = browserVersion.indexOf(" ")) != -1)
    browserVersion = browserVersion.substring(0, ix);
  if ((ix = browserVersion.indexOf(")")) != -1)
    browserVersion = browserVersion.substring(0, ix);
  return [browser2, browserVersion].join("-");
}
function getBrowserOsDetails() {
  var os = "unknown";
  var clientStrings = [
    { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
    { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
    { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
    { s: "Windows Vista", r: /Windows NT 6.0/ },
    { s: "Windows Server 2003", r: /Windows NT 5.2/ },
    { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
    { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
    { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
    { s: "Windows 98", r: /(Windows 98|Win98)/ },
    { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
    { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: "Windows CE", r: /Windows CE/ },
    { s: "Windows 3.11", r: /Win16/ },
    { s: "Android", r: /Android/ },
    { s: "Open BSD", r: /OpenBSD/ },
    { s: "Sun OS", r: /SunOS/ },
    { s: "Chrome OS", r: /CrOS/ },
    { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
    { s: "iOS", r: /(iPhone|iPad|iPod)/ },
    { s: "Mac OS X", r: /Mac OS X/ },
    { s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { s: "QNX", r: /QNX/ },
    { s: "UNIX", r: /UNIX/ },
    { s: "BeOS", r: /BeOS/ },
    { s: "OS/2", r: /OS\/2/ },
    {
      s: "Search Bot",
      r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
    }
  ];
  for (var id in clientStrings) {
    var cs = clientStrings[id];
    if (cs.r.test(navigator.userAgent)) {
      os = cs.s;
      break;
    }
  }
  var osVersion = "unknown";
  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = "Windows";
  }
  switch (os) {
    case "Mac OS":
    case "Mac OS X":
    case "Android":
      osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(navigator.userAgent)[1];
      break;
    case "iOS":
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
      osVersion = osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
      break;
  }
  return [os, osVersion].join("-");
}
function defaults(obj, def) {
  if (obj === void 0) {
    return def;
  } else {
    return obj;
  }
}
function applyDefaults(provided, defaults2) {
  var out = {};
  for (var providedKey in provided) {
    if (!(providedKey in defaults2)) {
      throw new Error("No such option " + providedKey);
    }
    out[providedKey] = provided[providedKey];
  }
  for (var defaultsKey in defaults2) {
    if (!(defaultsKey in out)) {
      out[defaultsKey] = defaults2[defaultsKey];
    }
  }
  return out;
}
function removeNullAndUndefinedValues(object) {
  var res = {};
  for (var key in object) {
    var val = object[key];
    if (val !== null && val !== void 0) {
      res[key] = val;
    }
  }
  return res;
}
function removeUndefinedValues(object) {
  var res = {};
  for (var key in object) {
    var val = object[key];
    if (val !== void 0) {
      res[key] = val;
    }
  }
  return res;
}
function checkInstanceHasProperty(obj, prop) {
  return typeof obj === "object" && obj !== null && Boolean(obj[prop]);
}
function formatUrl(base, path, query) {
  query = typeof query === "object" ? querystringify(query) : query;
  return [
    base,
    path ? path.charAt(0) === "/" ? "" : "/" + path : "",
    query ? query.charAt(0) === "?" ? "" : "?" + query : ""
  ].join("");
}
function querystringify(obj, prefix) {
  prefix = prefix || "";
  var pairs = [], value, key;
  if (typeof prefix !== "string")
    prefix = "?";
  for (key in obj) {
    if (checkInstanceHasProperty(obj, key)) {
      value = obj[key];
      if (!value && (value === null || value === void 0 || isNaN(value))) {
        value = "";
      }
      key = encode(key);
      value = encode(value);
      if (key === null || value === null)
        continue;
      pairs.push(key + "=" + value);
    }
  }
  return pairs.length ? prefix + pairs.join("&") : "";
}
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}
function notifyAboutNewVersion() {
  const checkAndNotify = () => {
    return;
  };
  return checkAndNotify;
}

// src/Expr.js
"use strict";
function Expr(obj) {
  this.raw = obj;
}
Expr.prototype._isFaunaExpr = true;
Expr.prototype.toJSON = function() {
  return this.raw;
};
Expr.prototype.toFQL = function() {
  return exprToString(this.raw);
};
var varArgsFunctions = [
  "Do",
  "Call",
  "Union",
  "Intersection",
  "Difference",
  "Equals",
  "Add",
  "BitAnd",
  "BitOr",
  "BitXor",
  "Divide",
  "Max",
  "Min",
  "Modulo",
  "Multiply",
  "Subtract",
  "LT",
  "LTE",
  "GT",
  "GTE",
  "And",
  "Or"
];
var specialCases = {
  containsstrregex: "ContainsStrRegex",
  containsstr: "ContainsStr",
  endswith: "EndsWith",
  findstr: "FindStr",
  findstrregex: "FindStrRegex",
  gt: "GT",
  gte: "GTE",
  is_nonempty: "is_non_empty",
  lowercase: "LowerCase",
  lt: "LT",
  lte: "LTE",
  ltrim: "LTrim",
  ngram: "NGram",
  rtrim: "RTrim",
  regexescape: "RegexEscape",
  replacestr: "ReplaceStr",
  replacestrregex: "ReplaceStrRegex",
  startswith: "StartsWith",
  substring: "SubString",
  titlecase: "TitleCase",
  uppercase: "UpperCase"
};
function isExpr(expression) {
  return expression instanceof Expr || checkInstanceHasProperty(expression, "_isFaunaExpr");
}
function printObject(obj) {
  return "{" + Object.keys(obj).map(function(k) {
    return '"' + k + '": ' + exprToString(obj[k]);
  }).join(", ") + "}";
}
function printArray(arr, toStr) {
  return arr.map(function(item) {
    return toStr(item);
  }).join(", ");
}
function convertToCamelCase(fn) {
  if (fn in specialCases)
    fn = specialCases[fn];
  return fn.split("_").map(function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }).join("");
}
var exprToString = function(expr, caller) {
  if (isExpr(expr)) {
    if ("value" in expr)
      return expr.toString();
    expr = expr.raw;
  }
  if (expr === null) {
    return "null";
  }
  switch (typeof expr) {
    case "string":
      return JSON.stringify(expr);
    case "symbol":
    case "number":
    case "boolean":
      return expr.toString();
    case "undefined":
      return "undefined";
  }
  if (Array.isArray(expr)) {
    var array = printArray(expr, exprToString);
    return varArgsFunctions.indexOf(caller) != -1 ? array : "[" + array + "]";
  }
  if ("match" in expr) {
    var matchStr = exprToString(expr["match"]);
    var terms = expr["terms"] || [];
    if (isExpr(terms))
      terms = terms.raw;
    if (Array.isArray(terms) && terms.length == 0)
      return "Match(" + matchStr + ")";
    if (Array.isArray(terms)) {
      return "Match(" + matchStr + ", [" + printArray(terms, exprToString) + "])";
    }
    return "Match(" + matchStr + ", " + exprToString(terms) + ")";
  }
  if ("paginate" in expr) {
    var exprKeys = Object.keys(expr);
    if (exprKeys.length === 1) {
      return "Paginate(" + exprToString(expr["paginate"]) + ")";
    }
    var expr2 = Object.assign({}, expr);
    delete expr2["paginate"];
    return "Paginate(" + exprToString(expr["paginate"]) + ", " + printObject(expr2) + ")";
  }
  if ("let" in expr && "in" in expr) {
    var letExpr = "";
    if (Array.isArray(expr["let"]))
      letExpr = "[" + printArray(expr["let"], printObject) + "]";
    else
      letExpr = printObject(expr["let"]);
    return "Let(" + letExpr + ", " + exprToString(expr["in"]) + ")";
  }
  if ("object" in expr)
    return printObject(expr["object"]);
  if ("merge" in expr) {
    if (expr.lambda) {
      return "Merge(" + exprToString(expr.merge) + ", " + exprToString(expr.with) + ", " + exprToString(expr.lambda) + ")";
    }
    return "Merge(" + exprToString(expr.merge) + ", " + exprToString(expr.with) + ")";
  }
  if ("lambda" in expr) {
    return "Lambda(" + exprToString(expr["lambda"]) + ", " + exprToString(expr["expr"]) + ")";
  }
  if ("filter" in expr) {
    return "Filter(" + exprToString(expr["collection"]) + ", " + exprToString(expr["filter"]) + ")";
  }
  if ("call" in expr) {
    return "Call(" + exprToString(expr["call"]) + ", " + exprToString(expr["arguments"]) + ")";
  }
  if ("map" in expr) {
    return "Map(" + exprToString(expr["collection"]) + ", " + exprToString(expr["map"]) + ")";
  }
  if ("foreach" in expr) {
    return "Foreach(" + exprToString(expr["collection"]) + ", " + exprToString(expr["foreach"]) + ")";
  }
  var keys = Object.keys(expr);
  var fn = keys[0];
  fn = convertToCamelCase(fn);
  var args = keys.filter((k) => expr[k] !== null || keys.length > 1).map((k) => exprToString(expr[k], fn)).join(", ");
  return fn + "(" + args + ")";
};
Expr.toString = exprToString;

// src/errors.js
"use strict";
function FaunaError(name2, message, description2) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else
    this.stack = new Error().stack;
  this.name = name2;
  this.message = message;
  this.description = description2;
}
inherits(FaunaError, Error);
function InvalidValue(message) {
  FaunaError.call(this, "InvalidValue", message);
}
inherits(InvalidValue, FaunaError);
function InvalidArity(min, max, actual, callerFunc) {
  var arityInfo = `${callerFunc} function requires ${messageForArity(min, max)} argument(s) but ${actual} were given`;
  var documentationLink = logDocumentationLink(callerFunc);
  FaunaError.call(this, "InvalidArity", `${arityInfo}
${documentationLink}`);
  this.min = min;
  this.max = max;
  this.actual = actual;
  function messageForArity(min2, max2) {
    if (max2 === null)
      return "at least " + min2;
    if (min2 === null)
      return "up to " + max2;
    if (min2 === max2)
      return min2;
    return "from " + min2 + " to " + max2;
  }
  function logDocumentationLink(functionName) {
    var docsURL = "https://docs.fauna.com/fauna/current/api/fql/functions/";
    return `For more info, see the docs: ${docsURL}${functionName.toLowerCase()}`;
  }
}
inherits(InvalidArity, FaunaError);
function FaunaHTTPError(name2, requestResult) {
  var response = requestResult.responseContent;
  var errors = response.errors;
  var message = errors.length === 0 ? '(empty "errors")' : errors[0].code;
  var description2 = errors.length === 0 ? '(empty "errors")' : errors[0].description;
  FaunaError.call(this, name2, message, description2);
  this.requestResult = requestResult;
  this.code = this.errors()[0].code;
  this.position = this.errors()[0].position || [];
  this.httpStatusCode = requestResult.statusCode;
}
inherits(FaunaHTTPError, FaunaError);
FaunaHTTPError.prototype.errors = function() {
  return this.requestResult.responseContent.errors;
};
FaunaHTTPError.raiseForStatusCode = function(requestResult) {
  var code = requestResult.statusCode;
  if (code < 200 || code >= 300) {
    switch (code) {
      case 400:
        throw getQueryError(requestResult);
      case 401:
        throw new Unauthorized(requestResult);
      case 403:
        throw new PermissionDenied(requestResult);
      case 404:
        throw new NotFound(requestResult);
      case 405:
        throw new MethodNotAllowed(requestResult);
      case 409:
        throw new Conflict(requestResult);
      case 413:
        throw new PayloadTooLarge(requestResult);
      case 429:
        throw new TooManyRequests(requestResult);
      case 440:
        throw new ProcessingTimeLimitExceeded(requestResult);
      case 500:
        throw new InternalError(requestResult);
      case 502:
        throw new BadGateway(requestResult);
      case 503:
        throw new UnavailableError(requestResult);
      default:
        throw new FaunaHTTPError("UnknownError", requestResult);
    }
  }
};
function FunctionCallError(requestResult) {
  FaunaHTTPError.call(this, "FunctionCallError", requestResult);
  const cause = requestResult.responseContent.errors[0].cause[0];
  this.code = cause.code;
  this.position = cause.position;
  this.description = cause.description;
}
inherits(FunctionCallError, FaunaHTTPError);
function ValidationError(requestResult) {
  FaunaHTTPError.call(this, "ValidationError", requestResult);
  const failure = requestResult.responseContent.errors[0].failures[0];
  this.code = failure.code;
  this.position = failure.field;
  this.description = failure.description;
}
inherits(ValidationError, FaunaHTTPError);
function Unauthorized(requestResult) {
  FaunaHTTPError.call(this, "Unauthorized", requestResult);
  this.message = this.message += ". Check that endpoint, schema, port and secret are correct during client\u2019s instantiation";
}
inherits(Unauthorized, FaunaHTTPError);
function PermissionDenied(requestResult) {
  FaunaHTTPError.call(this, "PermissionDenied", requestResult);
}
inherits(PermissionDenied, FaunaHTTPError);
function NotFound(requestResult) {
  FaunaHTTPError.call(this, "NotFound", requestResult);
}
inherits(NotFound, FaunaHTTPError);
function BadRequest(requestResult) {
  FaunaHTTPError.call(this, "BadRequest", requestResult);
}
inherits(BadRequest, FaunaHTTPError);
function MethodNotAllowed(requestResult) {
  FaunaHTTPError.call(this, "MethodNotAllowed", requestResult);
}
inherits(MethodNotAllowed, FaunaHTTPError);
function Conflict(requestResult) {
  FaunaHTTPError.call(this, "Conflict", requestResult);
}
inherits(Conflict, FaunaHTTPError);
function TooManyRequests(requestResult) {
  FaunaHTTPError.call(this, "TooManyRequests", requestResult);
}
inherits(TooManyRequests, FaunaHTTPError);
function PayloadTooLarge(requestResult) {
  FaunaHTTPError.call(this, "PayloadTooLarge", requestResult);
}
inherits(PayloadTooLarge, FaunaHTTPError);
function BadGateway(requestResult) {
  FaunaHTTPError.call(this, "BadGateway", requestResult);
}
inherits(BadGateway, FaunaHTTPError);
function ProcessingTimeLimitExceeded(requestResult) {
  FaunaHTTPError.call(this, "ProcessingTimeLimitExceeded", requestResult);
}
inherits(ProcessingTimeLimitExceeded, FaunaHTTPError);
function InternalError(requestResult) {
  FaunaHTTPError.call(this, "InternalError", requestResult);
}
inherits(InternalError, FaunaHTTPError);
function UnavailableError(requestResult) {
  FaunaHTTPError.call(this, "UnavailableError", requestResult);
}
inherits(UnavailableError, FaunaHTTPError);
function StreamError(name2, message, description2) {
  FaunaError.call(this, name2, message, description2);
}
inherits(StreamError, FaunaError);
function StreamsNotSupported(description2) {
  FaunaError.call(this, "StreamsNotSupported", "streams not supported", description2);
}
inherits(StreamsNotSupported, StreamError);
function StreamErrorEvent(event) {
  var error = event.data || {};
  FaunaError.call(this, "StreamErrorEvent", error.code, error.description);
  this.event = event;
}
inherits(StreamErrorEvent, StreamError);
function ClientClosed(message, description2) {
  FaunaError.call(this, "ClientClosed", message, description2);
}
inherits(ClientClosed, FaunaError);
function TimeoutError(message) {
  Error.call(this);
  this.message = message || "Request aborted due to timeout";
  this.isTimeoutError = true;
}
inherits(TimeoutError, Error);
function AbortError(message) {
  Error.call(this);
  this.message = message || "Request aborted";
  this.isAbortError = true;
}
inherits(AbortError, Error);
var ErrorCodeMap = {
  "invalid argument": "InvalidArgumentError",
  "call error": FunctionCallError,
  "invalid expression": "InvalidExpressionError",
  "invalid url parameter": "InvalidUrlParameterError",
  "schema not found": "SchemaNotFoundError",
  "transaction aborted": "TransactionAbortedError",
  "invalid write time": "InvalidWriteTimeError",
  "invalid ref": "InvalidReferenceError",
  "missing identity": "MissingIdentityError",
  "invalid scope": "InvalidScopeError",
  "invalid token": "InvalidTokenError",
  "stack overflow": "StackOverflowError",
  "authentication failed": "AuthenticationFailedError",
  "value not found": "ValueNotFoundError",
  "instance not found": "InstanceNotFound",
  "instance already exists": "InstanceAlreadyExistsError",
  "validation failed": ValidationError,
  "instance not unique": "InstanceNotUniqueError",
  "invalid object in container": "InvalidObjectInContainerError",
  "move database error": "MoveDatabaseError",
  "recovery failed": "RecoveryFailedError",
  "feature not available": "FeatureNotAvailableError"
};
var Errors = {
  FaunaError,
  ClientClosed,
  FaunaHTTPError,
  InvalidValue,
  InvalidArity,
  BadRequest,
  PayloadTooLarge,
  ValidationError,
  Unauthorized,
  PermissionDenied,
  NotFound,
  MethodNotAllowed,
  TooManyRequests,
  InternalError,
  UnavailableError,
  FunctionCallError,
  StreamError,
  StreamsNotSupported,
  StreamErrorEvent
};
function getQueryError(requestResult) {
  const errors = requestResult.responseContent.errors;
  const errorCode = errors[0].code;
  const ErrorFn = typeof ErrorCodeMap[errorCode] === "string" ? Errors[ErrorCodeMap[errorCode]] : ErrorCodeMap[errorCode];
  if (errors.length === 0 || !errorCode) {
    return new BadRequest(requestResult);
  }
  if (!ErrorFn) {
    return new FaunaHTTPError("UnknownError", requestResult);
  }
  return new ErrorFn(requestResult);
}
Object.keys(ErrorCodeMap).forEach((code) => {
  if (typeof ErrorCodeMap[code] === "string") {
    Errors[ErrorCodeMap[code]] = errorClassFactory(ErrorCodeMap[code]);
  } else {
    Errors[ErrorCodeMap[code].name] = ErrorCodeMap[code];
  }
});
function errorClassFactory(name2) {
  function ErrorClass(requestResult) {
    FaunaHTTPError.call(this, name2, requestResult);
  }
  inherits(ErrorClass, FaunaHTTPError);
  return ErrorClass;
}

// src/values.js
var base64 = __toModule(require_base64_js());

// src/util-deprecate.js
var handleDeprecation = (msg) => {
  console.warn(msg);
};
function setDeprecationHandler(fn) {
  handleDeprecation = fn;
}
function deprecate(fn, msg) {
  var warned = false;
  function deprecated() {
    if (!warned) {
      handleDeprecation(msg);
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}

// src/values.js
"use strict";
var stringify = JSON.stringify;
function Value() {
}
inherits(Value, Expr);
Value.prototype._isFaunaValue = true;
function Ref(id, collection, database) {
  if (!id)
    throw new InvalidValue("id cannot be null or undefined");
  this.value = { id };
  if (collection)
    this.value["collection"] = collection;
  if (database)
    this.value["database"] = database;
}
inherits(Ref, Value);
Ref.prototype._isFaunaRef = true;
Object.defineProperty(Ref.prototype, "collection", {
  get: function() {
    return this.value["collection"];
  }
});
Object.defineProperty(Ref.prototype, "class", {
  get: deprecate(function() {
    return this.value["collection"];
  }, "class is deprecated, use collection instead")
});
Object.defineProperty(Ref.prototype, "database", {
  get: function() {
    return this.value["database"];
  }
});
Object.defineProperty(Ref.prototype, "id", {
  get: function() {
    return this.value["id"];
  }
});
Ref.prototype.toJSON = function() {
  return { "@ref": this.value };
};
wrapToString(Ref, function() {
  var constructors = {
    collections: "Collection",
    databases: "Database",
    indexes: "Index",
    functions: "Function",
    roles: "Role",
    access_providers: "AccessProvider"
  };
  var isNative = function(ref) {
    return ref.collection === void 0;
  };
  var toString = function(ref) {
    if (isNative(ref)) {
      var db = ref.database !== void 0 ? ref.database.toString() : "";
      if (ref.id === "access_providers")
        return "AccessProviders(" + db + ")";
      return ref.id.charAt(0).toUpperCase() + ref.id.slice(1) + "(" + db + ")";
    }
    if (isNative(ref.collection)) {
      var constructor = constructors[ref.collection.id];
      if (constructor !== void 0) {
        var db = ref.database !== void 0 ? ", " + ref.database.toString() : "";
        return constructor + '("' + ref.id + '"' + db + ")";
      }
    }
    return "Ref(" + toString(ref.collection) + ', "' + ref.id + '")';
  };
  return toString(this);
});
Ref.prototype.valueOf = function() {
  return this.value;
};
Ref.prototype.equals = function(other) {
  return (other instanceof Ref || checkInstanceHasProperty(other, "_isFaunaRef")) && this.id === other.id && (this.collection === void 0 && other.collection === void 0 || this.collection.equals(other.collection)) && (this.database === void 0 && other.database === void 0 || this.database.equals(other.database));
};
var Native = {
  COLLECTIONS: new Ref("collections"),
  INDEXES: new Ref("indexes"),
  DATABASES: new Ref("databases"),
  FUNCTIONS: new Ref("functions"),
  ROLES: new Ref("roles"),
  KEYS: new Ref("keys"),
  ACCESS_PROVIDERS: new Ref("access_providers")
};
Native.fromName = function(name2) {
  switch (name2) {
    case "collections":
      return Native.COLLECTIONS;
    case "indexes":
      return Native.INDEXES;
    case "databases":
      return Native.DATABASES;
    case "functions":
      return Native.FUNCTIONS;
    case "roles":
      return Native.ROLES;
    case "keys":
      return Native.KEYS;
    case "access_providers":
      return Native.ACCESS_PROVIDERS;
  }
  return new Ref(name2);
};
function SetRef(value) {
  this.value = value;
}
inherits(SetRef, Value);
wrapToString(SetRef, function() {
  return Expr.toString(this.value);
});
SetRef.prototype.toJSON = function() {
  return { "@set": this.value };
};
function FaunaTime(value) {
  if (value instanceof Date) {
    value = value.toISOString();
  } else if (!(value.charAt(value.length - 1) === "Z")) {
    throw new InvalidValue("Only allowed timezone is 'Z', got: " + value);
  }
  this.value = value;
}
inherits(FaunaTime, Value);
Object.defineProperty(FaunaTime.prototype, "date", {
  get: function() {
    return new Date(this.value);
  }
});
wrapToString(FaunaTime, function() {
  return 'Time("' + this.value + '")';
});
FaunaTime.prototype.toJSON = function() {
  return { "@ts": this.value };
};
function FaunaDate(value) {
  if (value instanceof Date) {
    value = value.toISOString().slice(0, 10);
  }
  this.value = value;
}
inherits(FaunaDate, Value);
Object.defineProperty(FaunaDate.prototype, "date", {
  get: function() {
    return new Date(this.value);
  }
});
wrapToString(FaunaDate, function() {
  return 'Date("' + this.value + '")';
});
FaunaDate.prototype.toJSON = function() {
  return { "@date": this.value };
};
function Bytes(value) {
  if (value instanceof ArrayBuffer) {
    this.value = new Uint8Array(value);
  } else if (typeof value === "string") {
    this.value = base64.toByteArray(value);
  } else if (value instanceof Uint8Array) {
    this.value = value;
  } else {
    throw new InvalidValue("Bytes type expect argument to be either Uint8Array|ArrayBuffer|string, got: " + stringify(value));
  }
}
inherits(Bytes, Value);
wrapToString(Bytes, function() {
  return 'Bytes("' + base64.fromByteArray(this.value) + '")';
});
Bytes.prototype.toJSON = function() {
  return { "@bytes": base64.fromByteArray(this.value) };
};
function Query(value) {
  this.value = value;
}
inherits(Query, Value);
wrapToString(Query, function() {
  return "Query(" + Expr.toString(this.value) + ")";
});
Query.prototype.toJSON = function() {
  return { "@query": this.value };
};
function wrapToString(type, fn) {
  type.prototype.toString = fn;
  type.prototype.inspect = fn;
}

// src/query/Lambda.js
var import_fn_annotate = __toModule(require_fn_annotate());

// src/query/Var.js
function Var(varName) {
  arity.exact(1, arguments, Var.name);
  return new Expr({ var: wrap(varName) });
}

// src/query/Lambda.js
function Lambda() {
  arity.between(1, 2, arguments, Lambda.name);
  switch (arguments.length) {
    case 1:
      var value = arguments[0];
      if (typeof value === "function") {
        return lambdaFunc(value);
      } else if (value instanceof Expr || checkInstanceHasProperty(value, "_isFaunaExpr")) {
        return value;
      } else {
        throw new InvalidValue("Lambda function takes either a Function or an Expr.");
      }
    case 2:
      var var_name = arguments[0];
      var expr = arguments[1];
      return lambdaExpr(var_name, expr);
  }
}
function lambdaFunc(func) {
  var vars = (0, import_fn_annotate.default)(func);
  switch (vars.length) {
    case 0:
      throw new InvalidValue("Provided Function must take at least 1 argument.");
    case 1:
      return lambdaExpr(vars[0], func(Var(vars[0])));
    default:
      return lambdaExpr(vars, func.apply(null, vars.map(function(name2) {
        return Var(name2);
      })));
  }
}
function lambdaExpr(var_name, expr) {
  return new Expr({ lambda: wrap(var_name), expr: wrap(expr) });
}

// src/query/common.js
function wrap(obj) {
  arity.exact(1, arguments, wrap.name);
  if (obj === null) {
    return null;
  } else if (obj instanceof Expr || checkInstanceHasProperty(obj, "_isFaunaExpr")) {
    return obj;
  } else if (typeof obj === "symbol") {
    return obj.toString().replace(/Symbol\((.*)\)/, function(str, symbol) {
      return symbol;
    });
  } else if (typeof obj === "function") {
    return Lambda(obj);
  } else if (Array.isArray(obj)) {
    return new Expr(obj.map(function(elem) {
      return wrap(elem);
    }));
  } else if (obj instanceof Uint8Array || obj instanceof ArrayBuffer) {
    return new Bytes(obj);
  } else if (typeof obj === "object") {
    return new Expr({ object: wrapValues(obj) });
  } else {
    return obj;
  }
}
function wrapValues(obj) {
  if (obj !== null) {
    var rv = {};
    Object.keys(obj).forEach(function(key) {
      rv[key] = wrap(obj[key]);
    });
    return rv;
  } else {
    return null;
  }
}
function varargs(values) {
  var valuesAsArr = Array.isArray(values) ? values : Array.prototype.slice.call(values);
  return values.length === 1 ? values[0] : valuesAsArr;
}
function params(mainParams, optionalParams) {
  for (var key in optionalParams) {
    var val = optionalParams[key];
    if (val !== null && val !== void 0) {
      mainParams[key] = val;
    }
  }
  return mainParams;
}
function arity(min, max, args, callerFunc) {
  if (min !== null && args.length < min || max !== null && args.length > max) {
    throw new InvalidArity(min, max, args.length, callerFunc);
  }
}
arity.exact = function(n, args, callerFunc) {
  arity(n, n, args, callerFunc);
};
arity.max = function(n, args, callerFunc) {
  arity(null, n, args, callerFunc);
};
arity.min = function(n, args, callerFunc) {
  arity(n, null, args, callerFunc);
};
arity.between = function(min, max, args, callerFunc) {
  arity(min, max, args, callerFunc);
};
function argsToArray(args) {
  var rv = [];
  rv.push.apply(rv, args);
  return rv;
}

// src/query/Abort.js
function Abort(msg) {
  arity.exact(1, arguments, Abort.name);
  return new Expr({ abort: wrap(msg) });
}

// src/query/Abs.js
function Abs(expr) {
  arity.exact(1, arguments, Abs.name);
  return new Expr({ abs: wrap(expr) });
}

// src/query/AccessProvider.js
function AccessProvider(name2) {
  arity.exact(1, arguments, AccessProvider.name);
  return new Expr({ access_provider: wrap(name2) });
}

// src/query/AccessProviders.js
function AccessProviders(scope) {
  arity.max(1, arguments, AccessProviders.name);
  scope = defaults(scope, null);
  return new Expr({ access_providers: wrap(scope) });
}

// src/query/Acos.js
function Acos(expr) {
  arity.exact(1, arguments, Acos.name);
  return new Expr({ acos: wrap(expr) });
}

// src/query/Add.js
function Add() {
  arity.min(1, arguments, Add.name);
  return new Expr({ add: wrap(varargs(arguments)) });
}

// src/query/All.js
function All(collection) {
  arity.exact(1, arguments, All.name);
  return new Expr({ all: wrap(collection) });
}

// src/query/And.js
function And() {
  arity.min(1, arguments, And.name);
  return new Expr({ and: wrap(varargs(arguments)) });
}

// src/query/Any.js
function Any(collection) {
  arity.exact(1, arguments, Any.name);
  return new Expr({ any: wrap(collection) });
}

// src/query/Append.js
function Append(elements, collection) {
  arity.exact(2, arguments, Append.name);
  return new Expr({ append: wrap(elements), collection: wrap(collection) });
}

// src/query/Asin.js
function Asin(expr) {
  arity.exact(1, arguments, Asin.name);
  return new Expr({ asin: wrap(expr) });
}

// src/query/At.js
function At(timestamp, expr) {
  arity.exact(2, arguments, At.name);
  return new Expr({ at: wrap(timestamp), expr: wrap(expr) });
}

// src/query/Atan.js
function Atan(expr) {
  arity.exact(1, arguments, Atan.name);
  return new Expr({ atan: wrap(expr) });
}

// src/query/BitAnd.js
function BitAnd() {
  arity.min(1, arguments, BitAnd.name);
  return new Expr({ bitand: wrap(varargs(arguments)) });
}

// src/query/BitNot.js
function BitNot(expr) {
  arity.exact(1, arguments, BitNot.name);
  return new Expr({ bitnot: wrap(expr) });
}

// src/query/BitOr.js
function BitOr() {
  arity.min(1, arguments, BitOr.name);
  return new Expr({ bitor: wrap(varargs(arguments)) });
}

// src/query/BitXor.js
function BitXor() {
  arity.min(1, arguments, BitXor.name);
  return new Expr({ bitxor: wrap(varargs(arguments)) });
}

// src/query/Bytes.js
function Bytes2(bytes) {
  arity.exact(1, arguments, Bytes2.name);
  return new Bytes(bytes);
}

// src/query/Call.js
function Call(ref) {
  arity.min(1, arguments, Call.name);
  var args = argsToArray(arguments);
  args.shift();
  return new Expr({ call: wrap(ref), arguments: wrap(varargs(args)) });
}

// src/query/Casefold.js
function Casefold(string, normalizer) {
  arity.min(1, arguments, Casefold.name);
  return new Expr(params({ casefold: wrap(string) }, { normalizer: wrap(normalizer) }));
}

// src/query/Ceil.js
function Ceil(expr) {
  arity.exact(1, arguments, Ceil.name);
  return new Expr({ ceil: wrap(expr) });
}

// src/query/Class.js
var Class_default = deprecate(function(name2, scope) {
  arity.between(1, 2, arguments, "Class");
  switch (arguments.length) {
    case 1:
      return new Expr({ class: wrap(name2) });
    case 2:
      return new Expr({ class: wrap(name2), scope: wrap(scope) });
  }
}, "Class() is deprecated, use Collection() instead");

// src/query/Classes.js
var Classes_default = deprecate(function(scope) {
  arity.max(1, arguments, "Classes");
  scope = defaults(scope, null);
  return new Expr({ classes: wrap(scope) });
}, "Classes() is deprecated, use Collections() instead");

// src/query/Collection.js
function Collection(name2, scope) {
  arity.between(1, 2, arguments, Collection.name);
  switch (arguments.length) {
    case 1:
      return new Expr({ collection: wrap(name2) });
    case 2:
      return new Expr({ collection: wrap(name2), scope: wrap(scope) });
  }
}

// src/query/Collections.js
function Collections(scope) {
  arity.max(1, arguments, Collections.name);
  scope = defaults(scope, null);
  return new Expr({ collections: wrap(scope) });
}

// src/query/Concat.js
function Concat(strings, separator) {
  arity.min(1, arguments, Concat.name);
  separator = defaults(separator, null);
  return new Expr(params({ concat: wrap(strings) }, { separator: wrap(separator) }));
}

// src/query/Contains.js
var Contains_default = deprecate(function(path, _in) {
  arity.exact(2, arguments, "Contains");
  return new Expr({ contains: wrap(path), in: wrap(_in) });
}, "Contains() is deprecated, use ContainsPath() instead");

// src/query/ContainsField.js
function ContainsField(field, obj) {
  arity.exact(2, arguments, ContainsField.name);
  return new Expr({ contains_field: wrap(field), in: wrap(obj) });
}

// src/query/ContainsPath.js
function ContainsPath(path, _in) {
  arity.exact(2, arguments, ContainsPath.name);
  return new Expr({ contains_path: wrap(path), in: wrap(_in) });
}

// src/query/ContainsStr.js
function ContainsStr(value, search) {
  arity.exact(2, arguments, ContainsStr.name);
  return new Expr({ containsstr: wrap(value), search: wrap(search) });
}

// src/query/ContainsStrRegex.js
function ContainsStrRegex(value, pattern) {
  arity.exact(2, arguments, ContainsStrRegex.name);
  return new Expr({ containsstrregex: wrap(value), pattern: wrap(pattern) });
}

// src/query/ContainsValue.js
function ContainsValue(value, _in) {
  arity.exact(2, arguments, ContainsValue.name);
  return new Expr({ contains_value: wrap(value), in: wrap(_in) });
}

// src/query/Cos.js
function Cos(expr) {
  arity.exact(1, arguments, Cos.name);
  return new Expr({ cos: wrap(expr) });
}

// src/query/Cosh.js
function Cosh(expr) {
  arity.exact(1, arguments, Cosh.name);
  return new Expr({ cosh: wrap(expr) });
}

// src/query/Count.js
function Count(collection) {
  arity.exact(1, arguments, Count.name);
  return new Expr({ count: wrap(collection) });
}

// src/query/Create.js
function Create(collection_ref, params2) {
  arity.between(1, 2, arguments, Create.name);
  return new Expr({ create: wrap(collection_ref), params: wrap(params2) });
}

// src/query/CreateAccessProvider.js
function CreateAccessProvider(params2) {
  arity.exact(1, arguments, CreateAccessProvider.name);
  return new Expr({ create_access_provider: wrap(params2) });
}

// src/query/CreateClass.js
var CreateClass_default = deprecate(function(params2) {
  arity.exact(1, arguments, "CreateClass");
  return new Expr({ create_class: wrap(params2) });
}, "CreateClass() is deprecated, use CreateCollection() instead");

// src/query/CreateCollection.js
function CreateCollection(params2) {
  arity.exact(1, arguments, CreateCollection.name);
  return new Expr({ create_collection: wrap(params2) });
}

// src/query/CreateDatabase.js
function CreateDatabase(params2) {
  arity.exact(1, arguments, CreateDatabase.name);
  return new Expr({ create_database: wrap(params2) });
}

// src/query/CreateFunction.js
function CreateFunction(params2) {
  arity.exact(1, arguments, CreateFunction.name);
  return new Expr({ create_function: wrap(params2) });
}

// src/query/CreateIndex.js
function CreateIndex(params2) {
  arity.exact(1, arguments, CreateIndex.name);
  return new Expr({ create_index: wrap(params2) });
}

// src/query/CreateKey.js
function CreateKey(params2) {
  arity.exact(1, arguments, CreateKey.name);
  return new Expr({ create_key: wrap(params2) });
}

// src/query/CreateRole.js
function CreateRole(params2) {
  arity.exact(1, arguments, CreateRole.name);
  return new Expr({ create_role: wrap(params2) });
}

// src/query/Credentials.js
function Credentials(scope) {
  arity.max(1, arguments, Credentials.name);
  scope = defaults(scope, null);
  return new Expr({ credentials: wrap(scope) });
}

// src/query/CurrentIdentity.js
function CurrentIdentity() {
  arity.exact(0, arguments, CurrentIdentity.name);
  return new Expr({ current_identity: null });
}

// src/query/CurrentToken.js
function CurrentToken() {
  arity.exact(0, arguments, CurrentToken.name);
  return new Expr({ current_token: null });
}

// src/query/Database.js
function Database(name2, scope) {
  arity.between(1, 2, arguments, Database.name);
  switch (arguments.length) {
    case 1:
      return new Expr({ database: wrap(name2) });
    case 2:
      return new Expr({ database: wrap(name2), scope: wrap(scope) });
  }
}

// src/query/Databases.js
function Databases(scope) {
  arity.max(1, arguments, Databases.name);
  scope = defaults(scope, null);
  return new Expr({ databases: wrap(scope) });
}

// src/query/Date.js
function Date2(string) {
  arity.exact(1, arguments, Date2.name);
  return new Expr({ date: wrap(string) });
}

// src/query/DayOfMonth.js
function DayOfMonth(expr) {
  arity.exact(1, arguments, DayOfMonth.name);
  return new Expr({ day_of_month: wrap(expr) });
}

// src/query/DayOfWeek.js
function DayOfWeek(expr) {
  arity.exact(1, arguments, DayOfWeek.name);
  return new Expr({ day_of_week: wrap(expr) });
}

// src/query/DayOfYear.js
function DayOfYear(expr) {
  arity.exact(1, arguments, DayOfYear.name);
  return new Expr({ day_of_year: wrap(expr) });
}

// src/query/Degrees.js
function Degrees(expr) {
  arity.exact(1, arguments, Degrees.name);
  return new Expr({ degrees: wrap(expr) });
}

// src/query/Delete.js
function Delete(ref) {
  arity.exact(1, arguments, Delete.name);
  return new Expr({ delete: wrap(ref) });
}

// src/query/Difference.js
function Difference() {
  arity.min(1, arguments, Difference.name);
  return new Expr({ difference: wrap(varargs(arguments)) });
}

// src/query/Distinct.js
function Distinct(set) {
  arity.exact(1, arguments, Distinct.name);
  return new Expr({ distinct: wrap(set) });
}

// src/query/Divide.js
function Divide() {
  arity.min(1, arguments, Divide.name);
  return new Expr({ divide: wrap(varargs(arguments)) });
}

// src/query/Do.js
function Do() {
  arity.min(1, arguments, Do.name);
  var args = argsToArray(arguments);
  return new Expr({ do: wrap(args) });
}

// src/query/Documents.js
function Documents(collection) {
  arity.exact(1, arguments, Documents.name);
  return new Expr({ documents: wrap(collection) });
}

// src/query/Drop.js
function Drop(number, collection) {
  arity.exact(2, arguments, Drop.name);
  return new Expr({ drop: wrap(number), collection: wrap(collection) });
}

// src/query/EndsWith.js
function EndsWith(value, search) {
  arity.exact(2, arguments, EndsWith.name);
  return new Expr({ endswith: wrap(value), search: wrap(search) });
}

// src/query/Epoch.js
function Epoch(number, unit) {
  arity.exact(2, arguments, Epoch.name);
  return new Expr({ epoch: wrap(number), unit: wrap(unit) });
}

// src/query/Equals.js
function Equals() {
  arity.min(1, arguments, Equals.name);
  return new Expr({ equals: wrap(varargs(arguments)) });
}

// src/query/Events.js
function Events(ref_set) {
  arity.exact(1, arguments, Events.name);
  return new Expr({ events: wrap(ref_set) });
}

// src/query/Exists.js
function Exists(ref, ts) {
  arity.between(1, 2, arguments, Exists.name);
  ts = defaults(ts, null);
  return new Expr(params({ exists: wrap(ref) }, { ts: wrap(ts) }));
}

// src/query/Exp.js
function Exp(expr) {
  arity.exact(1, arguments, Exp.name);
  return new Expr({ exp: wrap(expr) });
}

// src/query/FaunaFunction.js
function FaunaFunction(name2, scope) {
  arity.between(1, 2, arguments, FaunaFunction.name);
  switch (arguments.length) {
    case 1:
      return new Expr({ function: wrap(name2) });
    case 2:
      return new Expr({ function: wrap(name2), scope: wrap(scope) });
  }
}

// src/query/FaunaIndex.js
function FaunaIndex(name2, scope) {
  arity.between(1, 2, arguments, FaunaIndex.name);
  switch (arguments.length) {
    case 1:
      return new Expr({ index: wrap(name2) });
    case 2:
      return new Expr({ index: wrap(name2), scope: wrap(scope) });
  }
}

// src/query/FaunaObject.js
var FaunaObject = function(fields) {
  arity.exact(1, arguments, FaunaObject.name);
  return new Expr({ object: wrapValues(fields) });
};
var FaunaObject_default = FaunaObject;

// src/query/Filter.js
function Filter(collection, lambda_expr) {
  arity.exact(2, arguments, Filter.name);
  return new Expr({ filter: wrap(lambda_expr), collection: wrap(collection) });
}

// src/query/FindStr.js
function FindStr(value, find, start) {
  arity.between(2, 3, arguments, FindStr.name);
  start = defaults(start, null);
  return new Expr(params({ findstr: wrap(value), find: wrap(find) }, { start: wrap(start) }));
}

// src/query/FindStrRegex.js
function FindStrRegex(value, pattern, start, numResults) {
  arity.between(2, 4, arguments, FindStrRegex.name);
  start = defaults(start, null);
  return new Expr(params({ findstrregex: wrap(value), pattern: wrap(pattern) }, { start: wrap(start), num_results: wrap(numResults) }));
}

// src/query/Floor.js
function Floor(expr) {
  arity.exact(1, arguments, Floor.name);
  return new Expr({ floor: wrap(expr) });
}

// src/query/Foreach.js
function Foreach(collection, lambda_expr) {
  arity.exact(2, arguments, Foreach.name);
  return new Expr({ foreach: wrap(lambda_expr), collection: wrap(collection) });
}

// src/query/Format.js
function Format(string) {
  arity.min(1, arguments, Format.name);
  var args = argsToArray(arguments);
  args.shift();
  return new Expr({ format: wrap(string), values: wrap(varargs(args)) });
}

// src/query/Functions.js
function Functions(scope) {
  arity.max(1, arguments, Functions.name);
  scope = defaults(scope, null);
  return new Expr({ functions: wrap(scope) });
}

// src/query/Get.js
function Get(ref, ts) {
  arity.between(1, 2, arguments, Get.name);
  ts = defaults(ts, null);
  return new Expr(params({ get: wrap(ref) }, { ts: wrap(ts) }));
}

// src/query/GT.js
function GT() {
  arity.min(1, arguments, GT.name);
  return new Expr({ gt: wrap(varargs(arguments)) });
}

// src/query/GTE.js
function GTE() {
  arity.min(1, arguments, GTE.name);
  return new Expr({ gte: wrap(varargs(arguments)) });
}

// src/query/HasCurrentIdentity.js
function HasCurrentIdentity() {
  arity.exact(0, arguments, HasCurrentIdentity.name);
  return new Expr({ has_current_identity: null });
}

// src/query/HasCurrentToken.js
function HasCurrentToken() {
  arity.exact(0, arguments, HasCurrentToken.name);
  return new Expr({ has_current_token: null });
}

// src/query/HasIdentity.js
var HasIdentity_default = deprecate(function() {
  arity.exact(0, arguments, "HasIdentity");
  return new Expr({ has_identity: null });
}, "HasIdentity() is deprecated, use HasCurrentIdentity() instead");

// src/query/Hour.js
function Hour(expr) {
  arity.exact(1, arguments, Hour.name);
  return new Expr({ hour: wrap(expr) });
}

// src/query/Hypot.js
function Hypot(value, side) {
  arity.min(1, arguments, Hypot.name);
  side = defaults(side, null);
  return new Expr(params({ hypot: wrap(value) }, { b: wrap(side) }));
}

// src/query/Identify.js
function Identify(ref, password) {
  arity.exact(2, arguments, Identify.name);
  return new Expr({ identify: wrap(ref), password: wrap(password) });
}

// src/query/Identity.js
var Identity_default = deprecate(function() {
  arity.exact(0, arguments, "Identity");
  return new Expr({ identity: null });
}, "Identity() is deprecated, use CurrentIdentity() instead");

// src/query/If.js
function If(condition, then, _else) {
  arity.exact(3, arguments, If.name);
  return new Expr({ if: wrap(condition), then: wrap(then), else: wrap(_else) });
}

// src/query/Indexes.js
function Indexes(scope) {
  arity.max(1, arguments, Indexes.name);
  scope = defaults(scope, null);
  return new Expr({ indexes: wrap(scope) });
}

// src/query/Insert.js
function Insert(ref, ts, action, params2) {
  arity.exact(4, arguments, Insert.name);
  return new Expr({
    insert: wrap(ref),
    ts: wrap(ts),
    action: wrap(action),
    params: wrap(params2)
  });
}

// src/query/Intersection.js
function Intersection() {
  arity.min(1, arguments, Intersection.name);
  return new Expr({ intersection: wrap(varargs(arguments)) });
}

// src/query/IsArray.js
function IsArray(expr) {
  arity.exact(1, arguments, IsArray.name);
  return new Expr({ is_array: wrap(expr) });
}

// src/query/IsBoolean.js
function IsBoolean(expr) {
  arity.exact(1, arguments, IsBoolean.name);
  return new Expr({ is_boolean: wrap(expr) });
}

// src/query/IsBytes.js
function IsBytes(expr) {
  arity.exact(1, arguments, IsBytes.name);
  return new Expr({ is_bytes: wrap(expr) });
}

// src/query/IsCollection.js
function IsCollection(expr) {
  arity.exact(1, arguments, IsCollection.name);
  return new Expr({ is_collection: wrap(expr) });
}

// src/query/IsCredentials.js
function IsCredentials(expr) {
  arity.exact(1, arguments, IsCredentials.name);
  return new Expr({ is_credentials: wrap(expr) });
}

// src/query/IsDatabase.js
function IsDatabase(expr) {
  arity.exact(1, arguments, IsDatabase.name);
  return new Expr({ is_database: wrap(expr) });
}

// src/query/IsDate.js
function IsDate(expr) {
  arity.exact(1, arguments, IsDate.name);
  return new Expr({ is_date: wrap(expr) });
}

// src/query/IsDoc.js
function IsDoc(expr) {
  arity.exact(1, arguments, IsDoc.name);
  return new Expr({ is_doc: wrap(expr) });
}

// src/query/IsDouble.js
function IsDouble(expr) {
  arity.exact(1, arguments, IsDouble.name);
  return new Expr({ is_double: wrap(expr) });
}

// src/query/IsEmpty.js
function IsEmpty(collection) {
  arity.exact(1, arguments, IsEmpty.name);
  return new Expr({ is_empty: wrap(collection) });
}

// src/query/IsFunction.js
function IsFunction(expr) {
  arity.exact(1, arguments, IsFunction.name);
  return new Expr({ is_function: wrap(expr) });
}

// src/query/IsIndex.js
function IsIndex(expr) {
  arity.exact(1, arguments, IsIndex.name);
  return new Expr({ is_index: wrap(expr) });
}

// src/query/IsInteger.js
function IsInteger(expr) {
  arity.exact(1, arguments, IsInteger.name);
  return new Expr({ is_integer: wrap(expr) });
}

// src/query/IsKey.js
function IsKey(expr) {
  arity.exact(1, arguments, IsKey.name);
  return new Expr({ is_key: wrap(expr) });
}

// src/query/IsLambda.js
function IsLambda(expr) {
  arity.exact(1, arguments, IsLambda.name);
  return new Expr({ is_lambda: wrap(expr) });
}

// src/query/IsNonEmpty.js
function IsNonEmpty(collection) {
  arity.exact(1, arguments, IsNonEmpty.name);
  return new Expr({ is_nonempty: wrap(collection) });
}

// src/query/IsNull.js
function IsNull(expr) {
  arity.exact(1, arguments, IsNull.name);
  return new Expr({ is_null: wrap(expr) });
}

// src/query/IsNumber.js
function IsNumber(expr) {
  arity.exact(1, arguments, IsNumber.name);
  return new Expr({ is_number: wrap(expr) });
}

// src/query/IsObject.js
function IsObject(expr) {
  arity.exact(1, arguments, IsObject.name);
  return new Expr({ is_object: wrap(expr) });
}

// src/query/IsRef.js
function IsRef(expr) {
  arity.exact(1, arguments, IsRef.name);
  return new Expr({ is_ref: wrap(expr) });
}

// src/query/IsRole.js
function IsRole(expr) {
  arity.exact(1, arguments, IsRole.name);
  return new Expr({ is_role: wrap(expr) });
}

// src/query/IsSet.js
function IsSet(expr) {
  arity.exact(1, arguments, IsSet.name);
  return new Expr({ is_set: wrap(expr) });
}

// src/query/IsString.js
function IsString(expr) {
  arity.exact(1, arguments, IsString.name);
  return new Expr({ is_string: wrap(expr) });
}

// src/query/IsTimestamp.js
function IsTimestamp(expr) {
  arity.exact(1, arguments, IsTimestamp.name);
  return new Expr({ is_timestamp: wrap(expr) });
}

// src/query/IsToken.js
function IsToken(expr) {
  arity.exact(1, arguments, IsToken.name);
  return new Expr({ is_token: wrap(expr) });
}

// src/query/Join.js
function Join(source, target) {
  arity.exact(2, arguments, Join.name);
  return new Expr({ join: wrap(source), with: wrap(target) });
}

// src/query/KeyFromSecret.js
function KeyFromSecret(secret) {
  arity.exact(1, arguments, KeyFromSecret.name);
  return new Expr({ key_from_secret: wrap(secret) });
}

// src/query/Keys.js
function Keys(scope) {
  arity.max(1, arguments, Keys.name);
  scope = defaults(scope, null);
  return new Expr({ keys: wrap(scope) });
}

// src/query/Length.js
function Length(value) {
  arity.exact(1, arguments, Length.name);
  return new Expr({ length: wrap(value) });
}

// src/query/Let.js
function Let(vars, expr) {
  arity.exact(2, arguments, Let.name);
  var bindings = [];
  if (Array.isArray(vars)) {
    bindings = vars.map(function(item) {
      return wrapValues(item);
    });
  } else {
    bindings = Object.keys(vars).filter(function(k) {
      return vars[k] !== void 0;
    }).map(function(k) {
      var b = {};
      b[k] = wrap(vars[k]);
      return b;
    });
  }
  if (typeof expr === "function") {
    if (Array.isArray(vars)) {
      var expr_vars = [];
      vars.forEach(function(item) {
        Object.keys(item).forEach(function(name2) {
          expr_vars.push(Var(name2));
        });
      });
      expr = expr.apply(null, expr_vars);
    } else {
      expr = expr.apply(null, Object.keys(vars).map(function(name2) {
        return Var(name2);
      }));
    }
  }
  return new Expr({ let: bindings, in: wrap(expr) });
}

// src/query/Ln.js
function Ln(expr) {
  arity.exact(1, arguments, Ln.name);
  return new Expr({ ln: wrap(expr) });
}

// src/query/Log.js
function Log(expr) {
  arity.exact(1, arguments, Log.name);
  return new Expr({ log: wrap(expr) });
}

// src/query/Login.js
function Login(ref, params2) {
  arity.exact(2, arguments, Login.name);
  return new Expr({ login: wrap(ref), params: wrap(params2) });
}

// src/query/Logout.js
function Logout(delete_tokens) {
  arity.exact(1, arguments, Logout.name);
  return new Expr({ logout: wrap(delete_tokens) });
}

// src/query/LowerCase.js
function LowerCase(value) {
  arity.exact(1, arguments, LowerCase.name);
  return new Expr({ lowercase: wrap(value) });
}

// src/query/LT.js
function LT() {
  arity.min(1, arguments, LT.name);
  return new Expr({ lt: wrap(varargs(arguments)) });
}

// src/query/LTE.js
function LTE() {
  arity.min(1, arguments, LTE.name);
  return new Expr({ lte: wrap(varargs(arguments)) });
}

// src/query/LTrim.js
function LTrim(value) {
  arity.exact(1, arguments, LTrim.name);
  return new Expr({ ltrim: wrap(value) });
}

// src/query/Map.js
function Map2(collection, lambda_expr) {
  arity.exact(2, arguments, Map2.name);
  return new Expr({ map: wrap(lambda_expr), collection: wrap(collection) });
}

// src/query/Match.js
function Match(index) {
  arity.min(1, arguments, Match.name);
  var args = argsToArray(arguments);
  args.shift();
  return new Expr({ match: wrap(index), terms: wrap(varargs(args)) });
}

// src/query/Max.js
function Max() {
  arity.min(1, arguments, Max.name);
  return new Expr({ max: wrap(varargs(arguments)) });
}

// src/query/Mean.js
function Mean(collection) {
  arity.exact(1, arguments, Mean.name);
  return new Expr({ mean: wrap(collection) });
}

// src/query/Merge.js
function Merge(merge, _with, lambda) {
  arity.between(2, 3, arguments, Merge.name);
  return new Expr(params({ merge: wrap(merge), with: wrap(_with) }, { lambda: wrap(lambda) }));
}

// src/query/Min.js
function Min() {
  arity.min(1, arguments, Min.name);
  return new Expr({ min: wrap(varargs(arguments)) });
}

// src/query/Minute.js
function Minute(expr) {
  arity.exact(1, arguments, Minute.name);
  return new Expr({ minute: wrap(expr) });
}

// src/query/Modulo.js
function Modulo() {
  arity.min(1, arguments, Modulo.name);
  return new Expr({ modulo: wrap(varargs(arguments)) });
}

// src/query/Month.js
function Month(expr) {
  arity.exact(1, arguments, Month.name);
  return new Expr({ month: wrap(expr) });
}

// src/query/MoveDatabase.js
function MoveDatabase(from, to) {
  arity.exact(2, arguments, MoveDatabase.name);
  return new Expr({ move_database: wrap(from), to: wrap(to) });
}

// src/query/Multiply.js
function Multiply() {
  arity.min(1, arguments, Multiply.name);
  return new Expr({ multiply: wrap(varargs(arguments)) });
}

// src/query/NewId.js
function NewId() {
  arity.exact(0, arguments, NewId.name);
  return new Expr({ new_id: null });
}

// src/query/NextId.js
var NextId_default = deprecate(function() {
  arity.exact(0, arguments, "NextId");
  return new Expr({ next_id: null });
}, "NextId() is deprecated, use NewId() instead");

// src/query/NGram.js
function NGram(terms, min, max) {
  arity.between(1, 3, arguments, NGram.name);
  min = defaults(min, null);
  max = defaults(max, null);
  return new Expr(params({ ngram: wrap(terms) }, { min: wrap(min), max: wrap(max) }));
}

// src/query/Not.js
function Not(boolean) {
  arity.exact(1, arguments, Not.name);
  return new Expr({ not: wrap(boolean) });
}

// src/query/Now.js
function Now() {
  arity.exact(0, arguments, Now.name);
  return new Expr({ now: wrap(null) });
}

// src/query/Or.js
function Or() {
  arity.min(1, arguments, Or.name);
  return new Expr({ or: wrap(varargs(arguments)) });
}

// src/query/Paginate.js
function Paginate(set, opts) {
  arity.between(1, 2, arguments, Paginate.name);
  opts = defaults(opts, {});
  return new Expr(Object.assign({ paginate: wrap(set) }, wrapValues(opts)));
}

// src/query/Pow.js
function Pow(value, exponent) {
  arity.min(1, arguments, Pow.name);
  exponent = defaults(exponent, null);
  return new Expr(params({ pow: wrap(value) }, { exp: wrap(exponent) }));
}

// src/query/Prepend.js
function Prepend(elements, collection) {
  arity.exact(2, arguments, Prepend.name);
  return new Expr({ prepend: wrap(elements), collection: wrap(collection) });
}

// src/query/Query.js
function Query2(lambda) {
  arity.exact(1, arguments, Query2.name);
  return new Expr({ query: wrap(lambda) });
}

// src/query/Radians.js
function Radians(expr) {
  arity.exact(1, arguments, Radians.name);
  return new Expr({ radians: wrap(expr) });
}

// src/query/Range.js
function Range(set, from, to) {
  arity.exact(3, arguments, Range.name);
  return new Expr({ range: wrap(set), from: wrap(from), to: wrap(to) });
}

// src/query/Reduce.js
function Reduce(lambda, initial, collection) {
  arity.exact(3, arguments, Reduce.name);
  return new Expr({
    reduce: wrap(lambda),
    initial: wrap(initial),
    collection: wrap(collection)
  });
}

// src/query/Ref.js
function Ref2() {
  arity.between(1, 2, arguments, Ref2.name);
  switch (arguments.length) {
    case 1:
      return new Expr({ "@ref": wrap(arguments[0]) });
    case 2:
      return new Expr({ ref: wrap(arguments[0]), id: wrap(arguments[1]) });
  }
}

// src/query/RegexEscape.js
function RegexEscape(value) {
  arity.exact(1, arguments, RegexEscape.name);
  return new Expr({ regexescape: wrap(value) });
}

// src/query/Remove.js
function Remove(ref, ts, action) {
  arity.exact(3, arguments, Remove.name);
  return new Expr({ remove: wrap(ref), ts: wrap(ts), action: wrap(action) });
}

// src/query/Repeat.js
function Repeat(value, number) {
  arity.between(1, 2, arguments, Repeat.name);
  number = defaults(number, null);
  return new Expr(params({ repeat: wrap(value) }, { number: wrap(number) }));
}

// src/query/Replace.js
function Replace(ref, params2) {
  arity.exact(2, arguments, Replace.name);
  return new Expr({ replace: wrap(ref), params: wrap(params2) });
}

// src/query/ReplaceStr.js
function ReplaceStr(value, find, replace) {
  arity.exact(3, arguments, ReplaceStr.name);
  return new Expr({
    replacestr: wrap(value),
    find: wrap(find),
    replace: wrap(replace)
  });
}

// src/query/ReplaceStrRegex.js
function ReplaceStrRegex(value, pattern, replace, first) {
  arity.between(3, 4, arguments, ReplaceStrRegex.name);
  first = defaults(first, null);
  return new Expr(params({
    replacestrregex: wrap(value),
    pattern: wrap(pattern),
    replace: wrap(replace)
  }, { first: wrap(first) }));
}

// src/query/Reverse.js
function Reverse(expr) {
  arity.exact(1, arguments, Reverse.name);
  return new Expr({ reverse: wrap(expr) });
}

// src/query/Role.js
function Role(name2, scope) {
  arity.between(1, 2, arguments, Role.name);
  scope = defaults(scope, null);
  return new Expr(params({ role: wrap(name2) }, { scope: wrap(scope) }));
}

// src/query/Roles.js
function Roles(scope) {
  arity.max(1, arguments, Roles.name);
  scope = defaults(scope, null);
  return new Expr({ roles: wrap(scope) });
}

// src/query/Round.js
function Round(value, precision) {
  arity.min(1, arguments, Round.name);
  precision = defaults(precision, null);
  return new Expr(params({ round: wrap(value) }, { precision: wrap(precision) }));
}

// src/query/RTrim.js
function RTrim(value) {
  arity.exact(1, arguments, RTrim.name);
  return new Expr({ rtrim: wrap(value) });
}

// src/query/Second.js
function Second(expr) {
  arity.exact(1, arguments, Second.name);
  return new Expr({ second: wrap(expr) });
}

// src/query/Select.js
function Select(path, from, _default) {
  arity.between(2, 3, arguments, Select.name);
  var exprObj = { select: wrap(path), from: wrap(from) };
  if (_default !== void 0) {
    exprObj.default = wrap(_default);
  }
  return new Expr(exprObj);
}

// src/query/SelectAll.js
var SelectAll_default = deprecate(function(path, from) {
  arity.exact(2, arguments, "SelectAll");
  return new Expr({ select_all: wrap(path), from: wrap(from) });
}, "SelectAll() is deprecated. Avoid use.");

// src/query/Sign.js
function Sign(expr) {
  arity.exact(1, arguments, Sign.name);
  return new Expr({ sign: wrap(expr) });
}

// src/query/Sin.js
function Sin(expr) {
  arity.exact(1, arguments, Sin.name);
  return new Expr({ sin: wrap(expr) });
}

// src/query/Singleton.js
function Singleton(ref) {
  arity.exact(1, arguments, Singleton.name);
  return new Expr({ singleton: wrap(ref) });
}

// src/query/Sinh.js
function Sinh(expr) {
  arity.exact(1, arguments, Sinh.name);
  return new Expr({ sinh: wrap(expr) });
}

// src/query/Space.js
function Space(num) {
  arity.exact(1, arguments, Space.name);
  return new Expr({ space: wrap(num) });
}

// src/query/Sqrt.js
function Sqrt(expr) {
  arity.exact(1, arguments, Sqrt.name);
  return new Expr({ sqrt: wrap(expr) });
}

// src/query/StartsWith.js
function StartsWith(value, search) {
  arity.exact(2, arguments, StartsWith.name);
  return new Expr({ startswith: wrap(value), search: wrap(search) });
}

// src/query/SubString.js
function SubString(value, start, length) {
  arity.between(1, 3, arguments, SubString.name);
  start = defaults(start, null);
  length = defaults(length, null);
  return new Expr(params({ substring: wrap(value) }, { start: wrap(start), length: wrap(length) }));
}

// src/query/Subtract.js
function Subtract() {
  arity.min(1, arguments, Subtract.name);
  return new Expr({ subtract: wrap(varargs(arguments)) });
}

// src/query/Sum.js
function Sum(collection) {
  arity.exact(1, arguments, Sum.name);
  return new Expr({ sum: wrap(collection) });
}

// src/query/Take.js
function Take(number, collection) {
  arity.exact(2, arguments, Take.name);
  return new Expr({ take: wrap(number), collection: wrap(collection) });
}

// src/query/Tan.js
function Tan(expr) {
  arity.exact(1, arguments, Tan.name);
  return new Expr({ tan: wrap(expr) });
}

// src/query/Tanh.js
function Tanh(expr) {
  arity.exact(1, arguments, Tanh.name);
  return new Expr({ tanh: wrap(expr) });
}

// src/query/Time.js
function Time(string) {
  arity.exact(1, arguments, Time.name);
  return new Expr({ time: wrap(string) });
}

// src/query/TimeAdd.js
function TimeAdd(base, offset, unit) {
  arity.exact(3, arguments, TimeAdd.name);
  return new Expr({
    time_add: wrap(base),
    offset: wrap(offset),
    unit: wrap(unit)
  });
}

// src/query/TimeDiff.js
function TimeDiff(start, finish, unit) {
  arity.exact(3, arguments, TimeDiff.name);
  return new Expr({
    time_diff: wrap(start),
    other: wrap(finish),
    unit: wrap(unit)
  });
}

// src/query/TimeSubtract.js
function TimeSubtract(base, offset, unit) {
  arity.exact(3, arguments, TimeSubtract.name);
  return new Expr({
    time_subtract: wrap(base),
    offset: wrap(offset),
    unit: wrap(unit)
  });
}

// src/query/TitleCase.js
function TitleCase(value) {
  arity.exact(1, arguments, TitleCase.name);
  return new Expr({ titlecase: wrap(value) });
}

// src/query/ToArray.js
function ToArray(expr) {
  arity.exact(1, arguments, ToArray.name);
  return new Expr({ to_array: wrap(expr) });
}

// src/query/ToDate.js
function ToDate(expr) {
  arity.exact(1, arguments, ToDate.name);
  return new Expr({ to_date: wrap(expr) });
}

// src/query/ToDouble.js
function ToDouble(expr) {
  arity.exact(1, arguments, ToDouble.name);
  return new Expr({ to_double: wrap(expr) });
}

// src/query/ToInteger.js
function ToInteger(expr) {
  arity.exact(1, arguments, ToInteger.name);
  return new Expr({ to_integer: wrap(expr) });
}

// src/query/Tokens.js
function Tokens(scope) {
  arity.max(1, arguments, Tokens.name);
  scope = defaults(scope, null);
  return new Expr({ tokens: wrap(scope) });
}

// src/query/ToMicros.js
function ToMicros(expr) {
  arity.exact(1, arguments, ToMicros.name);
  return new Expr({ to_micros: wrap(expr) });
}

// src/query/ToMillis.js
function ToMillis(expr) {
  arity.exact(1, arguments, ToMillis.name);
  return new Expr({ to_millis: wrap(expr) });
}

// src/query/ToNumber.js
function ToNumber(expr) {
  arity.exact(1, arguments, ToNumber.name);
  return new Expr({ to_number: wrap(expr) });
}

// src/query/ToObject.js
function ToObject(expr) {
  arity.exact(1, arguments, ToObject.name);
  return new Expr({ to_object: wrap(expr) });
}

// src/query/ToSeconds.js
function ToSeconds(expr) {
  arity.exact(1, arguments, ToSeconds.name);
  return new Expr({ to_seconds: wrap(expr) });
}

// src/query/ToString.js
function ToString(expr) {
  arity.exact(1, arguments, ToString.name);
  return new Expr({ to_string: wrap(expr) });
}

// src/query/ToTime.js
function ToTime(expr) {
  arity.exact(1, arguments, ToTime.name);
  return new Expr({ to_time: wrap(expr) });
}

// src/query/Trim.js
function Trim(value) {
  arity.exact(1, arguments, Trim.name);
  return new Expr({ trim: wrap(value) });
}

// src/query/Trunc.js
function Trunc(value, precision) {
  arity.min(1, arguments, Trunc.name);
  precision = defaults(precision, null);
  return new Expr(params({ trunc: wrap(value) }, { precision: wrap(precision) }));
}

// src/query/Union.js
function Union() {
  arity.min(1, arguments, Union.name);
  return new Expr({ union: wrap(varargs(arguments)) });
}

// src/query/Update.js
function Update(ref, params2) {
  arity.exact(2, arguments, Update.name);
  return new Expr({ update: wrap(ref), params: wrap(params2) });
}

// src/query/UpperCase.js
function UpperCase(value) {
  arity.exact(1, arguments, UpperCase.name);
  return new Expr({ uppercase: wrap(value) });
}

// src/query/Year.js
function Year(expr) {
  arity.exact(1, arguments, Year.name);
  return new Expr({ year: wrap(expr) });
}

// src/PageHelper.js
"use strict";
function PageHelper(client, set, params2, options) {
  if (params2 === void 0) {
    params2 = {};
  }
  if (options === void 0) {
    options = {};
  }
  this.reverse = false;
  this.params = {};
  this.before = void 0;
  this.after = void 0;
  Object.assign(this.params, params2);
  var cursorParams = this.params.cursor || this.params;
  if ("before" in cursorParams) {
    this.before = cursorParams.before;
    delete cursorParams.before;
  } else if ("after" in cursorParams) {
    this.after = cursorParams.after;
    delete cursorParams.after;
  }
  this.options = {};
  Object.assign(this.options, options);
  this.client = client;
  this.set = set;
  this._faunaFunctions = [];
}
PageHelper.prototype.map = function(lambda) {
  var rv = this._clone();
  rv._faunaFunctions.push(function(q) {
    return Map2(q, lambda);
  });
  return rv;
};
PageHelper.prototype.filter = function(lambda) {
  var rv = this._clone();
  rv._faunaFunctions.push(function(q) {
    return Filter(q, lambda);
  });
  return rv;
};
PageHelper.prototype.each = function(lambda) {
  return this._retrieveNextPage(this.after, false).then(this._consumePages(lambda, false));
};
PageHelper.prototype.eachReverse = function(lambda) {
  return this._retrieveNextPage(this.before, true).then(this._consumePages(lambda, true));
};
PageHelper.prototype.previousPage = function() {
  var self2 = this;
  return this._retrieveNextPage(this.before, true).then(this._adjustCursors.bind(self2));
};
PageHelper.prototype.nextPage = function() {
  var self2 = this;
  return this._retrieveNextPage(this.after, false).then(this._adjustCursors.bind(self2));
};
PageHelper.prototype._adjustCursors = function(page) {
  if (page.after !== void 0) {
    this.after = page.after;
  }
  if (page.before !== void 0) {
    this.before = page.before;
  }
  return page.data;
};
PageHelper.prototype._consumePages = function(lambda, reverse) {
  var self2 = this;
  return function(page) {
    lambda(page.data);
    var nextCursor;
    if (reverse) {
      nextCursor = page.before;
    } else {
      nextCursor = page.after;
    }
    if (nextCursor !== void 0) {
      return self2._retrieveNextPage(nextCursor, reverse).then(self2._consumePages(lambda, reverse));
    } else {
      return Promise.resolve();
    }
  };
};
PageHelper.prototype._retrieveNextPage = function(cursor, reverse) {
  var opts = {};
  Object.assign(opts, this.params);
  var cursorOpts = opts.cursor || opts;
  if (cursor !== void 0) {
    if (reverse) {
      cursorOpts.before = cursor;
    } else {
      cursorOpts.after = cursor;
    }
  } else {
    if (reverse) {
      cursorOpts.before = null;
    }
  }
  var q = Paginate(this.set, opts);
  if (this._faunaFunctions.length > 0) {
    this._faunaFunctions.forEach(function(lambda) {
      q = lambda(q);
    });
  }
  return this.client.query(q, this.options);
};
PageHelper.prototype._clone = function() {
  return Object.create(PageHelper.prototype, {
    client: { value: this.client },
    set: { value: this.set },
    _faunaFunctions: { value: this._faunaFunctions },
    before: { value: this.before },
    after: { value: this.after },
    params: { value: this.params }
  });
};

// src/RequestResult.js
"use strict";
function RequestResult(method, path, query, requestRaw, requestContent, responseRaw, responseContent, statusCode, responseHeaders, startTime, endTime) {
  this.method = method;
  this.path = path;
  this.query = query;
  this.requestRaw = requestRaw;
  this.requestContent = requestContent;
  this.responseRaw = responseRaw;
  this.responseContent = responseContent;
  this.statusCode = statusCode;
  this.responseHeaders = responseHeaders;
  this.startTime = startTime;
  this.endTime = endTime;
}
Object.defineProperty(RequestResult.prototype, "timeTaken", {
  get: function() {
    return this.endTime - this.startTime;
  }
});

// src/_http/fetchAdapter.js
"use strict";
function FetchAdapter(options) {
  options = options || {};
  this.type = "fetch";
  this._closed = false;
  this._pendingRequests = new Map();
}
FetchAdapter.prototype.execute = function(options) {
  if (this._closed) {
    return Promise.reject(new ClientClosed("The Client has already been closed", "No subsequent requests can be issued after the .close method is called. Consider creating a new Client instance"));
  }
  var self2 = this;
  var timerId = null;
  var isStreaming = options.streamConsumer != null;
  var useTimeout = !options.signal && !!options.queryTimeout;
  var ctrl = new AbortController();
  var pendingRequest = {
    isStreaming,
    isAbortedByClose: false,
    onComplete: null
  };
  self2._pendingRequests.set(ctrl, pendingRequest);
  var onComplete = function() {
    self2._pendingRequests.delete(ctrl);
    if (options.signal) {
      options.signal.removeEventListener("abort", onAbort);
    }
    if (pendingRequest.onComplete) {
      pendingRequest.onComplete();
    }
  };
  var onSettle = function() {
    if (timerId) {
      clearTimeout(timerId);
    }
  };
  var onResponse = function(response) {
    onSettle();
    var headers = responseHeadersAsObject(response.headers);
    var processStream = isStreaming && response.ok;
    if (!processStream) {
      onComplete();
      return response.text().then(function(content) {
        return {
          body: content,
          headers,
          status: response.status
        };
      });
    }
    attachStreamConsumer(response, options.streamConsumer, onComplete);
    return {
      body: "[stream]",
      headers,
      status: response.status
    };
  };
  var onError = function(error) {
    onSettle();
    onComplete();
    return Promise.reject(remapIfAbortError(error, function() {
      if (!isStreaming && pendingRequest.isAbortedByClose) {
        return new ClientClosed("The request is aborted due to the Client#close call with the force=true option");
      }
      return useTimeout ? new TimeoutError() : new AbortError();
    }));
  };
  var onAbort = function() {
    ctrl.abort();
  };
  if (useTimeout) {
    timerId = setTimeout(function() {
      timerId = null;
      ctrl.abort();
    }, options.queryTimeout);
  }
  if (options.signal) {
    options.signal.addEventListener("abort", onAbort);
  }
  return fetch(formatUrl(options.origin, options.path, options.query), {
    method: options.method,
    headers: options.headers,
    body: options.body,
    signal: ctrl.signal
  }).then(onResponse).catch(onError);
};
FetchAdapter.prototype.close = function(opts) {
  opts = opts || {};
  this._closed = true;
  var promises = [];
  var abortOrWait = function(pendingRequest, ctrl) {
    var shouldAbort = pendingRequest.isStreaming || opts.force;
    if (shouldAbort) {
      pendingRequest.isAbortedByClose = true;
      return ctrl.abort();
    }
    promises.push(new Promise(function(resolve) {
      pendingRequest.onComplete = resolve;
    }));
  };
  this._pendingRequests.forEach(abortOrWait);
  var noop = function() {
  };
  return Promise.all(promises).then(noop);
};
function attachStreamConsumer(response, consumer, onComplete) {
  var onError = function(error) {
    onComplete();
    consumer.onError(remapIfAbortError(error));
  };
  try {
    let pump = function() {
      return reader.read().then(function(msg) {
        if (!msg.done) {
          var chunk = decoder.decode(msg.value, { stream: true });
          consumer.onData(chunk);
          return pump();
        }
        onComplete();
        consumer.onError(new TypeError("network error"));
      });
    };
    var reader = response.body.getReader();
    var decoder = new TextDecoder("utf-8");
    pump().catch(onError);
  } catch (err) {
    throw new StreamsNotSupported("Please, consider providing a Fetch API-compatible function with streamable response bodies. " + err);
  }
}
function remapIfAbortError(error, errorFactory) {
  var isAbortError = error && error.name === "AbortError";
  if (!isAbortError) {
    return error;
  }
  if (errorFactory) {
    return errorFactory();
  }
  return new AbortError();
}
function responseHeadersAsObject(headers) {
  var result = {};
  for (var header of headers.entries()) {
    var key = header[0];
    var value = header[1];
    result[key] = value;
  }
  return result;
}

// src/_http/index.js
"use strict";
function HttpClient(options) {
  var isHttps = options.scheme === "https";
  if (!options.port) {
    options.port = isHttps ? 443 : 80;
  }
  this._adapter = new FetchAdapter({
    isHttps,
    fetch: options.fetch,
    keepAlive: options.keepAlive
  });
  if (options.endpoint === null) {
    this._baseUrl = options.scheme + "://" + options.domain + ":" + options.port;
  } else {
    this._baseUrl = options.endpoint;
  }
  this._secret = options.secret;
  this._headers = Object.assign({}, options.headers, getDefaultHeaders());
  this._lastSeen = null;
  this._queryTimeout = options.queryTimeout;
}
HttpClient.prototype.getLastTxnTime = function() {
  return this._lastSeen;
};
HttpClient.prototype.syncLastTxnTime = function(time) {
  if (this._lastSeen == null || this._lastSeen < time) {
    this._lastSeen = time;
  }
};
HttpClient.prototype.close = function(opts) {
  return this._adapter.close(opts);
};
HttpClient.prototype.execute = function(options) {
  options = options || {};
  var invalidStreamConsumer = options.streamConsumer && (typeof options.streamConsumer.onData !== "function" || typeof options.streamConsumer.onError !== "function");
  if (invalidStreamConsumer) {
    return Promise.reject(new TypeError('Invalid "streamConsumer" provided'));
  }
  var secret = options.secret || this._secret;
  var queryTimeout = options.queryTimeout || this._queryTimeout;
  var headers = this._headers;
  var traceparent = isValidTraceparentHeader(options.traceparent) ? options.traceparent : null;
  headers["Authorization"] = secret && secretHeader(secret);
  headers["X-Last-Seen-Txn"] = this._lastSeen;
  headers["X-Query-Timeout"] = queryTimeout;
  headers["traceparent"] = traceparent;
  headers["x-fauna-tags"] = parseTags(options.tags);
  return this._adapter.execute({
    origin: this._baseUrl,
    path: options.path || "/",
    query: options.query,
    method: options.method || "GET",
    headers: removeNullAndUndefinedValues(headers),
    body: options.body,
    signal: options.signal,
    queryTimeout: this._queryTimeout,
    streamConsumer: options.streamConsumer
  });
};
function isValidTraceparentHeader(traceparentHeader) {
  return /^[\da-f]{2}-[\da-f]{32}-[\da-f]{16}-[\da-f]{2}$/.test(traceparentHeader);
}
function parseTags(tags) {
  if (tags === void 0 || tags == null || tags == "")
    return null;
  validateTags(tags);
  return Object.entries(tags).map((e) => e.join("=")).join(",");
}
function validateTags(tags) {
  if (typeof tags != "object") {
    throw new Error("Tags must be provided as an object!");
  }
}
function secretHeader(secret) {
  return "Bearer " + secret;
}
function getDefaultHeaders() {
  var driverEnv = {
    driver: ["javascript", package_default.version].join("-")
  };
  var isServiceWorker;
  try {
    isServiceWorker = global instanceof ServiceWorkerGlobalScope;
  } catch (error) {
    isServiceWorker = false;
  }
  try {
    if (typeof Deno !== void 0) {
      driverEnv.runtime = "Deno";
      driverEnv.env = "Deno";
    } else if (isServiceWorker) {
      driverEnv.runtime = "Service Worker";
    } else {
      driverEnv.runtime = getBrowserDetails();
      driverEnv.env = "browser";
      driverEnv.os = getBrowserOsDetails();
    }
  } catch (_) {
  }
  var headers = {
    "X-FaunaDB-API-Version": package_default.apiVersion
  };
  return headers;
}

// src/_json.js
"use strict";
function toJSON(object, pretty) {
  pretty = typeof pretty !== "undefined" ? pretty : false;
  if (pretty) {
    return JSON.stringify(object, null, "  ");
  } else {
    return JSON.stringify(object);
  }
}
function parseJSON(json) {
  return JSON.parse(json, json_parse);
}
function json_parse(_, val) {
  if (typeof val !== "object" || val === null) {
    return val;
  } else if ("@ref" in val) {
    var ref = val["@ref"];
    if (!("collection" in ref) && !("database" in ref)) {
      return Native.fromName(ref["id"]);
    }
    var col = json_parse("collection", ref["collection"]);
    var db = json_parse("database", ref["database"]);
    return new Ref(ref["id"], col, db);
  } else if ("@obj" in val) {
    return val["@obj"];
  } else if ("@set" in val) {
    return new SetRef(val["@set"]);
  } else if ("@ts" in val) {
    return new FaunaTime(val["@ts"]);
  } else if ("@date" in val) {
    return new FaunaDate(val["@date"]);
  } else if ("@bytes" in val) {
    return new Bytes(val["@bytes"]);
  } else if ("@query" in val) {
    return new Query(val["@query"]);
  } else {
    return val;
  }
}

// src/Client.js
"use strict";
var notifyIfNewVersion = notifyAboutNewVersion();
function Client(options) {
  const http2SessionIdleTime = getHttp2SessionIdleTime(options ? options.http2SessionIdleTime : void 0);
  options = applyDefaults(options, {
    endpoint: null,
    domain: "db.fauna.com",
    scheme: "https",
    port: null,
    secret: null,
    observer: null,
    keepAlive: true,
    headers: {},
    fetch: void 0,
    queryTimeout: null,
    http2SessionIdleTime,
    checkNewVersion: false
  });
  this._observer = options.observer;
  this._http = new HttpClient(options);
}
Client.apiVersion = package_default.apiVersion;
Client.prototype.query = function(expression, options) {
  arity.between(1, 2, arguments, "Client.prototype.query");
  options = Object.assign({}, this._globalQueryOptions, options);
  return this._execute("POST", "", wrap(expression), null, options);
};
Client.prototype.paginate = function(expression, params2, options) {
  params2 = defaults(params2, {});
  options = defaults(options, {});
  return new PageHelper(this, expression, params2, options);
};
Client.prototype.ping = function(scope, timeout) {
  return this._execute("GET", "ping", null, { scope, timeout });
};
Client.prototype.getLastTxnTime = function() {
  return this._http.getLastTxnTime();
};
Client.prototype.syncLastTxnTime = function(time) {
  this._http.syncLastTxnTime(time);
};
Client.prototype.close = function(opts) {
  return this._http.close(opts);
};
Client.prototype.queryWithMetrics = function(expression, options) {
  arity.between(1, 2, arguments, "Client.prototype.query");
  return this._execute("POST", "", wrap(expression), null, options, true);
};
Client.prototype._execute = function(method, path, data, query, options, returnMetrics = false) {
  query = defaults(query, null);
  if (path instanceof Ref || checkInstanceHasProperty(path, "_isFaunaRef")) {
    path = path.value;
  }
  if (query !== null) {
    query = removeUndefinedValues(query);
  }
  var startTime = Date.now();
  var self2 = this;
  var body = ["GET", "HEAD"].indexOf(method) >= 0 ? void 0 : JSON.stringify(data);
  return this._http.execute(Object.assign({}, options, {
    path,
    query,
    method,
    body
  })).then(function(response) {
    var endTime = Date.now();
    var responseObject = parseJSON(response.body);
    var result = new RequestResult(method, path, query, body, data, response.body, responseObject, response.status, response.headers, startTime, endTime);
    self2._handleRequestResult(response, result, options);
    const metricsHeaders = [
      "x-compute-ops",
      "x-byte-read-ops",
      "x-byte-write-ops",
      "x-query-time",
      "x-txn-retries"
    ];
    if (returnMetrics) {
      return {
        value: responseObject["resource"],
        metrics: Object.fromEntries(Array.from(Object.entries(response.headers)).filter(([k, v]) => metricsHeaders.includes(k)).map(([k, v]) => [k, parseInt(v)]))
      };
    } else {
      return responseObject["resource"];
    }
  });
};
Client.prototype._handleRequestResult = function(response, result, options) {
  var txnTimeHeaderKey = "x-txn-time";
  if (response.headers[txnTimeHeaderKey] != null) {
    this.syncLastTxnTime(parseInt(response.headers[txnTimeHeaderKey], 10));
  }
  var observers = [this._observer, options && options.observer];
  observers.forEach((observer) => {
    if (typeof observer == "function") {
      observer(result, this);
    }
  });
  FaunaHTTPError.raiseForStatusCode(result);
};
function getHttp2SessionIdleTime(configuredIdleTime) {
  const maxIdleTime = 5e3;
  const defaultIdleTime = 500;
  const envIdleTime = getEnvVariable("FAUNADB_HTTP2_SESSION_IDLE_TIME");
  var value = defaultIdleTime;
  const values = [envIdleTime, configuredIdleTime];
  for (const rawValue of values) {
    const parsedValue = rawValue === "Infinity" ? Number.MAX_SAFE_INTEGER : parseInt(rawValue, 10);
    const isNegative = parsedValue < 0;
    const isGreaterThanMax = parsedValue > maxIdleTime;
    if (isNegative || !parsedValue)
      continue;
    value = parsedValue;
    if (isGreaterThanMax)
      value = maxIdleTime;
    break;
  }
  return value;
}

// src/clientLogger.js
"use strict";
function logger(loggerFunction) {
  return function(requestResult, client) {
    return loggerFunction(showRequestResult(requestResult), client);
  };
}
function showRequestResult(requestResult) {
  var query = requestResult.query, method = requestResult.method, path = requestResult.path, requestContent = requestResult.requestContent, responseHeaders = requestResult.responseHeaders, responseContent = requestResult.responseContent, statusCode = requestResult.statusCode, timeTaken = requestResult.timeTaken;
  var out = "";
  function log(str) {
    out = out + str;
  }
  log("Fauna " + method + " /" + path + _queryString(query) + "\n");
  if (requestContent != null) {
    log("  Request JSON: " + _showJSON(requestContent) + "\n");
  }
  log("  Response headers: " + _showJSON(responseHeaders) + "\n");
  log("  Response JSON: " + _showJSON(responseContent) + "\n");
  log("  Response (" + statusCode + "): Network latency " + timeTaken + "ms\n");
  return out;
}
function _indent(str) {
  var indentStr = "  ";
  return str.split("\n").join("\n" + indentStr);
}
function _showJSON(object) {
  return _indent(toJSON(object, true));
}
function _queryString(query) {
  if (query == null) {
    return "";
  }
  var keys = Object.keys(query);
  if (keys.length === 0) {
    return "";
  }
  var pairs = keys.map(function(key) {
    return key + "=" + query[key];
  });
  return "?" + pairs.join("&");
}
export {
  AbortError,
  BadGateway,
  BadRequest,
  Bytes,
  Client,
  ClientClosed,
  Conflict,
  Expr,
  FaunaDate,
  FaunaError,
  FaunaHTTPError,
  FaunaTime,
  FunctionCallError,
  InternalError,
  InvalidArity,
  InvalidValue,
  MethodNotAllowed,
  Native,
  NotFound,
  PageHelper,
  PayloadTooLarge,
  PermissionDenied,
  ProcessingTimeLimitExceeded,
  Query,
  Ref,
  RequestResult,
  SetRef,
  StreamError,
  StreamErrorEvent,
  StreamsNotSupported,
  TimeoutError,
  TooManyRequests,
  Unauthorized,
  UnavailableError,
  ValidationError,
  Value,
  errorClassFactory,
  getQueryError,
  logger,
  query_exports as query,
  setDeprecationHandler,
  showRequestResult,
  parseJSON
};
