import React from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";

import '../styles/DocumentDetails.scss';
import {DocumentProps} from "./DocumentInfo";
import {connect} from "react-redux";

import sample_document from '../../../../static/sample_document.png';
import {DocumentTableData} from "../../../../redux/types/Documents";
import {ReduxStore} from "../../../../utils/ReduxUtils";
import {services} from "../../../../context";

interface StateProps {
    details?: DocumentTableData;
}

export type DocumentDetailsProps = DocumentProps & StateProps;

const DocumentDetails: React.FC<DocumentDetailsProps> = (props: DocumentDetailsProps) => {

    if (!props.details || !props.details.table) {
        return null;
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
            services.documentService.fetchDocumentDetailsTableData(Number.parseInt(props.selectedItemId))
        }))
    };

    return (
        <div className='document-info doc-details'>
            <MUIDataTable
                columns={props.details.table.columns}
                data={props.details.table.data}
                title={props.details.table.title + " | " + props.selectedItemId}
                options={options}
            />
            <div className='document-miniature-container'>
                <img alt="document-miniature" className='miniature' src={sample_document}/>
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