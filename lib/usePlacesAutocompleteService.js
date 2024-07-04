"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePlacesAutocompleteService;
var _react = require("react");
var _lodash = _interopRequireDefault(require("lodash.debounce"));
var _utils = require("./utils");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function usePlacesAutocompleteService(_ref) {
  var apiKey = _ref.apiKey,
    _ref$libraries = _ref.libraries,
    libraries = _ref$libraries === void 0 ? "places" : _ref$libraries,
    _ref$googleMapsScript = _ref.googleMapsScriptBaseUrl,
    googleMapsScriptBaseUrl = _ref$googleMapsScript === void 0 ? _constants.GOOGLE_MAP_SCRIPT_BASE_URL : _ref$googleMapsScript,
    _ref$debounce = _ref.debounce,
    debounce = _ref$debounce === void 0 ? 300 : _ref$debounce,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options,
    sessionToken = _ref.sessionToken,
    language = _ref.language;
  var languageQueryParam = language ? "&language=".concat(language) : "";
  var googleMapsScriptUrl = "".concat(googleMapsScriptBaseUrl, "?key=").concat(apiKey, "&libraries=").concat(libraries).concat(languageQueryParam);
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    placePredictions = _useState2[0],
    setPlacePredictions = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isPlacePredsLoading = _useState4[0],
    setIsPlacePredsLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    placeInputValue = _useState6[0],
    setPlaceInputValue = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isQueryPredsLoading = _useState8[0],
    setIsQueryPredsLoading = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    queryInputValue = _useState10[0],
    setQueryInputValue = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    queryPredictions = _useState12[0],
    setQueryPredictions = _useState12[1];
  var placesAutocompleteService = (0, _react.useRef)(null);
  var placesService = (0, _react.useRef)(null);
  var autocompleteSession = (0, _react.useRef)(null);
  var handleLoadScript = (0, _react.useCallback)(function () {
    return (0, _utils.loadGoogleMapScript)(googleMapsScriptBaseUrl, googleMapsScriptUrl);
  }, [googleMapsScriptBaseUrl, googleMapsScriptUrl]);
  var debouncedPlacePredictions = (0, _react.useCallback)((0, _lodash.default)(function (optionsArg) {
    if (placesAutocompleteService.current && optionsArg.input) placesAutocompleteService.current.getPlacePredictions(_objectSpread(_objectSpread(_objectSpread({}, sessionToken && autocompleteSession.current ? {
      sessionToken: autocompleteSession.current
    } : {}), options), optionsArg), function (r) {
      setIsPlacePredsLoading(false);
      setPlacePredictions(r || []);
    });
  }, debounce), [debounce]);
  var debouncedQueryPredictions = (0, _react.useCallback)((0, _lodash.default)(function (optionsArg) {
    if (placesAutocompleteService.current && optionsArg.input) placesAutocompleteService.current.getQueryPredictions(_objectSpread(_objectSpread(_objectSpread({}, sessionToken && autocompleteSession.current ? {
      sessionToken: autocompleteSession.current
    } : {}), options), optionsArg), function (r) {
      setIsQueryPredsLoading(false);
      setQueryPredictions(r || []);
    });
  }, debounce), [debounce]);
  (0, _react.useEffect)(function () {
    if (!_utils.isBrowser) return;
    var buildService = function buildService() {
      // eslint-disable-next-line no-undef
      if (!google) return console.error("Google has not been found. Make sure your provide apiKey prop.");

      // eslint-disable-next-line no-undef
      placesAutocompleteService.current = new google.maps.places.AutocompleteService();

      // eslint-disable-next-line no-undef
      placesService.current = new google.maps.places.PlacesService(document.createElement("div"));
      if (sessionToken) autocompleteSession.current = new google.maps.places.AutocompleteSessionToken();
    };
    if (apiKey) {
      handleLoadScript().then(function () {
        return buildService();
      });
    } else {
      buildService();
    }
  }, []);
  return {
    placesService: placesService.current,
    autocompleteSessionToken: autocompleteSession.current,
    placesAutocompleteService: placesAutocompleteService.current,
    placePredictions: placeInputValue ? placePredictions : [],
    isPlacePredictionsLoading: isPlacePredsLoading,
    getPlacePredictions: function getPlacePredictions(opt) {
      if (opt.input) {
        setPlaceInputValue(opt.input);
        setIsPlacePredsLoading(true);
        debouncedPlacePredictions(opt);
        return;
      }
      setPlacePredictions([]);
      setPlaceInputValue(null);
      debouncedPlacePredictions(opt);
      setIsPlacePredsLoading(false);
    },
    queryPredictions: queryInputValue ? queryPredictions : [],
    isQueryPredictionsLoading: isQueryPredsLoading,
    getQueryPredictions: function getQueryPredictions(opt) {
      if (opt.input) {
        setQueryInputValue(opt.input);
        setIsQueryPredsLoading(true);
        debouncedQueryPredictions(opt);
        return;
      }
      setQueryPredictions([]);
      setQueryInputValue(null);
      debouncedQueryPredictions(opt);
      setIsQueryPredsLoading(false);
    },
    refreshSessionToken: function refreshSessionToken() {
      autocompleteSession.current = new google.maps.places.AutocompleteSessionToken();
    }
  };
}