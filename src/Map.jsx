import { useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Button } from "./components/Button";
import { Link } from "react-router-dom";

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

  const originRef = useRef();
  const destiantionRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return isLoaded ? (
    <main className="h-screen overflow-hidden">
      <Link to="/home" className="absolute z-10 top-16 left-16">
        <Button label={"กลับ"} />
      </Link>
      <section className="searchbox">
        <div className="flex flex-col">
          <section className="flex justify-center gap-4">
            <div className="">
              <Autocomplete>
                <input
                  type="text"
                  name="Origin"
                  className="form-control"
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
                  className="form-control"
                  placeholder="Destication"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </div>
          </section>
          <section className="flex justify-center gap-40 mt-2">
            <div className="">
              <button
                type="submit"
                name="submit"
                className="border-2 border-black"
                onClick={calculateRoute}
              >
                Search
              </button>
            </div>
            <div className="">
              <button
                type="submit"
                name="clear"
                className="border-2 border-black"
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
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </section>
    </main>
  ) : (
    <></>
  );
}
