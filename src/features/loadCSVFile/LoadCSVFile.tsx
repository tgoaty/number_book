import React, {useState} from 'react';
import {Button, Checkbox, Modal, notification, Upload} from "antd";
import {UploadOutlined, VerticalAlignTopOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import Papa from "papaparse";
import {addRecord, loadNewRecordsBook} from "@/app/store/redusers/recordsSlice";
import {Record} from "@/shared/types/types";
import {RcFile} from "antd/es/upload";
import {RootState} from "@/app/store/store.ts";
import {NotificationPlacement} from "antd/es/notification/interface";

const LoadCsvFile: React.FC = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [checkboxMode, setCheckboxMode] = useState(false);
    const recordsList = useSelector((state: RootState) => state.recordsSlice.recordsList);
    const dispatch = useDispatch();

    const openNotification = (placement: NotificationPlacement, number: string) => {
        notification.info({
            message: `Не вышло добавить ${number}.`,
            description: 'Такой номер уже существует',
            placement
        });
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
                        records.forEach((item) => {
                            const existingRecord = recordsList.find((record) => record.mobileNumber === item.mobileNumber);
                            if (existingRecord) {
                                openNotification('bottomRight', item.mobileNumber);
                            } else {
                                dispatch(addRecord(item));
                            }
                        });
                    }
                }
            });
        };

        reader.readAsText(file as File);
        return false;
        setIsModalOpen(false);
    };

    return (
        <>
            <Button title="Загрузить CSV" onClick={() => {
                setIsModalOpen(true);
                setCheckboxMode(false);
            }}>
                <VerticalAlignTopOutlined style={{fontSize: 20}}/>
            </Button>
            <Modal
                footer={null}
                title="Загрузить свою номерную книгу"
                open={modalIsOpen}
                onCancel={() => setIsModalOpen(false)}
            >
                <Upload
                    beforeUpload={handleUpload}
                    accept=".csv"
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined/>}>Загрузить CSV</Button>
                </Upload>
                <Checkbox checked={checkboxMode} defaultChecked={false} style={{marginTop: 20}}
                          onChange={(e) => setCheckboxMode(e.target.checked)}>
                    Полностью заменить текущую книгу на новую.
                </Checkbox>
            </Modal>
        </>
    );
};

export default LoadCsvFile;
