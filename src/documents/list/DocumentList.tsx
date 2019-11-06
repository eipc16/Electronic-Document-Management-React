import React, {useState} from 'react';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';

import '../Documents.scss';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {customTheme} from "../details/styles/CustomDataTableTheme";
import {ReduxStore} from "../../utils/ReduxUtils";
import {connect} from "react-redux";


export interface DocumentListProps {
    onItemSelected: (index: string) => void;
    onManyRowsSelected: () => void;
    data: string[][];
    columns: string[];
}

interface StateProps {
    selectedItem?: string | null;
}

class DocumentList extends  React.Component<DocumentListProps & StateProps, {previousClick: string}> {

    constructor(props: DocumentListProps & StateProps) {
        super(props);

        this.state = {
            previousClick: ""
        }
    }

    setPreviousClick = (dataIndex: number) => {
        const selectedItem = this.props.selectedItem;

        if(selectedItem || selectedItem === null) {

            const data = this.props.data[dataIndex][0];

            if(selectedItem !== data || selectedItem === null) {
                this.props.onItemSelected(data);
            } else {
                this.props.onManyRowsSelected();
            }
        }
    };

    tableOptions: MUIDataTableOptions = {
        onRowClick: (rowData, rowMeta) => {
            this.setPreviousClick(rowMeta.dataIndex);
        },
        selectableRows: 'single' || 'multiple',
        selectableRowsOnClick: true
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