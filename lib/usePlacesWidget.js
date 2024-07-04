"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePlacesWidget;
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash.debounce"));
var _utils = require("./utils");
var _constants = require("./constants");
var _excluded = ["types", "componentRestrictions", "fields", "bounds"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function useGoogleMapsApi(config) {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isApiLoaded = _useState2[0],
    setApiLoaded = _useState2[1];
  var loadGoogleMapsApi = function loadGoogleMapsApi(url) {
    if (!window.google) {
      var script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', function () {
        // The Google Maps API has been loaded and is now available
        setApiLoaded(true);
      });
      document.body.appendChild(script);
    } else {
      setApiLoaded(true);
    }
  };
  var debouncedFunction = (0, _react.useCallback)((0, _lodash.default)(function (url) {
    loadGoogleMapsApi(url);
  }, config.debounce),
  // Adjust the debounce delay as needed
  []);
  (0, _react.useEffect)(function () {
    if (config.url) {
      debouncedFunction(config.url);
    }
    return function () {
      debouncedFunction.cancel();
    };
  }, [config, debouncedFunction]);
  return isApiLoaded;
}
function usePlacesWidget(props) {
  var ref = props.ref,
    onPlaceSelected = props.onPlaceSelected,
    apiKey = props.apiKey,
    _props$libraries = props.libraries,
    libraries = _props$libraries === void 0 ? "places" : _props$libraries,
    _props$inputAutocompl = props.inputAutocompleteValue,
    inputAutocompleteValue = _props$inputAutocompl === void 0 ? "new-password" : _props$inputAutocompl,
    _props$debounce = props.debounce,
    debounce = _props$debounce === void 0 ? 500 : _props$debounce,
    _props$options = props.options,
    _props$options2 = _props$options === void 0 ? {} : _props$options,
    _props$options2$types = _props$options2.types,
    types = _props$options2$types === void 0 ? ["(cities)"] : _props$options2$types,
    componentRestrictions = _props$options2.componentRestrictions,
    _props$options2$field = _props$options2.fields,
    fields = _props$options2$field === void 0 ? ["address_components", "geometry.location", "place_id", "formatted_address"] : _props$options2$field,
    bounds = _props$options2.bounds,
    options = _objectWithoutProperties(_props$options2, _excluded),
    _props$googleMapsScri = props.googleMapsScriptBaseUrl,
    googleMapsScriptBaseUrl = _props$googleMapsScri === void 0 ? _constants.GOOGLE_MAP_SCRIPT_BASE_URL : _props$googleMapsScri,
    language = props.language;
  var inputRef = (0, _react.useRef)(null);
  var event = (0, _react.useRef)(null);
  var autocompleteRef = (0, _react.useRef)(null);
  var observerHack = (0, _react.useRef)(null);
  var languageQueryParam = language ? "&language=".concat(language) : "";
  var googleMapsScriptUrl = "".concat(googleMapsScriptBaseUrl, "?libraries=").concat(libraries, "&key=").concat(apiKey).concat(languageQueryParam, "&loading=async");

  // const handleLoadScript = useCallback(
  //   () => loadGoogleMapScript(googleMapsScriptBaseUrl, googleMapsScriptUrl),
  //   [googleMapsScriptBaseUrl, googleMapsScriptUrl]
  // );

  var isLoaded = useGoogleMapsApi({
    url: googleMapsScriptUrl,
    debounce: debounce
  });
  (0, _react.useEffect)(function () {
    var config = _objectSpread(_objectSpread({}, options), {}, {
      fields: fields,
      types: types,
      bounds: bounds
    });
    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }
    if (autocompleteRef.current || !inputRef.current || !_utils.isBrowser) return;
    if (ref && !ref.current) ref.current = inputRef.current;
    var handleAutoComplete = function handleAutoComplete() {
      var _google$maps;
      if (typeof google === "undefined") return console.error("Google has not been found. Make sure your provide apiKey prop.");
      if (!((_google$maps = google.maps) !== null && _google$maps !== void 0 && _google$maps.places)) return console.error("Google maps places API must be loaded.");
      if (!inputRef.current instanceof HTMLInputElement) return console.error("Input ref must be HTMLInputElement.");
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, config);
      if (autocompleteRef.current) {
        event.current = autocompleteRef.current.addListener("place_changed", function () {
          if (onPlaceSelected && autocompleteRef && autocompleteRef.current) {
            onPlaceSelected(autocompleteRef.current.getPlace(), inputRef.current, autocompleteRef.current);
          }
        });
      }
    };
    if (isLoaded) {
      handleAutoComplete();
    }
    return function () {
      return event.current ? event.current.remove() : undefined;
    };
  }, [isLoaded]);

  // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445
  (0, _react.useEffect)(function () {
    var _React$version;
    // TODO find out why react 18(strict mode) hangs the page loading
    if (!(_react.default !== null && _react.default !== void 0 && (_React$version = _react.default.version) !== null && _React$version !== void 0 && _React$version.startsWith("18")) && _utils.isBrowser && window.MutationObserver && inputRef.current && inputRef.current instanceof HTMLInputElement) {
      observerHack.current = new MutationObserver(function () {
        observerHack.current.disconnect();
        if (inputRef.current) {
          inputRef.current.autocomplete = inputAutocompleteValue;
        }
      });
      observerHack.current.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ["autocomplete"]
      });
    }
  }, [inputAutocompleteValue]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setFields(fields);
    }
  }, [fields]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setBounds(bounds);
    }
  }, [bounds]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setComponentRestrictions(componentRestrictions);
    }
  }, [componentRestrictions]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setOptions(options);
    }
  }, [options]);
  return {
    ref: inputRef,
    autocompleteRef: autocompleteRef
  };
}