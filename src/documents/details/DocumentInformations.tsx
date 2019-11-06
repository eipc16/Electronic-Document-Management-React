import React from 'react';
import {connect} from "react-redux";
import {mdiClose, mdiUnfoldLessHorizontal, mdiUnfoldMoreHorizontal} from "@mdi/js";
import Icon from "@mdi/react";

import DocumentDetailsSelector from "./DocumentDetailsSelector";
import DocumentInfo from "./DocumentInfo";
import {setLastSplitterAction} from "../../redux/actions/Documents";

import {ReduxStore} from "../../utils/ReduxUtils";
import {
    ChangeSplitProportionsAction,
    changeSplitterState, hideSecondaryPane,
    SPLITTER_MAX_SECONDARY_ACTION,
    SPLITTER_MIN_SECONDARY_ACTION
} from "../SplitterUtils";

import '../Documents.scss';

export interface DocumentInformations {
    onCloseDialog: () => void;
    selectedItemId: string;
}

export interface DispatchProps {
    setLastSplitterAction: (action: ChangeSplitProportionsAction) => void;
}

export interface StateProps {
    lastSplitterAction: ChangeSplitProportionsAction;
}

export type DocumentInformationsProps = DocumentInformations & DispatchProps & StateProps;

const DocumentInformations = (props: DocumentInformationsProps) => {
    const className = 'document-informations';
    const handleResizeButton = (e: React.MouseEvent) => {
        e.preventDefault();

        if(props.lastSplitterAction === SPLITTER_MAX_SECONDARY_ACTION) {
            changeSplitterState(SPLITTER_MIN_SECONDARY_ACTION);
            props.setLastSplitterAction(SPLITTER_MIN_SECONDARY_ACTION);
        } else {
            changeSplitterState(SPLITTER_MAX_SECONDARY_ACTION);
            props.setLastSplitterAction(SPLITTER_MAX_SECONDARY_ACTION);
        }
    };

    const handleCloseButton = (e: React.MouseEvent) => {
        e.preventDefault();
        props.onCloseDialog();
    };

    return (
        <div className={className}>
            <DocumentDetailsSelector />
            <DocumentInfo selectedItemIdentifier={props.selectedItemId} />
            <div className='informations-buttons-container'>
                <div className='informations-btn resize' onClick={handleResizeButton}>
                    <Icon className="close-details-btn"
                          path={props.lastSplitterAction === SPLITTER_MIN_SECONDARY_ACTION ? mdiUnfoldMoreHorizontal : mdiUnfoldLessHorizontal}
                          size={1.3}
                    />
                </div>
                <div className='informations-btn close' onClick={handleCloseButton}>
                    <Icon className="close-details-btn" path={mdiClose} size={1.3}  />
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (store: ReduxStore, ownProps: DocumentInformations) => {
    return {
        lastSplitterAction: store.documents.lastSplitterAction,
        ...ownProps
    }
};

const mapDispatchToProps = {
    setLastSplitterAction: (action: ChangeSplitProportionsAction) => setLastSplitterAction(action)
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentInformations);