import React, {useState} from 'react';
import {Button, Modal, Upload} from "antd";
import {UploadOutlined, VerticalAlignTopOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import Papa from "papaparse";
import {loadNewRecordsBook} from "@/app/store/redusers/recordsSlice.ts";


const LoadCsvFile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            Papa.parse(text, {
                header: true,
                complete: (results) => {
                    dispatch(loadNewRecordsBook(results.data));
                }
            });
        };
        reader.readAsText(file);
        setIsModalOpen(false);
        return false;
    };
    return (


        <>
            <Button title="Загрузить CSV" onClick={showModal}>
                <VerticalAlignTopOutlined style={{fontSize: 20}}/>
            </Button>
            <Modal footer={null} title="Загрузить свою номерную книгу" open={isModalOpen} onCancel={handleCancel}>
                <Upload
                    beforeUpload={handleUpload}
                    accept=".csv"
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined/>}>Загрузить CSV</Button>
                </Upload>
            </Modal>
        </>
    );
};

export default LoadCsvFile;