import React, {useState} from 'react';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';

import '../Documents.scss';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {customTheme} from "../details/styles/CustomDataTableTheme";
import {connect} from "react-redux";
import {existsAndNotNull} from "../../../utils/Utils";
import {ReduxStore} from "../../../utils/ReduxUtils";


export interface DocumentListProps {
    onItemSelected: (index: number) => void;
    onManyRowsSelected: () => void;
    data: string[][];
    columns: string[];
}

interface StateProps {
    selectedItem?: number | null;
}

class DocumentList extends  React.Component<DocumentListProps & StateProps> {

    constructor(props: DocumentListProps & StateProps) {
        super(props);
    }

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
    }

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
        rowsSelected: this.selectedRows()
    };

    render() {
        return (
            <div className='document-list'>
                <MuiThemeProvider theme={customTheme}>
                    <MUIDataTable
                        title={"New table"}
                        data={this.props.data}
                        columns={this.props.columns}
                        options={this.tableOptions}
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}

const mapStateToProps = (store: ReduxStore) => {
    return {
        selectedItem: store.documents.documentId
    }
};

export default connect(mapStateToProps, null)(DocumentList);