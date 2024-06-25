// import { useGlobalContext } from "@/app/context/GlobalContext";
// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// function FlyToActiveCity({ activeCityCords }) {
//   const map = useMap();
//   useEffect(() => {
//     if (activeCityCords) {
//       const zoomLev = 13;
//       const flyToOptions = {
//         duration: 1.5,
//       };
//       map.flyTo(
//         [activeCityCords.lat, activeCityCords.lon],
//         zoomLev,
//         flyToOptions
//       );
//     }
//   }, [activeCityCords, map]);

//   return null;
// }

// function Mapbox() {
//   const { forecast } = useGlobalContext();
//   const activeCityCords = forecast?.coord;
//   if (!forecast || !forecast.coord || !activeCityCords) {
//     // return <Skeleton className="h-[12rem] w-full" />;
//     return (
//       <div>
//         <h1>Loading</h1>
//       </div>
//     );
//   }
//   return (
//     <div className="pt-6 pl-4 flex-1 basis-[50%] border rounded-lg">
//       <MapContainer
//         center={[activeCityCords.lat, activeCityCords.lon]}
//         zoom={13}
//         scrollWheelZoom={false}
//         className="rounded-lg m-4"
//         style={{
//           height: "calc(100% - 2rem)",
//           // height: 400,
//           width: "calc(100% - 2rem)",
//         }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <FlyToActiveCity activeCityCords={activeCityCords} />
//       </MapContainer>
//     </div>
//   );
// }

// export default Mapbox;
import { useGlobalContext } from "@/app/context/GlobalContext";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyToActiveCity({ activeCityCords }) {
  const map = useMap();
  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };
      map.flyTo([activeCityCords.lat, activeCityCords.lon], zoomLev, flyToOptions);
    }
  }, [activeCityCords, map]);

  return null;
}

function Mapbox() {
  const { forecast } = useGlobalContext();
  const activeCityCords = forecast?.coord;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleDialogState = (event) => {
      if (event.detail && event.detail.open !== undefined) {
        setIsDialogOpen(event.detail.open);
      }
    };

    window.addEventListener("dialogStateChange", handleDialogState);

    return () => {
      window.removeEventListener("dialogStateChange", handleDialogState);
    };
  }, []);

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div
      className={`pt-6 pl-4 flex-1 basis-[50%] border rounded-lg ${
        isDialogOpen ? "hidden" : ""
      }`}
    >
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="rounded-lg m-4"
        style={{
          height: "calc(100% - 2rem)",
          width: "calc(100% - 2rem)",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;
