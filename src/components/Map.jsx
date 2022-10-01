import GoogleMapReact from "google-map-react";
import LocationInfoBox from "./LocationInfoBox";
import { useState } from "react";
import React from "react";
import LocationMarker from "./LocationMarker";

function Map({ eventData, center, zoom }) {
  const [locationInfo, setLocationInfo] = useState(null);

  const markers = eventData.map((ev, index) => {
    if (ev.categories[0].id === 8) {
      return (
        <LocationMarker
          key={index}
          lat={ev.geometries[0].coordinates[1]}
          lng={ev.geometries[0].coordinates[0]}
          onClick={() =>
            setLocationInfo({
              id: ev.id,
              title: ev.title,
              source: ev.sources[0].url,
            })
          }
          id={ev.categories[0].id}
        />
      );
    }
    if (ev.categories[0].id === 12) {
      return (
        <LocationMarker
          key={index}
          lat={ev.geometries[0].coordinates[1]}
          lng={ev.geometries[0].coordinates[0]}
          onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
          id={ev.categories[0].id}
        />
      );
    }
    if (ev.categories[0].id === 10) {
      let stormTrail = [];
      for (let i = 10; i > 0; i--) {
        if (ev.geometries[i]) {
          const num = i * 100;
          const conditionalStyle = ` text-blue-${1000 - num} `;
          stormTrail.push(
            <LocationMarker
              key={index + i}
              lat={ev.geometries[i].coordinates[1]}
              lng={ev.geometries[i].coordinates[0]}
              onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
              id={ev.categories[0].id}
              index={i}
            />
          );
        }
      }
      return [...stormTrail];
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
      {locationInfo && <LocationInfoBox info={locationInfo}></LocationInfoBox>}
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
