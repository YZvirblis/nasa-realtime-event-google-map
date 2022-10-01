import { Icon } from "@iconify/react";
import fire from "@iconify/icons-mdi/fire-alert";
import storm from "@iconify/icons-mdi/storm";
import volcano from "@iconify/icons-mdi/volcano";

import React, { useEffect, useState } from "react";

function LocationMarker({ lat, lng, onClick, id, index }) {
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
      // const conditionalStyle =
      //   index < 10
      //     ? ` text-blue-${(1000 - num).toString()}`
      //     : " disabled hidden";
      setIcon(storm);
      setStyle("text-yellow-500 ");
    }
  }, []);
  return (
    <div className={`z-auto`} onClick={onClick}>
      <Icon
        icon={icon}
        className={`location-icon ${style} ${
          index ? `opacity-${index.toString()}0` : ""
        }`}
      />
    </div>
  );
}

export default LocationMarker;
