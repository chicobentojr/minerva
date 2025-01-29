import { createContext } from "react";
import { loadData } from "../services/config";

export const DataRawContext = createContext(loadData());
