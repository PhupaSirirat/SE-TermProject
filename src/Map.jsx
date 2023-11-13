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

const MapPage = tv({
  slots: {
    base: "relative",
    input: "w-40 rounded-md p-0.5 pl-1.5",
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
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${import.meta.env.VITE_APP_GOOGLE_API_KEY}`,
    libraries,
  });

  const [, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [busStops, setBusStops] = useState([]);

  const originRef = useRef();
  const destiantionRef = useRef();
  const transitLayerRef = useRef();

  const onMapLoad = React.useCallback((map) => {
    setMap(map);
    transitLayerRef.current = new window.google.maps.TransitLayer();
    transitLayerRef.current.setMap(map);
  }, []);

  // async function calculateRoute() {
  //   if (originRef.current.value === "" || destiantionRef.current.value === "") {
  //     return;
  //   }
  //   const directionsService = new window.google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: originRef.current.value,
  //     destination: destiantionRef.current.value,
  //     travelMode: window.google.maps.TravelMode.DRIVING,
  //   });
  //   setDirectionsResponse(results);
  // }

  async function calculateRoute() {
    try {
      if (
        originRef.current.value === "" ||
        destiantionRef.current.value === ""
      ) {
        return;
      }
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        travelMode: window.google.maps.TravelMode.TRANSIT,
      });

      setDirectionsResponse(results);

      // Extracting bus stops from the response
      let busStops = [];
      results.routes[0].legs.forEach((leg) => {
        leg.steps.forEach((step) => {
          if (
            step.travel_mode === "TRANSIT" &&
            step.transit.line.vehicle.type === "BUS"
          ) {
            // Push the departure stop's name to the busStops array
            busStops.push(step.transit.departure_stop.name);
            // Since the arrival stop of the last step will be the departure stop of the next transit step, we don't push it here to avoid duplicates
            // Only push the arrival stop for the last transit step in the leg
            if (
              leg.steps.indexOf(step) === leg.steps.length - 1 ||
              leg.steps[leg.steps.indexOf(step) + 1].travel_mode !== "TRANSIT"
            ) {
              busStops.push(step.transit.arrival_stop.name);
            }
          }
        });
      });

      console.log(busStops);
      setBusStops(busStops);
    } catch (err) {
      alert(err);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return isLoaded ? (
    <main className={base()}>
      <Link to="/home" className="absolute z-10 top-5 left-5">
        <Button label={"กลับ"} className={"px-2 py-1"} />
      </Link>
      <section className="w-1/2 h-fit bg-white absolute left-1/2 -translate-x-1/2 top-5 z-10 rounded-lg border border-black grid items-center p-4">
        <div className="flex flex-col">
          <section className="flex flex-col justify-center gap-4">
            <div className="">
              <Autocomplete>
                <input
                  type="text"
                  name="Origin"
                  className={input()}
                  placeholder="Origin"
                  ref={originRef}
                />
              </Autocomplete>
            </div>
            <div className="">
              <Autocomplete>
                <input
                  type="text"
                  name="Destication"
                  className={input()}
                  placeholder="Destication"
                  ref={destiantionRef}
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
              <button
                type="submit"
                name="clear"
                className={newbutton()}
                onClick={clearRoute}
              >
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
