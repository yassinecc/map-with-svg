import React from 'react';
/* global google */
import { GoogleMap, withGoogleMap, Marker } from 'react-google-maps';
import Autosuggest from 'react-autosuggest';
import './App.css';

const MapComponent = withGoogleMap(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.children}
  </GoogleMap>
));

const getSuggestionValue = value => value;

function App() {
  const [value, setValue] = React.useState('');
  const [cities, setCities] = React.useState([]);

  const mapRef = React.useRef(null);
  let inputRef = React.useRef(null);

  function storeInputReference(autosuggest) {
    if (autosuggest !== null) {
      inputRef.current = autosuggest.input;
    }
  }

  if (inputRef.current) {
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
    });

    autocomplete.addListener('place_changed', () => {
      const a = autocomplete.getPlace();
      if (a.id) setCities([...cities, { id: [a.id], location: a.geometry.location }]);
    });
  }

  const inputProps = {
    placeholder: "Type a city's name",
    value: value,
    onChange: (event, { newValue }) => setValue(newValue),
  };

  return (
    <div className="App">
      <MapComponent
        ref={mapRef}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBeLMccTUfAVn3AisQ-KdFqex7rbEcnzC4&v=3.exp&libraries=places,drawing"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      >
        {cities.map(city => (
          <Marker icon={{ url: '/assets/pin.svg' }} key={city.id} position={city.location} />
        ))}
      </MapComponent>
      <div className="form-container">
        <div className="field">
          <Autosuggest
            ref={storeInputReference}
            suggestions={[]}
            renderSuggestion={() => null}
            getSuggestionValue={getSuggestionValue}
            onSuggestionsFetchRequested={() => {}}
            onSuggestionsClearRequested={() => {}}
            inputProps={inputProps}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
