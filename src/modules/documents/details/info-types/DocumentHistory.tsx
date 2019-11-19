import React from "react";
import {DocumentProps} from "./DocumentInfo";
import {customTheme} from "../styles/CustomDataTableTheme";
import {MuiThemeProvider} from "@material-ui/core";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {ReduxStore} from "../../../../utils/ReduxUtils";
import {connect} from "react-redux";
import {DocumentTableData} from "../../../../redux/types/Documents";
import {ErrorPage} from "../../../common/ErrorPage";

import '../styles/DocumentHistory.scss'
import {services} from "../../../../context";

interface StateProps {
    history?: DocumentTableData;
}

export type DocumentHistoryProps = DocumentProps & StateProps;

const DocumentHistory = (props: DocumentHistoryProps) => {
    if(!props.history || !props.history.table) {
        return <ErrorPage />
    }

    const options: MUIDataTableOptions = {
        filterType: undefined,
        pagination: false,
        selectableRows: undefined,
        download: false,
        filter: false,
        viewColumns: false,
        onTableInit: (((action, tableState) => {
            console.log(action, tableState);
            services.documentService.fetchDocumentHistoryTableData(Number.parseInt(props.selectedItemId))
        }))
    };

    return (
        <div className='document-info history'>
            <MuiThemeProvider theme={customTheme}>
                <MUIDataTable
                    columns={props.history.table.columns}
                    data={props.history.table.data}
                    title={props.history.table.title}
                    options={options}/>
            </MuiThemeProvider>
        </div>
    )
};

const mapStateToProps = (store: ReduxStore, ownProps: DocumentProps) => {
    return {
        history: store.documents.documentHistory,
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(DocumentHistory);