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
    ChangeSplitProportionsAction,
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
}

export type DocumentsListPageProps = StateProps & DispatchProps;

const DocumentsListPage = (props: DocumentsListPageProps) => {
    const { selectedItem } = props;
    const detailsVisible = selectedItem !== null;
    let className = 'document-page';

    if(detailsVisible) {
        className = `${className} splitter`
    }

    const handleSplitterChange = (secondarySize: number) => {
        if(secondarySize - SECONDARY_MIN_SIZE < SPLITTER_SIZE_ERROR_THRESHOLD) {
            props.setLastSplitterAction(SPLITTER_MIN_SECONDARY_ACTION);
        } else {
            props.setLastSplitterAction(SPLITTER_MAX_SECONDARY_ACTION);
        }
    };

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
                    <DocumentList onItemSelected={props.setSelectedItem} onManyRowsSelected={props.resetSelection}/>
                    <DocumentInformations selectedItemId={!selectedItem ? '' : selectedItem} onCloseDialog={props.resetSelection} />
                </SplitterLayout>
            ) : (
                <DocumentList onItemSelected={props.setSelectedItem} onManyRowsSelected={props.resetSelection}/>
            )}
        </div>
    )
};

const mapStateToProps = (store: ReduxStore) => {
    return {
        selectedItem: store.documents.documentId
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