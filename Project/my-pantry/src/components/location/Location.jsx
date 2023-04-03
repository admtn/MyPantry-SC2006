import React, { useState, useEffect } from "react";
import MartList from "../../components/martList/MartList";
import martImg from "./martimg.png";
import "./location.scss";
import TextField from "@mui/material/TextField";


const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [supermarkets, setSupermarkets] = useState([]);
  const [radius, setRadius] = useState(1500);
  const [inputText, setInputText] = useState("");


  let inputHandler = (e) => {
    //convert input text to lower case
    setInputText(e.target.value);
  };

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

      const icon = {
        url: martImg, // url
        scaledSize: new window.google.maps.Size(30, 40), // scaled size
        origin: new window.google.maps.Point(0, 0), // origin
    };

      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: { lat: latitude, lng: longitude },
          radius: radius, // search within 1.5km
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
                icon: icon, 
              });
            });
          }
        }
      );
    }
  }, [latitude, longitude,radius]);

  return (
    <div className="loc">
        <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Set Radius"
          onKeyDown={(ev) => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === 'Enter') {
              // Do code here
              if(!isNaN(+inputText)){
                setRadius(parseInt(inputText));
                console.log(radius)
                ev.preventDefault();
              }
              else{
                alert("Input a valid number!");
                ev.preventDefault();
              }
            }
          }}
        />
      </div>
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