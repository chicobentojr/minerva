import { RAW_DATA } from "../../temp/2025-01 fatura bradesco";
import { isRowFromTag } from "./tags";
import moment from "moment";

export const loadConfig = () => {
  return {
    filename: "example.csv",
  };
};

export const loadData = () => {
  const data = RAW_DATA.map((row, index) => ({
    ...row,
    key: index,
    isoDate: moment(row.date, "DD/MM/YYYY").toISOString(),
  }));
  const tags = loadTags();

  return fillDataWithTags(data, tags);
};

export const fillDataWithTags = (data, tags) => {
  return data.map((row) => {
    const rowTags = tags
      .filter((tag) => isRowFromTag(row, tag))
      .map((tag) => tag.label);
    return { ...row, tags: rowTags };
  });
};

export const loadTags = () => [
  { label: "Amazon", filters: [] },
  { label: "Uber", filters: [] },
  { label: "Riacheulo", filters: ["riachuelo"] },
  { label: "Ifood", filters: ["ifood", "ifd"] },
  {
    label: "Compras casa",
    filters: [
      "antoniaelisangela",
      "kitanda",
      "delicia de pao",
      "house paraibano",
      "cirne irmaos",
      "betellanches",
    ],
  },

  // { label: "Kitanda", filters: ["antoniaelisangela", "kitanda"] },
  // { label: "Docelandia", filters: [] },
  // { label: "Mercadinho", filters: [""] },
  // { label: "Cachorro Quente", filters: ["betellanches"] },
  // { label: "Padaria", filters: ["delicia de pao"] },
  // { label: "Iskisita", filters: ["cirne irmaos"] },
  // { label: "Pizzaria", filters: ["house paraibano"] },
  // { label: "Kitanda 2", filters: ["kitanda"] },
  // { label: "Outros", filters: [""] },
];
