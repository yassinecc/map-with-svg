/* global google */
import React from 'react';
import { GoogleMap, withGoogleMap, Marker } from 'react-google-maps';
import Autosuggest from 'react-autosuggest';
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const DrawerItem = ({ city, onClick }) => {
  return city ? (
    <div className="drawer-item">
      <div>{city.name}</div>
      <div onClick={onClick}>X</div>
    </div>
  ) : null;
};

const MapComponent = withGoogleMap(props => (
  <GoogleMap
    defaultOptions={{ fullscreenControl: false }}
    defaultZoom={5}
    defaultCenter={{ lat: 48.887, lng: 2.299 }}
  >
    {props.children}
  </GoogleMap>
));

const getSuggestionValue = value => value;

function App() {
  const [value, setValue] = React.useState('');
  const [cities, setCities] = React.useState([]);
  const [isDrawerVisible, setDrawerVisible] = React.useState(false);

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
      const place = autocomplete.getPlace();
      if (place.id)
        setCities([
          ...cities,
          { id: place.id, name: place.formatted_address, location: place.geometry.location },
        ]);
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
          <Marker
            icon={{ url: '/assets/pin.svg' }}
            key={city.id}
            position={city.location}
            onClick={() => setDrawerVisible(true)}
          />
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
      <Drawer
        width="30vw"
        showMask={false}
        closable={false}
        placement="right"
        visible={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <div>
          {cities.map(city => (
            <DrawerItem
              key={city.id}
              city={city}
              onClick={() => setCities(cities.filter(filterCity => filterCity.id !== city.id))}
            />
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export default App;
