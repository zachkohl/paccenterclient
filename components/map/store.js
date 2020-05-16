import { createStore } from "redux";
import _ from "lodash";
import L from "leaflet";
function reducer(state = { fresh: false }, action) {
  switch (action.type) {
    case "LOAD":
      //build the point object
      let points = {};
      console.log(`in store:${action.payload.length}`);
      for (let i = 0; i < action.payload.length; i++) {
        const icon = "initial";
        const row = {
          ...action.payload[i],
          icon: icon,
          walkinglist: action.payload[i].walkinglistid,
          number: action.payload[i].number,
        };
        _.set(points, `${action.payload[i].id}`, row);
      }
      return { points: points, fresh: !state.fresh };

    case "UPDATE":
      //mutate the only the address with that id
      const msg = JSON.parse(action.payload);
      console.log(msg.number);
      if (_.has(state, `points.${msg.pointid}`)) {
        console.log("already exist");
        const newState = _.cloneDeep(state);
        const walkinglist = msg.walkinglistid;
        _.set(newState, `points.${msg.pointid}.walkinglist`, walkinglist);
        _.set(newState, `points.${msg.pointid}.number`, msg.number);
        return newState;
      } else {
        console.log("did not have point in redux");
        return state;
      }

    case "OTHER_LIST_UPDATE":
      //mutate the only the address with that id
      const msg_newState_OTHER_LIST_UPDATE = JSON.parse(action.payload);
      if (_.has(state, `points.${msg_newState_OTHER_LIST_UPDATE.pointid}`)) {
        const newState_OTHER_LIST_UPDATE = _.cloneDeep(state);
        _.unset(
          newState_OTHER_LIST_UPDATE,
          `points.${msg_newState_OTHER_LIST_UPDATE.pointid}`
        );
        return newState_OTHER_LIST_UPDATE;
      } else {
        console.log("did not have point in redux");
        return state;
      }
    default:
      return state;
  }
}
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
