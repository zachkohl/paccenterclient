import { createStore } from "redux";
import _ from "lodash";
import L from "leaflet";
function reducer(state = {}, action) {
  switch (action.type) {
    case "LOAD":
      //build the point object
      let points = {};
      for (let i = 0; i < action.payload.length; i++) {
        const icon = L.divIcon({
          className: "my-div-icon",
          html: `<div>NotChanged<div>`,
        });
        const row = {
          ...action.payload[i],
          icon: icon,
        };
        _.set(points, `${action.payload[i].id}`, action.payload[i]);
      }
      return { points: points };

    case "UPDATE":
      //mutate the only the address with that id
      const newState = _.cloneDeep(state);
      console.log(
        `payload id from inside store: ${JSON.parse(action.payload)["id"]}`
      );
      const icon = L.divIcon({
        className: "my-div-icon",
        html: `<div>CHANGED<div>`,
      });
      _.set(newState, `${JSON.parse(action.payload)["id"]}.icon`, icon);
      return newState;
    default:
      return state;
  }
}
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
