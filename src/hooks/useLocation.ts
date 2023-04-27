import { useEffect, useState } from 'react';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const useLocation = () => {
  const [latLng, setlatLng] = useState<number[] | null>(null);

  function geolocationSuccess(pos: { coords: any }) {
    const crd = pos.coords;
    setlatLng([crd.latitude, crd.longitude]);
  }

  function geolocationErrors(err: { code: any; message: any }) {
    console.log(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state === 'granted') {
            navigator.geolocation.getCurrentPosition(geolocationSuccess);
          } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(
              geolocationSuccess,
              geolocationErrors,
              options
            );
          } else if (result.state === 'denied') {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      console.log('Sorry Not available!');
    }
  }, []);

  return latLng;
};
