import React, { useState, useEffect, useCallback } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "../components/Dialog";
import DataTable from "../components/DataTable";
import AddOrderForm from "../components/AddOrderForm";
import { fetchOrders } from "../helpers/api";

const OrdersTable = () => {
  const [data, setData] = useState([]);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  const fetchData = useCallback(() => {
    fetchOrders()
      .then((res) => {
        setData(res.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleAddOrderModal = () => {
    setShowAddOrderModal((prevState) => !prevState);
  };

  const handleFormClose = () => {
    toggleAddOrderModal();
    fetchData();
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
        <Grid container justifyContent="flex-end">
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
        <DataTable data={data} setData={setData} />
      </Box>
    </>
  );
};

export default OrdersTable;
