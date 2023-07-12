import { Box } from '@mui/material';
import GoogleMapReact from 'google-map-react';

type MapProps = {
  apiKey?: string,
  latitude: number,
  longitude: number,
  zoom: number,
  height?: string,
  width?: string,
}

function Map({ apiKey = '', latitude, longitude, zoom, height = '500px', width = '100%' }: MapProps) {
  return (
    <Box component="div" height={height} width={width}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={zoom}
      />
    </Box>
  );
}

export default Map;
