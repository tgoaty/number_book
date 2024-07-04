import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import RecordsListBlock from "@/widgets/RecordsListBlock.tsx";
import AddNewRecordModal from "@/features/addNewRecord/ui/AddNewRecordModal.tsx";
import GetCSVFile from "@/features/GetCSVFile/GetCSVFile.tsx";
import LoadCSVFile from "@/features/loadCSVFile/LoadCSVFile.tsx";

const contentStyle = {
    height: 'calc(100vh - 64px)'
}

function Index() {

    return (
        <Layout>
            <Header style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <AddNewRecordModal/>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", columnGap: 20}}>
                    <LoadCSVFile/>
                    <GetCSVFile/>
                </div>

            </Header>
            <Content style={contentStyle}>
                <RecordsListBlock/>
            </Content>
        </Layout>
    )
}

export default Index
