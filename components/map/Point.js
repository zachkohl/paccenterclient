import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { useSelector } from "react-redux";
import _ from "lodash";
function Point(props) {
  const newIcon = L.divIcon({
    className: "my-div-icon",
    html: `<div>Changed<div>`,
  });
  const defaultIcon = L.divIcon({
    className: "my-div-icon",
    html: `<div>+<div>`,
  });

  function onClickHander(e) {
    axios.post("/api/newVisit", {
      walkingListId: props.walkingListId,
      pointId: props.pointId,
    });
  }

  const icon = useSelector((state) => {
    return _.get(state, `${props.id}.icon`);
  });

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
  return (
    <Marker
      position={[props.point.coordinates[1], props.point.coordinates[0]]}
      onClick={onClickHander}
      icon={icon || defaultIcon}
    >
      <Tooltip>{props.id}</Tooltip>
    </Marker>
  );
}

export default Point;
