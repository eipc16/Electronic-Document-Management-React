import React from "react";
import {DocumentProps} from "./DocumentInfo";
import {customTheme} from "../styles/CustomDataTableTheme";
import {MuiThemeProvider} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {ReduxStore} from "../../../utils/ReduxUtils";
import {connect} from "react-redux";
import {DocumentTableData} from "../../../redux/types/Documents";
import {ErrorPage} from "../../../common/ErrorPage";

import '../styles/DocumentVersions.scss'

interface StateProps {
    versions?: DocumentTableData;
}

export type DocumentVerionsProps = DocumentProps & StateProps;

const DocumentVersions = (props: DocumentVerionsProps) => {
    if(!props.versions || !props.versions.table) {
        return <ErrorPage />
    }

    const options = {
        filterType: undefined,
        pagination: false,
        selectableRows: undefined,
        download: false,
        filter: false,
        viewColumns: false
    };

    return (
        <div className='document-info Verions'>
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