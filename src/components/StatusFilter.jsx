import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import { StatusOptions } from "../helpers/constants";
import MenuItem from "@material-ui/core/MenuItem";

const StatusFilter = (props) => {
  const { onChange } = props;
  const [statusFilter, setStatusFilter] = useState("");

  const statusOptionsWithDefaultOption = [
    { label: "None", value: "" },
    ...StatusOptions,
  ];

  return (
    <TextField
      select
      fullWidth
      variant="outlined"
      size="small"
      name="statusFilter"
      label="Status"
      value={statusFilter}
      onChange={(e) => {
        const { value } = e.target;
        setStatusFilter(value);
        onChange?.(value);
      }}
    >
      {statusOptionsWithDefaultOption.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default StatusFilter;
