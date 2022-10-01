import Map from "./components/Map.jsx";
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import mockData from "./mockData";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch(
        `https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key${process.env.REACT_APP_NASA_API_KEY}`
      );
      const data = await res.json();
      console.log(data);

      setEventData(data.events);
    };
    // fetchEvents();
    setEventData(mockData);

    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* <Header></Header> */}
      {!loading ? (
        <Map eventData={eventData} center={location}></Map>
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
}

export default App;
