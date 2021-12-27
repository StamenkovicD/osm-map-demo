import React, {useEffect, useState, useRef} from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet'
// import {geolocated} from 'react-geolocated'
import pin from '../../assets/images/location-pin.svg'
import './map.styles.scss'

const DEFAULT_LONGITUDE = 21;
const DEFAULT_LATITUDE = 44;

function MapDemo() {

    const map = useMap();

    const [userCurrentPosition, setUserCurrentPosition] = useState([])

    // useEffect(() => {
    //     // Get current location
    //     // navigator.geolocation.getCurrentPosition(function(position) {
    //     //     console.log("Latitude is :", position.coords.latitude);
    //     //     console.log("Longitude is :", position.coords.longitude);

    //     //     setUserCurrentPosition(position.coords)
    //     //   });

    //     // const { current = {} } = mapRef;
    //     // const { leafletElement: map } = current;

    // },[])
    

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

    // console.log(userCurrentPosition.latitude)
   
    return (
        
        <div>
            <MapContainer center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom={7} className='leaflet-container'>
                <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    airports.map((airport, index) => (
                        <Marker key={index} position={[`${airport.location[0]}`, `${airport.location[1]}`]}>
                            <Tooltip>
                                {airport.name}
                            </Tooltip>
                        </Marker>
                    ))
                }
            </MapContainer>
            <div className='bottom-menu'>
                <button>
                    <img src={pin} alt="pin" />
                </button>
            </div>
        </div>
    )
}

export default MapDemo
