import { RAW_DATA } from "../../temp/2025-01 fatura bradesco";
import moment from "moment";

export const loadConfig = () => {
  return {
    filename: "example.csv",
  };
};

export const loadData = () => {
  return RAW_DATA.map((row, index) => ({
    ...row,
    key: index,
    isoDate: moment(row.date, "DD/MM/YYYY").toISOString(),
  }));
};

export const loadTags = () => [
  { label: "Amazon", filters: [] },
  { label: "Uber", filters: [] },
  // { label: "Riacheulo", filters: ["riachuelo"] },
  // { label: "Ifood", filters: ["ifood", "ifd"] },
  // { label: "Kitanda", filters: ["antoniaelisangela", "kitanda"] },
  // { label: "Docelandia", filters: [] },
  // { label: "Mercadinho", filters: ["lvconveniencia"] },
  // { label: "Cachorro Quente", filters: ["betellanches"] },
  // { label: "Padaria", filters: ["delicia de pao"] },
  // { label: "Iskisita", filters: ["cirne irmaos"] },
  // { label: "Pizzaria", filters: ["house paraibano"] },
  // { label: "Kitanda 2", filters: ["kitanda"] },
  // { label: "Outros", filters: [""] },
];
