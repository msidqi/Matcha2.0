import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import config from "@/config";
import CloseIcon from "../ui/Icons/CloseIcon";

type MapProps = {
  className?: string;
  lat?: number;
  long?: number;
  zoom?: number;
};

const Map = ({
  lat = 37.78,
  long = -122.41,
  zoom = 13,
  className,
}: MapProps) => {
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    zoom,
  });

  return (
    <ReactMapGL
      height="100%"
      width="100%"
      mapOptions={{ center: [long, lat] }}
      className={className}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={config.MAPBOX_KEY}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
    >
      <Marker latitude={lat} longitude={long}>
        <CloseIcon />
      </Marker>
    </ReactMapGL>
  );
};

export default Map;
