import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store.ts";
import Papa from "papaparse";
import {Button} from "antd";
import {VerticalAlignBottomOutlined} from "@ant-design/icons";



const GetCsvFile = () => {
    const recordList = useSelector((state: RootState) => (state.recordsSlice.recordsList))

    const downloadCSV = () => {
        const csv = Papa.unparse(recordList);
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "records.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Button title="Выгрузить CSV" onClick={downloadCSV}>
            <VerticalAlignBottomOutlined style={{fontSize: 20}}/>
        </Button>
    );
};

export default GetCsvFile;