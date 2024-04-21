import { FontAwesomeIconsData } from "./FontawesomeIconsData";

export const SHARED_ARTIFACT_LIST_DATA = [
  {
    id: 1,
    title: "Bank",
    ...FontAwesomeIconsData["Bank"],
    financialArtifactType: "BANK",
  },
  {
    id: 2,
    title: "Post Office",
    ...FontAwesomeIconsData["Post Office"],
    financialArtifactType: "POSTAL",
  },
  {
    id: 3,
    title: "Insurance",
    ...FontAwesomeIconsData["Insurance"],
    financialArtifactType: "INSURANCE",
  },

  {
    id: 4,
    title: "Demat",
    ...FontAwesomeIconsData["demat"],
    financialArtifactType: "DEMAT",
  },
  {
    id: 5,
    title: "Proprietorship",
    ...FontAwesomeIconsData["proprietorship"],
    financialArtifactType: "PROPRIETORSHIP",
  },
  {
    id: 6,
    title: "Partnership",
    ...FontAwesomeIconsData["partnership"],
    financialArtifactType: "PARTNERSHIP",
  },
  {
    id: 6,
    title: "Private Limited",
    ...FontAwesomeIconsData["privateLimitedCompany"],
    financialArtifactType: "PRIVATELIMITEDCOMPANY",
  },
  {
    id: 7,
    title: "Cash",
    ...FontAwesomeIconsData["Cash"],
    financialArtifactType: "CASH",
  },
  {
    id: 8,
    title: "Real Estate",
    ...FontAwesomeIconsData["Real Estate"],
    financialArtifactType: "REALESTATE",
  },
  {
    id: 9,
    title: "Provident Fund",
    ...FontAwesomeIconsData["Provident Fund"],
    financialArtifactType: "PROVIDENTFUND",
  },
  {
    id: 10,
    title: "Coming Soon",
    ...FontAwesomeIconsData["Custom Entry"],
    financialArtifactType: "",
    disabled: true,
  },
];
