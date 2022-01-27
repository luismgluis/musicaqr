import { CleaningServices, Restore } from "@mui/icons-material";
import {
	Box,
	Button,
	IconButton,
	TextareaAutosize,
	TextareaAutosizeProps,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const CTextArea: React.FC<TextareaAutosizeProps> = (props) => {
	const [value, setValue] = useState("");
	const customOnChange = useCallback(
		(e: any) => {
			setValue(e.target.value);
			props.onChange && props.onChange(e);
		},
		[props]
	);
	useEffect(() => {
		props.value && setValue(props.value + "");
	}, [props.value]);
	return (
		<Box width="100%" position={"relative"} overflow={"auto"}>
			<TextareaAutosize
				minRows={6}
				name="textarea"
				aria-label="empty textarea"
				placeholder="Empty"
				{...props}
				style={{
					width: "100%",
					maxWidth: "100%", //ssid_name_suba
					borderRadius: 6,
					border: "1px solid #e3e3e3",
					padding: 10,
					height: 250,
					overflowY: "auto",
					...props.style,
				}}
				value={value}
				onChange={(e) => customOnChange(e)}
			/>
			<IconButton
				onClick={() => setValue(props.defaultValue + "" || "")}
				sx={{ position: "absolute", top: 0, right: 0 }}
			>
				<Restore />
			</IconButton>
		</Box>
	);
};
export default CTextArea;
