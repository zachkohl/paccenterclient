import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { useSelector } from "react-redux";
import _ from "lodash";
function Point(props) {
  const [icon, setIcon] = useState(L.divIcon(props.iconsettings));

  // const newIcon = L.divIcon({
  //   className: "my-div-icon",
  //   html: `<div>Changed<div>`,
  // });
  const defaultIcon = L.divIcon(props.iconsettings);

  // if (props.number != null) {
  //   setIcon(
  //     L.divIcon({
  //       className: "newIcon",
  //       html: `<div>${Math.round(props.number)}<div>`,
  //     })
  //   );
  // }

  function onClickHander(e) {
    axios
      .post("/api/newVisit", {
        walkingListId: props.walkingListId,
        pointId: props.pointId,
      })
      .then((response) => {
        if (response.data != "error") {
          console.log(response.data);
          setIcon(
            L.divIcon({
              className: "newIcon",
              html: `<div>${Math.round(response.data.number)}<div>`,
            })
          );
        }
      });
  }

  // useEffect(() => {
  //   console.log("useEffect activated");
  //   for (let i = 0; i < props.fromdb.length; i++) {
  //     if (
  //       props.fromdb[i].pointid === props.id &&
  //       props.fromdb[i].pointid === props.walkingListId
  //     ) {
  //       setIcon(
  //         L.divIcon({
  //           className: "my-div-icon",
  //           html: `<div>Changed<div>`,
  //         })
  //       );
  //     }
  //   }
  // }, [props.change]);
  // const setter = useSelector((state) => {
  //   return {
  //     walkinglist: _.get(state, `points.${props.pointId}.walkinglist`),
  //     number: _.get(state, `points.${props.pointId}.number`),
  //   };
  // });

  return (
    <Marker
      position={[props.point.coordinates[1], props.point.coordinates[0]]}
      onClick={onClickHander}
      icon={icon}
    ></Marker>
  );
  // if (setter.walkinglist === null) {
  //   return (
  //     <Marker
  //       position={[props.point.coordinates[1], props.point.coordinates[0]]}
  //       onClick={onClickHander}
  //       icon={defaultIcon}
  //     >
  //       <Tooltip>{props.id}</Tooltip>
  //     </Marker>
  //   );
  // } else {
  //   const newIcon = L.divIcon({
  //     className: "newIcon",
  //     html: `<div>${setter.number ? Math.round(setter.number) : 0}<div>`,
  //   });

  //   return (
  //     <Marker
  //       position={[props.point.coordinates[1], props.point.coordinates[0]]}
  //       onClick={onClickHander}
  //       icon={newIcon}
  //     >
  //       <Tooltip>{props.id}</Tooltip>
  //     </Marker>
  //   );
  //}

  // function HOC(z) {
  //   const x = z;
  //   const y = x + 1;
  //   props.setCounter(y);
  //   setIcon(
  //     L.divIcon({
  //       className: "my-div-icon",
  //       html: `<div>${y}<div>`,
  //     })
  //   );
  // }
}

export default Point;
