import { DataRawContext } from "../contexts/DataContext";
import RawTable from "../components/Table/RawTable";
import { useContext } from "react";

const Home = () => {
    const data = useContext(DataRawContext)
    return (
        <>
            <h1>Home</h1>
            <RawTable rawData={data}></RawTable>
        </>
    )
}

export default Home;