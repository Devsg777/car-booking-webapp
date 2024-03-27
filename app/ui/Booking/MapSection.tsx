'use client'
import React, {useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { Marker, OverlayView as OverlayViewF } from '@react-google-maps/api';
import useBookingData from '@/app/utils/context/useBookingData';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: '15px',
};

const MyComponent: React.FC = () => {
  const { source, destination, amountData, setAmountData } = useBookingData();
  const distance = amountData?.distance;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: ['geometry'],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 12.971599, lng: 77.5946 });
  const [directionsRoutesPoints, setDirectionsRoutesPoints] = useState<any>(null);

  const directionService = () => {
    const origin = { lat: source.lat, lng: source.lng };
    const dest = { lat: destination.lat, lng: destination.lng };

    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin,
        destination: dest,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const validRoutes = result?.routes && result.routes.length > 0;
          setDirectionsRoutesPoints(validRoutes ? { ...result } : null);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  const calculateDistance = () => {
    if (map && source.lat !== 0 && source.lng !== 0 && destination.lat !== 0 && destination.lng !== 0) {
      const origin = new google.maps.LatLng(source.lat, source.lng);
      const destiny = new google.maps.LatLng(destination.lat, destination.lng);

      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destiny],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            const result = response?.rows[0].elements[0];
            const validResult = result?.status === 'OK';
            if (validResult) {
              setAmountData({ amount: 0, distance: result.distance.value / 1000 });
            } else {
              console.error('Unable to calculate distance:', result?.status);
            }
          } else {
            console.error('Distance matrix request failed due to:', status);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (isLoaded && !loadError && map && source?.lat !== 0 && source?.lng !== 0 && destination?.lat !== 0 && destination?.lng !== 0) {
      directionService();
    }

    if (source?.lat !== 0 && source?.lng !== 0 && map) {
      setCenter({ lat: source.lat, lng: source.lng });
    }
  }, [isLoaded, loadError, map, source, destination]);

  useEffect(() => {
    if (destination.lat !== 0 && destination.lng !== 0 && map) {
      setCenter({ lat: destination.lat, lng: destination.lng });
    }
  }, [destination, map]);

  useEffect(() => {
    if (map && source.lat !== 0 && source.lng !== 0 && destination.lat !== 0 && destination.lng !== 0) {
      calculateDistance();
    }
  }, [source, destination, map]);

  useEffect(() => {
    // Cleanup function when component is unmounted
    return () => {
      setMap(null);
      setDirectionsRoutesPoints(null);
      // ... other state resets
    };
  }, []);

  if (loadError) {
    return <div>Error loading map. Please try again later.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={(map) => setMap(map)}
      zoom={9}
      options={{ mapId: '56c9392678b79d4c' }}
    >
      {source !== null && renderMarker(source)}
      {destination !== null && renderMarker(destination)}

      {directionsRoutesPoints != null && (
        <DirectionsRenderer
          directions={directionsRoutesPoints}
          options={{ polylineOptions: { strokeColor: '#000', strokeWeight: 5 }, suppressMarkers: true }}
        />
      )}

      {distance !== 0 && (
        <OverlayViewF position={center} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className='distance-overlay text-lg bg-emerald-500 p-1 rounded-xl relative bottom-10 right-32 font-bold w-fit'>
            {distance !== 0 && <p>{distance?.toFixed(0)}Km</p>}
          </div>
        </OverlayViewF>
      )}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
};

const renderMarker = (position: any) => (
  <>
    <Marker
      position={position}
      icon={{
        url: '/pin.png',
        scaledSize: { height: 50, width: 50 } as any,
      }}
    />
    <OverlayViewF position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <div className='bg-white rounded-lg p-1 font-bold w-fit text-nowrap '>
        <p>{position.name.slice(",")}</p>
      </div>
    </OverlayViewF>
  </>
);

export default MyComponent;
