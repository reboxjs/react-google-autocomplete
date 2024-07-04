import React, { useEffect, useRef, useCallback, useState } from "react";
import debounceFn from "lodash.debounce";
import { loadGoogleMapScript, isBrowser } from "./utils";
import { GOOGLE_MAP_SCRIPT_BASE_URL } from "./constants";

function useGoogleMapsApi(config) {
  const [isApiLoaded, setApiLoaded] = useState(false);
  
  const loadGoogleMapsApi = (url) => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => {
        // The Google Maps API has been loaded and is now available
        setApiLoaded(true);
      });
      document.body.appendChild(script);
    } else {
      setApiLoaded(true);
    }
  };

  const debouncedFunction = useCallback(
    debounceFn((url) => {
      loadGoogleMapsApi(url)
    }, config.debounce), // Adjust the debounce delay as needed
    []
  );

  useEffect(() => {
    if (config.url) {
      debouncedFunction(config.url);
    }

    return () => {
      debouncedFunction.cancel();
    };
  }, [config, debouncedFunction]);

  return isApiLoaded;
}

export default function usePlacesWidget(props) {
  const {
    ref,
    onPlaceSelected,
    apiKey,
    libraries = "places",
    inputAutocompleteValue = "new-password",
    debounce = 500,
    options: {
      types = ["(cities)"],
      componentRestrictions,
      fields = [
        "address_components",
        "geometry.location",
        "place_id",
        "formatted_address",
      ],
      bounds,
      ...options
    } = {},
    googleMapsScriptBaseUrl = GOOGLE_MAP_SCRIPT_BASE_URL,
    language,
  } = props;
  const inputRef = useRef(null);
  const event = useRef(null);
  const autocompleteRef = useRef(null);
  const observerHack = useRef(null);
  const languageQueryParam = language ? `&language=${language}` : "";
  const googleMapsScriptUrl = `${googleMapsScriptBaseUrl}?libraries=${libraries}&key=${apiKey}${languageQueryParam}&loading=async`;
  
  // const handleLoadScript = useCallback(
  //   () => loadGoogleMapScript(googleMapsScriptBaseUrl, googleMapsScriptUrl),
  //   [googleMapsScriptBaseUrl, googleMapsScriptUrl]
  // );
  
  const isLoaded = useGoogleMapsApi({ url: googleMapsScriptUrl, debounce });

  useEffect(() => {
    const config = {
      ...options,
      fields,
      types,
      bounds,
    };

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    if (autocompleteRef.current || !inputRef.current || !isBrowser) return;

    if (ref && !ref.current) ref.current = inputRef.current;

    const handleAutoComplete = () => {
      if (typeof google === "undefined")
        return console.error(
          "Google has not been found. Make sure your provide apiKey prop."
        );

      if (!google.maps?.places)
        return console.error("Google maps places API must be loaded.");

      if (!inputRef.current instanceof HTMLInputElement)
        return console.error("Input ref must be HTMLInputElement.");

      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        config
      );
      
      if(autocompleteRef.current) {
         event.current = autocompleteRef.current.addListener(
          "place_changed",
          () => {
            if (onPlaceSelected && autocompleteRef && autocompleteRef.current) {
              onPlaceSelected(
                autocompleteRef.current.getPlace(),
                inputRef.current,
                autocompleteRef.current
              );
            }
          }
        );
      }
    };

    if (isLoaded) {
      handleAutoComplete();
    }

    return () => (event.current ? event.current.remove() : undefined);
  }, [isLoaded]);

  // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445
  useEffect(() => {
    // TODO find out why react 18(strict mode) hangs the page loading
    if (
      !React?.version?.startsWith("18") &&
      isBrowser &&
      window.MutationObserver &&
      inputRef.current &&
      inputRef.current instanceof HTMLInputElement
    ) {
      observerHack.current = new MutationObserver(() => {
        observerHack.current.disconnect();

        if (inputRef.current) {
          inputRef.current.autocomplete = inputAutocompleteValue;
        }
      });
      observerHack.current.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ["autocomplete"],
      });
    }
  }, [inputAutocompleteValue]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setFields(fields);
    }
  }, [fields]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setBounds(bounds);
    }
  }, [bounds]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setComponentRestrictions(componentRestrictions);
    }
  }, [componentRestrictions]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setOptions(options);
    }
  }, [options]);

  return {
    ref: inputRef,
    autocompleteRef,
  };
}
