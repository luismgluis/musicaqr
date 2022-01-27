import React, { useCallback, useEffect } from "react";
import {
	DialogProps,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";
import { useAlert, useCustomAlert } from "./useAlert";

const TAG = "CUSTOM ALERT";
type CustomAlertProps = {
	prop1?: any;
};
const CustomAlert: React.FC<CustomAlertProps> = ({ prop1 }) => {
	console.log(TAG, "render");
	const [open, setOpen] = React.useState(false);
	const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
	const alertInfo = useCustomAlert();
	const alert = useAlert();

	const handleClose = useCallback(
		(res: boolean = false) => {
			setOpen(false);
			if (alertInfo.onClose) alertInfo.onClose(res);
			alert.info({ enabled: false });
		},
		[alert, alertInfo]
	);

	useEffect(() => {
		if (alertInfo.enabled) {
			setOpen(true);
		}
	}, [alertInfo]);

	console.log("alertInfo", alertInfo);
	return (
		<div>
			<Dialog
				open={open}
				onClose={() => handleClose(false)}
				scroll={scroll}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
				BackdropProps={{ style: { backgroundColor: "#07364ae6" } }}
			>
				<DialogTitle id="scroll-dialog-title">
					{alertInfo.title || ""}
				</DialogTitle>
				{alertInfo.body && (
					<DialogContent dividers={scroll === "paper"}>
						{alertInfo.body}
					</DialogContent>
				)}

				<DialogActions>
					{alertInfo.noButton && (
						<Button
							color="error"
							onClick={() => handleClose(false)}
						>
							{alertInfo.noButton}
						</Button>
					)}
					{alertInfo.okButton && (
						<Button
							color="primary"
							variant="contained"
							onClick={() => handleClose(true)}
						>
							{alertInfo.okButton}
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default CustomAlert;
