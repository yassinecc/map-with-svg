import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import Autosuggest from 'react-autosuggest';
import './App.css';

const useGoogle = (Component: React.Component) => withScriptjs(withGoogleMap(Component));

const MapComponent = useGoogle(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.children}
  </GoogleMap>
));

const getSuggestions = () => ['a', 'b'];

const getSuggestionValue = value => value;

function App() {
  const [value, setValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);

  const inputProps = {
    placeholder: "Type a city's name",
    value: value,
    onChange: (event, { newValue }) => setValue(newValue),
  };

  return (
    <div className="App">
      <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBeLMccTUfAVn3AisQ-KdFqex7rbEcnzC4&v=3.exp"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <div className="form-container">
        <div className="field">
          <Autosuggest
            suggestions={suggestions}
            renderSuggestion={suggestion => <div>{suggestion}</div>}
            getSuggestionValue={getSuggestionValue}
            onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
            onSuggestionsClearRequested={() => setSuggestions([])}
            inputProps={inputProps}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
