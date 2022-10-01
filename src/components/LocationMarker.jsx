import { Icon } from "@iconify/react";
import fire from "@iconify/icons-mdi/fire-alert";
import storm from "@iconify/icons-mdi/weather-tornado";
import volcano from "@iconify/icons-mdi/volcano";

import React, { useEffect, useState } from "react";

function LocationMarker({ lat, lng, onClick, id }) {
  const [icon, setIcon] = useState(null);
  const [style, setStyle] = useState("");
  useEffect(() => {
    if (id === 8) {
      setIcon(fire);
      setStyle("text-red-500");
    }
    if (id === 12) {
      setIcon(volcano);
      setStyle(" text-orange-600");
    }
    if (id === 10) {
      setIcon(storm);
    }
  }, []);
  return (
    <div className="location-marker" onClick={onClick}>
      <Icon icon={icon} className={`location-icon   ${style}`} />
    </div>
  );
}

export default LocationMarker;
