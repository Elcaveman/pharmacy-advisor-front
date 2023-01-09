import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMapEvent,useMap } from "react-leaflet";
export default function MapSearch({searchControl,setLat,setLog}){
    const map = useMap()
    console.log("searchControl",searchControl)
    map.addControl(searchControl);
    map.on('geosearch/showlocation', (event)=>{
        setLog(event.location.x)
        setLat(event.location.y)
    });
}