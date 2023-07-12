import { Text, View } from "react-native"
import FinancialInstitutionHoldingCard from "../components/Common/FinancialInstitutionHoldingCard";
import { useRoute } from "@react-navigation/native";

const AssetSharingScreen = ({ route }) => {

    console.log(route.params);

    return (
            <FinancialInstitutionHoldingCard holdingClass={route.params.item.holdingClass} content={[{key: "diivdn"}]} />
    )
}

export default AssetSharingScreen
