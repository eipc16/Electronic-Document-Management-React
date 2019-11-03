import React from "react";
import MUIDataTable from "mui-datatables";

import '../styles/DocumentDetails.scss';
import {DocumentProps} from "./DocumentInfo";
import {customTheme} from "../styles/CustomDataTableTheme";
import {MuiThemeProvider} from "@material-ui/core";
import {DocumentTableData} from "../../../redux/types/Documents";
import {ReduxStore} from "../../../utils/ReduxUtils";
import {connect} from "react-redux";

interface StateProps {
    details?: DocumentTableData;
}

export type DocumentDetailsProps = DocumentProps & StateProps;

const DocumentDetails = (props: DocumentDetailsProps) => {

    if(!props.details || !props.details.table) {
        return null;
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
        <div className='document-info doc-details'>
            <MuiThemeProvider theme={customTheme}>
                <MUIDataTable
                    columns={props.details.table.columns}
                    data={props.details.table.data}
                    title={props.details.table.title}
                    options={options} />
            </MuiThemeProvider>
            <div className='document-miniature-container'>
                <div className='miniature' />
            </div>
        </div>
)
};

const mapStateToProps = (store: ReduxStore, ownProps: DocumentProps) => {
    return {
        details: store.documents.documentDetails,
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(DocumentDetails);