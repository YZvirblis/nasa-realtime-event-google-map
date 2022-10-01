import GoogleMapReact from "google-map-react";

import React from "react";
import LocationMarker from "./LocationMarker";

function Map({ eventData, center, zoom }) {
  const markers = eventData.map((ev) => {
    if (ev.categories[0].id === 8) {
      return (
        <LocationMarker
          lat={ev.geometries[0].coordinates[1]}
          lng={ev.geometries[0].coordinates[0]}
          onClick={console.log("ok")}
        />
      );
    }
    return null;
  });
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
}

Map.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -22.8756,
  },
  zoom: 6,
};

export default Map;
