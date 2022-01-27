import {
  Select,
  MenuItem,
  SelectProps,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
const TAG = "CUSTOM SELECT";
type SelectItems = {
  key: string;
  value: string;
  data: any;
};
interface CSelectProps extends SelectProps {
  value: string;
  items: SelectItems[];
  onSelectItem: (data: any) => void;
}
const CSelect: React.FC<CSelectProps> = (props) => {
  console.log(TAG, "render");
  const [currentValue, setValue] = useState("");
  const [state, setState] = useState(0);
  useEffect(() => {
    if (props.value) {
      setValue(props.value + "");
    }
  }, [props.value]);
  useEffect(() => {
    if (props.items.length > 0 && state < 1) {
      if (props.value === "") {
        setState(1);
        setValue(props.items[0].key);
      }
    }
  }, [props.items, props.value, state]);

  useEffect(() => {
    const data = props.items.filter((item) => item.key === currentValue);
    if (data.length > 0) {
      props.onSelectItem(data[0].data);
    }
  }, [currentValue, props]);

  console.log(TAG, currentValue);
  return (
    <FormControl fullWidth={props.fullWidth || true} sx={{ my: 1 }}>
      <InputLabel variant="standard" htmlFor={props.id} sx={{ p: 1 }}>
        {props.label}
      </InputLabel>
      <Select
        {...props}
        value={currentValue}
        variant="filled"
        onChange={(e) => setValue(e.target.value + "")}
      >
        {props.items.map((item, index) => (
          <MenuItem key={`CSelectItem${index}`} value={item.key}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default CSelect;
