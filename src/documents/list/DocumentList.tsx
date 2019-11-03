import React from 'react';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';

import '../Documents.scss';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {customTheme} from "../details/styles/CustomDataTableTheme";

const columns = ["Column 1", "Column2", "Column 3", "Column 4"]

const data = [
    ["1", "Test Corp", "Yonkers", "NY"],
    ["2", "Test Corp", "Hartford", "CT"],
    ["3", "Test Corp", "Tampa", "FL"],
    ["4", "Test Corp", "Dallas", "TX"],
    ["5", "Test Corp", "Yonkers", "NY"],
    ["6", "Test Corp", "Hartford", "CT"],
    ["7", "Test Corp", "Tampa", "FL"],
    ["8", "Test Corp", "Dallas", "TX"],
    ["9", "Test Corp", "Yonkers", "NY"],
    ["10", "Test Corp", "Hartford", "CT"],
    ["11", "Test Corp", "Tampa", "FL"],
    ["12", "Test Corp", "Dallas", "TX"],
    ["13", "Test Corp", "Dallas", "TX"],
    ["14", "Test Corp", "Yonkers", "NY"],
    ["15", "Test Corp", "Hartford", "CT"],
    ["16", "Test Corp", "Tampa", "FL"],
    ["17", "Test Corp", "Dallas", "TX"],
];

export interface DocumentListProps {
    onItemSelected: (index: string) => void;
    onManyRowsSelected: () => void;
}

const DocumentList = (props: DocumentListProps) => {

    const tableOptions: MUIDataTableOptions = {
        onRowClick: (rowData) => {
            props.onItemSelected(rowData[0]);
        }
    };

    return (
        <div className='document-list'>
            <MuiThemeProvider theme={customTheme}>
                <MUIDataTable
                    title={"New table"}
                    data={data}
                    columns={columns}
                    options={tableOptions}
                />
            </MuiThemeProvider>
        </div>
    )
};

export default DocumentList;