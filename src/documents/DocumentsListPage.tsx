import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import './Documents.scss';
import DocumentList from "./list/DocumentList";
import DocumentInformations from "./details/DocumentInformations";
import {ReduxStore} from "../utils/ReduxUtils";
import {connect} from "react-redux";
import {setLastSplitterAction, setSelectedDocument} from "../redux/actions/Documents";
import {
    ChangeSplitProportionsAction, hideSecondaryPane,
    PRIMARY_MIN_SIZE,
    SECONDARY_MIN_SIZE,
    setSplitterChangeTransition,
    SPLITTER_MAX_SECONDARY_ACTION,
    SPLITTER_MIN_SECONDARY_ACTION,
    SPLITTER_SIZE_ERROR_THRESHOLD
} from "./SplitterUtils";

interface DispatchProps {
    setSelectedItem: (id: string) => void;
    resetSelection: () => void;
    setLastSplitterAction: (action: ChangeSplitProportionsAction) => void;
}

interface StateProps {
    selectedItem?: string | null;
    lastSplitterAction: ChangeSplitProportionsAction;
}

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

export type DocumentsListPageProps = StateProps & DispatchProps;

const DocumentsListPage = (props: DocumentsListPageProps) => {
    const { selectedItem } = props;
    const detailsVisible = selectedItem !== null;
    let className = 'document-page';

    if(detailsVisible) {
        className = `${className} splitter`
    }

    const handleSplitterChange = (secondarySize: number) => {

        const minThreshold = secondarySize - SECONDARY_MIN_SIZE < SPLITTER_SIZE_ERROR_THRESHOLD;

        if(minThreshold && props.lastSplitterAction === SPLITTER_MAX_SECONDARY_ACTION) {
            props.setLastSplitterAction(SPLITTER_MIN_SECONDARY_ACTION);
        } else if(!minThreshold && props.lastSplitterAction === SPLITTER_MIN_SECONDARY_ACTION) {
            props.setLastSplitterAction(SPLITTER_MAX_SECONDARY_ACTION);
        }
    };

    const closeInformations = () => {
        hideSecondaryPane(props.resetSelection)
    }

    return (
        <div className={className}>
            { detailsVisible ? (
                <SplitterLayout
                    vertical={true}
                    percentage={true}
                    primaryMinSize={PRIMARY_MIN_SIZE}
                    secondaryMinSize={SECONDARY_MIN_SIZE}
                    onDragStart={() => setSplitterChangeTransition(false)}
                    onDragEnd={() => setSplitterChangeTransition(true)}
                    onSecondaryPaneSizeChange={handleSplitterChange}
                >
                    <DocumentList onItemSelected={props.setSelectedItem} onManyRowsSelected={closeInformations} data={data} columns={columns}/>
                    <DocumentInformations selectedItemId={!selectedItem ? '' : selectedItem} onCloseDialog={closeInformations} />
                </SplitterLayout>
            ) : (
                <DocumentList onItemSelected={props.setSelectedItem} onManyRowsSelected={closeInformations} data={data} columns={columns}/>
            )}
        </div>
    )
};

const mapStateToProps = (store: ReduxStore) => {
    return {
        selectedItem: store.documents.documentId,
        lastSplitterAction: store.documents.lastSplitterAction
    }
};

const mapDispatchToProps: DispatchProps = {
    setSelectedItem: (id: string) => setSelectedDocument(id),
    resetSelection: () => setSelectedDocument(null),
    setLastSplitterAction: (action: ChangeSplitProportionsAction) => setLastSplitterAction(action)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentsListPage);