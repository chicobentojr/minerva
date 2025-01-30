import { RAW_DATA } from "../../temp/2025-01 fatura bradesco";

export const loadConfig = () => {
  return {
    filename: "example.csv",
  };
};

export const loadData = () => {
  return RAW_DATA;
};

export const loadTags = () => [
  { label: "Amazon", filters: [] },
  { label: "Uber", filters: [] },
  // { label: "Riacheulo", filters: ["riachuelo"] },
  // { label: "Ifood", filters: ["ifood"] },
  // { label: "Docelandia", filters: ["docelandia"] },
  // { label: "Kitanda", filters: ["antoniaelisangela"] },
  // { label: "Mercadinho", filters: ["lvconveniencia"] },
  // { label: "Cachorro Quente", filters: ["betellanches"] },
  // { label: "Padaria", filters: ["delicia de pao"] },
  // { label: "Iskisita", filters: ["cirne irmaos"] },
  // { label: "Pizzaria", filters: ["house paraibano"] },
  // { label: "Kitanda 2", filters: ["kitanda"] },
  // { label: "Outros", filters: [""] },
];
