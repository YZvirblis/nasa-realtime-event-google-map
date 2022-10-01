import Map from "./components/Map.tsx";
import { useState, useEffect } from "react";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch(
        `https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key${process.env.REACT_APP_NASA_API_KEY}`
      );
      const { events } = await res.json();

      setEventData(events);
      setLoading(false);
      console.log(eventData);
    };
    fetchEvents();
  }, []);

  return (
    <div>{!loading ? <Map eventData={eventData}></Map> : <h1>LOADING</h1>}</div>
  );
}

export default App;
