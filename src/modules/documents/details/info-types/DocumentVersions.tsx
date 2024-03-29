import React from "react";
import {DocumentProps} from "./DocumentInfo";
import {customTheme} from "../styles/CustomDataTableTheme";
import {MuiThemeProvider} from "@material-ui/core";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {ReduxStore} from "../../../../utils/ReduxUtils";
import {connect} from "react-redux";
import {DocumentTableData} from "../../../../redux/types/Documents";
import {ErrorPage} from "../../../common/ErrorPage";

import '../styles/DocumentVersions.scss'
import {services} from "../../../../context";

interface StateProps {
    versions?: DocumentTableData;
}

export type DocumentVerionsProps = DocumentProps & StateProps;

const DocumentVersions = (props: DocumentVerionsProps) => {
    if(!props.versions || !props.versions.table) {
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
            services.documentService.fetchDocumentVersionsTableData(Number.parseInt(props.selectedItemId))
        }))
    };

    return (
        <div className='document-info versions'>
            <MuiThemeProvider theme={customTheme}>
                <MUIDataTable
                    columns={props.versions.table.columns}
                    data={props.versions.table.data}
                    title={props.versions.table.title}
                    options={options}/>
            </MuiThemeProvider>
        </div>
    )
};

const mapStateToProps = (store: ReduxStore, ownProps: DocumentProps) => {
    return {
        versions: store.documents.documentVersions,
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(DocumentVersions);