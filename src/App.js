import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import './App.css';

const useGoogle = (Component: React.Component) => withScriptjs(withGoogleMap(Component));
const MapComponent = useGoogle(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.children}
  </GoogleMap>
));

function App() {
  return (
    <div className="App">
      <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBeLMccTUfAVn3AisQ-KdFqex7rbEcnzC4&v=3.exp"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
