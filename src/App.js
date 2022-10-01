import Map from "./components/Map.jsx";
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import mockData from "./mockData";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch(
        `https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key${process.env.REACT_APP_NASA_API_KEY}`
      );
      const data = await res.json();
      console.log(data);

      setEventData(data.events);
      setLoading(false);
    };
    // fetchEvents();
    setEventData(mockData);
  }, []);

  return (
    <div>
      <Header></Header>
      {!loading ? <Map eventData={eventData}></Map> : <h1>LOADING</h1>}
    </div>
  );
}

export default App;
