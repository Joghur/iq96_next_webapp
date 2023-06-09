import { MdMyLocation } from "react-icons/md";
import { useMapEvents } from "react-leaflet";

const UserMapButton = () => {
  const map = useMapEvents({
    locationfound: (location) => {
      map.flyTo(location.latlng, map.getZoom());
    },
  });

  const handleFlyToUserLocation = () => {
    map.locate();
  };

  return (
    <button
      className="z-1000 btn rounded-full shadow-xl ring-2"
      onClick={handleFlyToUserLocation}
    >
      <MdMyLocation />
    </button>
  );
};

export default UserMapButton;
