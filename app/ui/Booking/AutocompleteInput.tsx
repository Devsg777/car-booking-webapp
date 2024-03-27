'use Client'
import React, { useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AutocompleteInput = ({ value, setValue }: any) => {
  useEffect(() => {
    // Cleanup function when component is unmounted
    return () => {
      // Add any cleanup logic here (e.g., removing event listeners, subscriptions, etc.)
    };
  },[]);

  const customStyles = {
    container: (provided :any) => ({
      ...provided,
    
      background: 'transparent !important',
      outline:'none',
      padding:'0px',
      cursor:'pointer',
    }),
    input: (provided:any) => ({

      ...provided,
      padding:'0px',
      background: 'transparent',
      outline:'none',
      border: 'none',
      cursor:'pointer',
      
    }),
    
    
  };

  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
      selectProps={{
        value,
        onChange: setValue,
        placeholder:"Enter location",
        isClearable: true,
        isSearchable: true,
        components: {
          DropdownIndicator: null,
        },
        className: 'w-full border-b-2  text-sm cursor-pointer',
        styles: customStyles,
      }}
      autocompletionRequest={{
        types: [],
      }}
    />
  );
};

export default AutocompleteInput;
