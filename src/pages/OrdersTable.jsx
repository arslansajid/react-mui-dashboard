import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "../components/Dialog";
import DataTable from "../components/DataTable";
import AddOrderForm from "../components/AddOrderForm";
import StatusFilter from "../components/StatusFilter";

const OrdersTable = ({ orders, reloadOrders }) => {
  const [data, setData] = useState([]);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  useEffect(() => {
    setData(orders);
  }, [orders]);

  const toggleAddOrderModal = () => {
    setShowAddOrderModal((prevState) => !prevState);
  };

  const handleFormClose = () => {
    toggleAddOrderModal();
    reloadOrders?.();
  };

  const handleStatusFilter = (status) => {
    if (status !== "") {
      const filteredData = orders.filter((order) => order.status === status);
      setData(filteredData);
    } else {
      setData(orders);
    }
  };

  return (
    <>
      {showAddOrderModal && (
        <Dialog
          open={showAddOrderModal}
          title=""
          message={<AddOrderForm onClose={handleFormClose} />}
          applyForm={() => toggleAddOrderModal()}
          cancelForm={() => toggleAddOrderModal()}
          hideActions
          size="sm"
        />
      )}
      <Box m={3}>
        <Grid container justifyContent="space-between">
          <Grid item xs={3}>
            <StatusFilter onChange={(value) => handleStatusFilter(value)} />
          </Grid>
          <Button
            onClick={toggleAddOrderModal}
            variant="contained"
            color="primary"
          >
            Add Order
          </Button>
        </Grid>
      </Box>
      <Box m={3}>
        <DataTable data={data} reloadOrders={reloadOrders} />
      </Box>
    </>
  );
};

export default OrdersTable;
