import React, { useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  TransitLayer,
} from "@react-google-maps/api";
import { Button } from "./components/Button";
import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MapPage = tv({
  slots: {
    base: "relative flex flex-col",
    input: "w-full rounded-md p-0.5 pl-1.5",
    newbutton: "border-2 border-black rounded-md p-0.5",
  },
});

const { base, input, newbutton } = MapPage();

const center = {
  lat: 13.739415037890979,
  lng: 100.52758009002648,
};

const libraries = ["places"];

export default function Map() {
  const location = useLocation();
  const autofillData = location.state;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${import.meta.env.VITE_APP_GOOGLE_API_KEY}`,
    libraries,
  });

  const [, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routes, setRoutes] = useState([]);

  const [origin, setOrigin] = useState(autofillData?.from || "");
  const [destination, setDestination] = useState(autofillData?.to || "");
  const originRef = useRef(location.state.from || null);
  const destinationRef = useRef(location.state.to || null);
  const transitLayerRef = useRef();

  const onMapLoad = React.useCallback((map) => {
    setMap(map);
    transitLayerRef.current = new window.google.maps.TransitLayer();
    transitLayerRef.current.setMap(map);
  }, []);

  async function calculateRoute() {
    setOrigin(originRef.current.value);
    setDestination(destinationRef.current.value);
    try {
      if (
        originRef.current.value === "" ||
        destinationRef.current.value === ""
      ) {
        return;
      }
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.TRANSIT,
        transitOptions: {
          modes: [window.google.maps.TransitMode.BUS],
        },
      });

      setDirectionsResponse(results);
      let tmpList = [];
      if (routes.length === 0) {
        results.routes[0].legs[0].steps.forEach((route) => {
          tmpList.push(route.instructions);
        });
      } else {
        results.routes[0].legs[0].steps.forEach((route) => {
          tmpList.push(route.instructions);
        });
      }

      setRoutes(tmpList);
      console.log(
        "Origin: " + originRef.current.value.toString().split(",")[0]
      );
      console.log(
        "Destination: " + destinationRef.current.value.toString().split(",")[0]
      );
      console.log(routes);

      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.post(
          `https://se-term-project.onrender.com/api/history/add`,
          {
            "from": originRef.current.value.toString().split(",")[0],
            "to": destinationRef.current.value.toString().split(",")[0],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      
    } catch (err) {
      alert(err);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return isLoaded ? (
    <main className={base()}>
      <Link to="/home" className="absolute z-10 top-5 left-5">
        <Button label={"กลับ"} className={"px-2 py-1"} />
      </Link>
      {routes.length > 0 && (
        <div className="absolute z-10 bottom-7 bg-white w-full border-4 p-2">
          <section className="flex justify-between">
            <span>Routes ({routes.length})</span>
            <Button label={"Fav"} className={"w-1/3"} />
          </section>
          <section>
            {routes.map((item) => (
              <div key={item}>
                {routes.indexOf(item) + 1}.{item}
              </div>
            ))}
          </section>
        </div>
      )}
      <section className="w-3/5 h-fit bg-white absolute left-1/2 -translate-x-1/2 top-5 z-10 rounded-lg border border-black grid items-center p-4">
        <div className="flex flex-col">
          <section className="flex flex-col justify-center gap-4 text-white">
            <div className="">
              <Autocomplete>
                <input
                  type="text"
                  name="From"
                  className={input()}
                  placeholder="From"
                  ref={originRef}
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </Autocomplete>
            </div>
            <div className="">
              <Autocomplete>
                <input
                  type="text"
                  name="To"
                  className={input()}
                  placeholder="To"
                  ref={destinationRef}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Autocomplete>
            </div>
          </section>
          <section className="flex justify-center gap-5 mt-2">
            <div className="">
              <button
                type="submit"
                name="submit"
                className={newbutton()}
                onClick={calculateRoute}
              >
                Search
              </button>
            </div>
            <div className="">
              <button name="clear" className={newbutton()} onClick={clearRoute}>
                Clear
              </button>
            </div>
          </section>
        </div>
      </section>
      <section className="">
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={onMapLoad}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <TransitLayer onLoad={(tl) => (transitLayerRef.current = tl)} />
        </GoogleMap>
      </section>
    </main>
  ) : (
    <></>
  );
}
