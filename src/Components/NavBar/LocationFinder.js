
import '../../App.css';
import axios from 'axios';
import { useRef, useState } from "react";

export default function LocationFinder({ setFormattedAddress, formData, setFormData }){

   const addressRef = useRef('');
   const [invalidAddress, setInvalidAddress] = useState(false);

   const submit = e => {
      e.preventDefault();
      
      console.log("entered: ", addressRef.current.value);

      geocode(addressRef.current.value);

    }

   function geocode (addressRef) {
      console.log ("in geocode: ", addressRef);
      axios.get('https://maps.googleapis.com/maps/api/geocode/json' , {
        params:{
          address: addressRef,
          key: process.env.REACT_APP_GOOGLE_KEY
        }
      })
      .then(function(response){

        // formatted address
        let formattedAddress = response.data.results[0].formatted_address;
        let long = response.data.results[0].geometry.location.lng;
        let lat = response.data.results[0].geometry.location.lat;

        console.log ("formatted: ", formattedAddress);
        console.log ("longitude: ", long);
        console.log ("latitude: ", lat);
        
        setFormData ({...formData, longitude: long, latitude: lat});

        setFormattedAddress(formattedAddress);

      })
      .catch(function(error){ // this doesn't seem to ever be thrown . . .
        console.log("Error: ", error);
        setInvalidAddress(true);
      });

    }

   return (
      <div className="location-bar">
        {invalidAddress ? <h3 id="error-msg">Invalid entry</h3> : 
         <h3>Please enter your address </h3>
        }
         <form>
            <input ref = { addressRef } type="text" id="address-input"/>
            <input type="button" onClick={submit} value="Go" /> 
         </form>     
      </div>
  );
}