import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { useSelector } from "react-redux";
import _ from "lodash";
function Point(props) {
  // const newIcon = L.divIcon({
  //   className: "my-div-icon",
  //   html: `<div>Changed<div>`,
  // });
  const defaultIcon = L.divIcon({
    className: "defaultIcon",
    html: `<div>+<div>`,
  });

  function onClickHander(e) {
    axios.post("/api/newVisit", {
      walkingListId: props.walkingListId,
      pointId: props.pointId,
    });
  }

  const setter = useSelector((state) => {
    return {
      walkinglist: _.get(state, `points.${props.pointId}.walkinglist`),
      number: _.get(state, `points.${props.pointId}.number`),
    };
  });

  if (setter.walkinglist === null) {
    return (
      <Marker
        position={[props.point.coordinates[1], props.point.coordinates[0]]}
        onClick={onClickHander}
        icon={defaultIcon}
      >
        <Tooltip>{props.id}</Tooltip>
      </Marker>
    );
  } else {
    const newIcon = L.divIcon({
      className: "newIcon",
      html: `<div>${setter.number ? Math.round(setter.number) : 0}<div>`,
    });

    return (
      <Marker
        position={[props.point.coordinates[1], props.point.coordinates[0]]}
        onClick={onClickHander}
        icon={newIcon}
      >
        <Tooltip>{props.id}</Tooltip>
      </Marker>
    );
  }

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
