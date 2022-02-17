import { Box } from "@mui/material";

type BusinessCardProps = {};
const BusinessCard: React.FC<BusinessCardProps> = ({}) => {
	return (
		<Box component={"h3"} className="businessName">
			El bar del barrio
		</Box>
	);
};
export default BusinessCard;
