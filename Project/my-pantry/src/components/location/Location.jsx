import React, { useState, useEffect } from "react";
import MartList from "../../components/martList/MartList";
import "./location.scss";

const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [supermarkets, setSupermarkets] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });

      const userMarker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: "Your location",
      });

      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: { lat: latitude, lng: longitude },
          radius: 1000, // search within 1km
          type: "supermarket",
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSupermarkets(results);
            results.forEach((result) => {
              new window.google.maps.Marker({
                position: result.geometry.location,
                map,
                title: result.name,
              });
            });
          }
        }
      );
    }
  }, [latitude, longitude]);

  return (
    <div className="loc">
      {latitude && longitude ? (
        <>
          <h1>Supermarkets Near Me</h1>
          <div id="map" className="map"></div>
          <MartList supermarkets={supermarkets} />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Location;