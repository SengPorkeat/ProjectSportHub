import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import PointMarker from "../marker/PointMarker";

const MapComponent = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = import.meta.env.VITE_ALLMAP_URL;
  const apiUrl = `${baseUrl}${endPoint}`;
  const [radius, setRadius] = useState(5);
  const radiusOptions = [2, 5, 10, 15, 20, 25, 30];
  const [clubs, setClubs] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchClubsAndLocations = async () => {
      try {
        let allClubs = [];
        let nextUrl = apiUrl;

        while (nextUrl) {
          const response = await fetch(nextUrl);
          const data = await response.json();
          allClubs = [...allClubs, ...data.results];
          nextUrl = data.next;
        }

        setClubs(allClubs);

        const fetchedLocations = allClubs.map((item, index) => ({
          key: index,
          id: item.id,
          sport_name: item.sport_name,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
          image: item.image,
          description: item.description,
          price: item.price,
          reviews: item.reviews,
          seat_number: item.seat_number,
          skill_level: item.skill_level,
          contact_info: item.contact_info,
        }));

        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClubsAndLocations();
  }, [apiUrl]);

  const formatDistance = (distance) => (distance / 1000).toFixed(2);
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div className="flex w-11/12 ml-auto">
        <div className="w-2/3 p-4 overflow-y-auto">
          <div className="flex items-center space-x-3 mb-4">
            <select
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="border-2 border-gray-300 rounded-md text-center w-full py-3 mt-20"
            >
              {radiusOptions.map((option) => (
                <option key={option} value={option}>
                  {option} km
                </option>
              ))}
            </select>
            <label className="text-gray-700 text-center mt-20">
              Radius (km)
            </label>
          </div>
          <PointMarker
            pois={locations}
            radius={radius}
            formatDistance={formatDistance}
            clubs={clubs}
          />
        </div>
        <div className="flex-1">
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: 11.578268759952971, lng: 104.90178553000196 }}
            mapId="a2b2fd561b553426"
            onCameraChanged={(ev) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          />
        </div>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
