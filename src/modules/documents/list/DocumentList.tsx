import React from 'react';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';

import '../Documents.scss';
import {MuiThemeProvider} from "@material-ui/core";
import {customTheme} from "../details/styles/CustomDataTableTheme";
import {connect} from "react-redux";
import {existsAndNotNull} from "../../../utils/Utils";
import {ReduxStore} from "../../../utils/ReduxUtils";
import {DocumentTableData} from "../../../redux/types/Documents";
import {services} from "../../../context";


export interface DocumentListProps {
    onItemSelected: (index: number) => void;
    onManyRowsSelected: () => void;
    data: string[][];
    columns: string[];
}

interface StateProps {
    selectedItem?: number | null;
    documentList?: DocumentTableData;
}

class DocumentList extends  React.Component<DocumentListProps & StateProps> {
    setSelectedItem = (dataIndex: number) => {
        const selectedItem = this.props.selectedItem;

        if(selectedItem || selectedItem === null) {
            if(selectedItem !== dataIndex || selectedItem === null) {
                this.props.onItemSelected(dataIndex);
            } else {
                this.props.onManyRowsSelected();
            }
        }
    };

    selectedRows = () => {
        if(existsAndNotNull(this.props.selectedItem)) {
            return [this.props.selectedItem as number];
        }
        return [];
    };

    tableOptions: MUIDataTableOptions = {
        onRowsSelect: ((currentRowsSelected, rowsSelected) => {
            if(rowsSelected[0]) {
                this.setSelectedItem(rowsSelected[0].dataIndex)
            } else {
                this.props.onManyRowsSelected();
            }
        }),
        selectableRows: 'single' || 'multiple',
        selectableRowsOnClick: true,
        rowsSelected: this.selectedRows(),
        onTableChange: ((action, tableState) => {
            console.log(action, tableState);

            switch(action) {
                case 'changePage':
                case 'search':
                    services.documentService.fetchDocumentTableData(tableState.searchText !== null ? tableState.searchText : '',
                        tableState.page, undefined, tableState.rowsPerPage, false)
            }

        }),
        onTableInit: (((action, tableState) => {
            console.log(action, tableState)
            services.documentService.fetchDocumentTableData(tableState.searchText !== null ? tableState.searchText : '',
                tableState.page, undefined, tableState.rowsPerPage, false)
        }))
    };

    /*
        const fetchDocumentTableData = (searchText?: string, page?: number, sort?: any, limit?: number, archived?: boolean) => {
     */

    render() {
        if(!this.props.documentList || !this.props.documentList.table) {
            return null;
        }

        const { title, data, columns } = this.props.documentList.table;

        return (
            <div className='document-list'>
                <MuiThemeProvider theme={customTheme}>
                    <MUIDataTable
                        title={title}
                        data={data}
                        columns={columns}
                        options={this.tableOptions}
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}

const mapStateToProps = (store: ReduxStore) => {
    return {
        selectedItem: store.documents.documentId,
        documentList: store.documents.documentList
    }
};

export default connect(mapStateToProps, null)(DocumentList);