import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import LocationMarker from "./locationMarker";

import icon from "../constants";
import pin from '../../assets/images/location-pin.svg'
import plane from '../../assets/images/plane.svg'

import "./map.styles.scss";

const airports = [
        {
            name: 'Aerodrom Beograd',
            location: [44.786568, 20.448921]
        },
        {
            name: 'Nikola Tesla, Beograd',
            location: [44.786548, 20.348921]
        },
        {
            name: 'Aerodrom Montenegro, Podgorica',
            location: [42.438061, 19.265551]
        },
        {
            name: 'Aerodrom Bih, Sarajevo',
            location: [43.856258, 18.413076]
        },
        {
            name: 'Aerodrom Hrvatska, Zagreb',
            location: [45.770157, 16.069389]
        }
    ] 
   
function MapDemo() {

    const [ISSlat, setISSlat] = useState(0)
    const [ISSlng, setISSlng] = useState(0)

    const getISS = async () => {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await res.json()
        setISSlat(data.latitude)
        setISSlng(data.longitude )
        console.log(data)
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            getISS()
           console.log('This will run every second!');
        }, 4000);
        return () => clearInterval(interval);
     }, []);

    // Plane Icon
    const myIcon = new L.Icon({
        iconUrl: plane,
        iconRetinaUrl: plane,
        popupAnchor: [-0, -0],
        iconSize: [32, 45]
    })

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position) {
            //   console.log("Latitude is :", position.coords.latitude + 1);
            //   console.log("Longitude is :", position.coords.longitude + 1);
            });
          }
    },[])

  return (
    <section>
        <MapContainer
        center={[49.1951, 16.6068]}
        zoom={7}
        scrollWheelZoom
        style={{ height: "100vh" }}
        >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
            {
                airports.map((airport, index) => (
                    <Marker key={index} position={[`${airport.location[0]}`, `${airport.location[1]}`]} icon={icon}>
                        <Tooltip>
                            {airport.name}
                        </Tooltip>
                    </Marker>
                ))
            }
        <Marker position={[ISSlat, ISSlng]} icon={myIcon}></Marker>

        </MapContainer>
        <div className='bottom-menu'>
            <button>
                <img src={pin} alt="pin" />
            </button>
        </div>
    </section>
  );
}

export default MapDemo;
