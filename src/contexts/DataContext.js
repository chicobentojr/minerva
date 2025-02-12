import { createContext } from "react";
import { loadData } from "../services/config";

export const DataRawContext = createContext({
  data: loadData(),
  setData: () => {},
});

export const TagsContext = createContext({
  tags: [],
  setTags: () => {},
});

// export const GlobalDataContext = createContext({
//   data: [],
//   tags: [],
//   setTags: () => {},
// });

// export const GlobalDataProvider = ({ children }) => {
//   // const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
//   const data = loadData();
//   const [tags, setTags] = useState(loadTags());

//   return (
//     <TasksContext.Provider value={tasks}>
//       <TasksDispatchContext.Provider value={dispatch}>
//         {children}
//       </TasksDispatchContext.Provider>
//     </TasksContext.Provider>
//   );
// };
