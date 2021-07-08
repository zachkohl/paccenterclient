import react, {
  useState,
  useRef,
  useEffect,
  useReducer,
  forwardRef,
} from "react";
const db = require("../../lib/postgresSetup");
import useUser from "../../lib/useUser";
import { DataGrid } from "@material-ui/data-grid";

import { useRouter } from "next/router";
import Link from "next/link";
import MaterialTable from "material-table";
import sortByStreet from "../../lib/apiHelpers/sortAddresses";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <SaveIcon {...props} ref={ref} />),
};

function VisitsPage(props) {
  const { user } = useUser({ redirectTo: "/login" });
  const selected = useRef([]);
  const [visits, setVisits] = useState([...props.visits]);
  const orginalVisits = props.original;
  const columns = [
    { field: "name", title: "Name", editable: "never" },
    {
      field: "visited",
      title: "Visited",
      editable: "never",
      render: (rowData) => (
        <input
          type="checkbox"
          checked={rowData.visited}
          onChange={() => {
            visitedHandler(rowData);
          }}
        />
      ),
    },
    { field: "address", title: "Address", editable: "never" },
    { field: "notes", title: "Notes" },
  ];

  function visitedHandler(rowData) {
    const visitsUpdate = [...visits];
    console.log(visits[rowData.tableData.id].id);
    const index = rowData.tableData.id;
    const newData = rowData;
    newData.visited = !rowData.visited;
    visitsUpdate[index] = newData;
    setVisits([...visitsUpdate]);
  }

  const saveButton = {
    icon: forwardRef((props, ref) => <SaveIcon {...props} ref={ref} />),
    tooltip: "Save Updates",
    onClick: (event) => {
      saveUpdates();
    },
  };
  async function saveUpdates() {
    let toUpdate = [];

    for (let i = 0; i < visits.length; i++) {
      console.log(visits[i]);
      if (
        visits[i].notes != orginalVisits[i].notes ||
        visits[i].visited != orginalVisits[i].visited
      ) {
        toUpdate.push({
          notes: visits[i].notes,
          id: visits[i].id,
          visited: visits[i].visited,
        });
      }
    }
    const response = await axios.post("/api/surveys/updateVisits", {
      toUpdate: toUpdate,
    });
    alert(response.data);
  }

  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ margin: "10px" }}>
        <h1>List Page</h1>
        <div style={{ maxWidth: "auto" }}>
          <MaterialTable
            icons={tableIcons}
            data={visits}
            columns={columns}
            options={{
              selection: true,
              exportButton: true,
              pageSize: 100,
              pageSizeOptions: [5, 10, 25, 50, 100, 1000],
            }}
            cellEditable={{
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  console.log("newValue: " + newValue);
                  console.log(columnDef);
                  const visitsUpdate = [...visits];
                  //@ts-ignore
                  const index = rowData.tableData.id;
                  console.log(index);
                  const newData = (rowData[columnDef.field] = newValue);
                  visitsUpdate[index] = rowData;
                  setVisits([...visitsUpdate]);
                  setTimeout(resolve, 10);
                });
              },
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const visitsUpdate = [...visits];
                    console.log(visits[oldData.tableData.id].id);
                    const index = oldData.tableData.id;
                    visitsUpdate[index] = newData;
                    setVisits([...visitsUpdate]);

                    resolve();
                  }, 10);
                }),
            }}
            actions={[
              {
                icon: forwardRef((props, ref) => (
                  <CheckIcon {...props} ref={ref} />
                )),
                tooltip: "check as NOT visited",
                onClick: (event) => {
                  console.log(selected.current);
                  const visitsUpdate = [...visits];
                  for (let i = 0; i < selected.current.length; i++) {
                    const index = selected.current[i].tableData.id;
                    let newItem = selected.current[i];
                    newItem.visited = true;
                    visitsUpdate[index] = newItem;
                  }
                  setVisits([...visitsUpdate]);
                },
              },
              {
                icon: forwardRef((props, ref) => (
                  <HighlightOffIcon {...props} ref={ref} />
                )),
                tooltip: "check as visited",
                onClick: (event) => {
                  console.log(selected.current);
                  const visitsUpdate = [...visits];
                  for (let i = 0; i < selected.current.length; i++) {
                    const index = selected.current[i].tableData.id;
                    let newItem = selected.current[i];
                    newItem.visited = false;
                    visitsUpdate[index] = newItem;
                  }
                  setVisits([...visitsUpdate]);
                },
              },
              {
                ...saveButton,
              },
              {
                ...saveButton,
                isFreeAction: true,
              },
            ]}
            onSelectionChange={(rows) => {
              selected.current = rows;
            }}
          />
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  const uid = ctx.params.uid;
  let text = `select "FirstName","LastName","ResHouseNumber","ResPreDir","ResStreet","ResCityDesc","ResState","ResZip5",visit_uid as "id","notes","visited" from bcvoterregmarch21 JOIN visits ON bcvoterregmarch21_uid=voter_uid WHERE survey_uid=$1 ORDER BY "LastName" LIMIT 10`;
  let values = [uid];
  const dbResponse = await db.query(text, values);

  const sortedRows = sortByStreet(dbResponse.rows);

  const visits = sortedRows.map((visit) => {
    const address = `${visit.ResHouseNumber ? visit.ResHouseNumber : ""} ${
      visit.ResPreDir ? visit.ResPreDir : ""
    } ${visit.ResStreet ? visit.ResStreet : ""}, ${
      visit.ResCityDesc ? visit.ResCityDesc : ""
    } ${visit.ResState ? visit.ResState : ""}, ${
      visit.ResZip5 ? visit.ResZip5 : ""
    }`;
    const name = `${visit.FirstName ? visit.FirstName : ""} ${
      visit.LastName ? visit.LastName : ""
    }`;
    const notes = visit.notes ? visit.notes : "";
    const id = visit.id;
    let visited = visit.visited;

    return { address, name, notes, id, visited };
  });
  return { props: { visits: visits, original: visits } };
}

export default VisitsPage;
