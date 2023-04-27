import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { FC } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '';

type Props = {
  center?: number[];
};

const Map: FC<Props> = ({ center = [16.4704, 107.6009] }: Props) => {
  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
