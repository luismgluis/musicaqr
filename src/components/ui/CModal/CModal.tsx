import { Grid, Modal, ModalProps } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
const TAG = "CUSTOM MODAL";
interface CModalProps extends ModalProps {}
const CModal: React.FC<CModalProps> = (props) => {
  const close = () => {
    const customfn: any = props.onClose;
    if (customfn) {
      customfn();
    }
  };
  return (
    <Modal {...props} open={props.open} onClose={props.onClose}>
      <div onClick={() => close()}>
        <Grid container display="flex" justifyContent="center">
          <Grid xs={12} sm={10} md={8} item>
            <div onClick={(e) => e.stopPropagation()}>
              <Box margin={3} maxHeight={"calc(100vh - 50px)"} overflow="auto">
                {props.children}
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};
export default CModal;
