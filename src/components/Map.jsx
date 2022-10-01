import GoogleMapReact from "google-map-react";
import LocationInfoBox from "./LocationInfoBox";
import { useState } from "react";
import React from "react";
import LocationMarker from "./LocationMarker";
import fire from "@iconify/icons-mdi/fire-alert";
import storm from "@iconify/icons-mdi/storm";
import volcano from "@iconify/icons-mdi/volcano";
import { Icon } from "@iconify/react";

function Map({ eventData, center, zoom }) {
  const [locationInfo, setLocationInfo] = useState(null);
  const [showFire, setShowFire] = useState(true);
  const [showVolcano, setShowVolcano] = useState(true);
  const [showStorm, setShowStorm] = useState(true);

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
          visibility={showFire}
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
          visibility={showVolcano}
        />
      );
    }
    if (ev.categories[0].id === 10) {
      let stormTrail = [];
      for (let i = 10; i > 0; i--) {
        if (ev.geometries[i]) {
          stormTrail.push(
            <LocationMarker
              key={index + i}
              lat={ev.geometries[i].coordinates[1]}
              lng={ev.geometries[i].coordinates[0]}
              onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
              id={ev.categories[0].id}
              index={i}
              visibility={showStorm}
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
      <div className="absolute top-60 left-0 z-50 bg-cyan-50 border solid border-gray-400 rounded p-3 flex flex-col filter">
        <div className="flex my-2">
          <Icon icon={fire} className={`location-icon text-red-500 mx-3`} />
          <button
            onClick={() => setShowFire(!showFire)}
            className={showFire ? "text-green-500" : null}
          >
            {showFire ? "ON" : "OFF"}
          </button>
        </div>
        <div className="flex my-2">
          <Icon
            icon={volcano}
            className={`location-icon text-orange-600 mx-3`}
          />
          <button
            onClick={() => setShowVolcano(!showVolcano)}
            className={showVolcano ? "text-green-500" : null}
          >
            {showVolcano ? "ON" : "OFF"}
          </button>
        </div>
        <div className="flex my-2">
          <Icon icon={storm} className={`location-icon text-yellow-500 mx-3`} />
          <button
            onClick={() => setShowStorm(!showStorm)}
            className={showStorm ? "text-green-500" : null}
          >
            {showStorm ? "ON" : "OFF"}
          </button>
        </div>
      </div>
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
