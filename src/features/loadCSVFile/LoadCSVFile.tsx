import React, {useState} from 'react';
import {Button, Checkbox, Modal, Upload} from "antd";
import {UploadOutlined, VerticalAlignTopOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import Papa from "papaparse";
import {addNewRecordsBook, loadNewRecordsBook} from "@/app/store/redusers/recordsSlice";
import {Record} from "@/shared/types/types";
import {RcFile} from "antd/es/upload";

const LoadCsvFile: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkboxMode, setCheckboxMode] = useState(false)
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpload = (file: RcFile): boolean => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            Papa.parse<Record>(text, {
                header: true,
                complete: (results) => {
                    const records: Record[] = results.data as Record[];
                    if (checkboxMode) {
                        dispatch(loadNewRecordsBook(records));
                    } else {
                        dispatch(addNewRecordsBook(records));
                    }

                }
            });
        };

        reader.readAsText(file as File);
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
                <Checkbox style={{marginTop: 20}} onChange={(e) => setCheckboxMode(e.target.checked)}>Полностью заменить
                    текущую книгу на новую.</Checkbox>
            </Modal>
        </>
    );
};

export default LoadCsvFile;
