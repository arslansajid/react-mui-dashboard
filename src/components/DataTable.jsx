import React from "react";
import MUIDataTable from "mui-datatables";
import { deleteOrder } from "../helpers/api";
import moment from "moment";

const options = {
  filterType: "checkbox",
  filter: false,
  download: false,
  print: false,
  searchOpen: true,
  selectableRows: false,
};

const DataTable = ({ data, setData }) => {
  const handleOrderDelete = (index) => {
    const selectedOrderID = data[index].id;

    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete this order?")) {
      deleteOrder(selectedOrderID)
        .then((res) => {
          const ordersCopy = [...data];
          ordersCopy.splice(index, 1);
          setData(ordersCopy);
          alert("Order deleted successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "seller",
      label: "Seller",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "revenue",
      label: "Revenue",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("Do MMM YYYY");
        },
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <div>
              <button onClick={() => handleOrderDelete(dataIndex)}>
                Delete
              </button>
            </div>
          );
        },
      },
    },
  ];

  return (
    <MUIDataTable title={""} data={data} columns={columns} options={options} />
  );
};

export default DataTable;
