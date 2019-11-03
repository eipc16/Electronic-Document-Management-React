import React from 'react';

import '../Documents.scss';
import {connect} from "react-redux";
import {ReduxStore} from "../../utils/ReduxUtils";
import {ErrorPage} from "../../common/ErrorPage";
import {DocumentComments, DocumentDetails, DocumentFlowChart, DocumentHistory} from "./DocumentInfoTypes";

export const DOCUMENT_DETAILS_PAGE = 'details';
export const DOCUMENT_FLOWCHART_PAGE = 'flow-chart';
export const DOCUMENT_COMMENTS_PAGE = 'comments';
export const DOCUMENT_HISTORY_PAGE = 'history';

interface StateProps {
    page?: string;
    documentId?: string | null;
}

export type DocumentInfoProps = StateProps;

const DocumentInfo: React.FC<DocumentInfoProps> = (props: DocumentInfoProps) => {
    const { documentId, page } = props;

    if(!documentId) {
        return null;
    }

    switch(page) {
        case DOCUMENT_DETAILS_PAGE:
            return <DocumentDetails selectedItemId={documentId} />;
        case DOCUMENT_FLOWCHART_PAGE:
            return <DocumentFlowChart selectedItemId={documentId} />;
        case DOCUMENT_COMMENTS_PAGE:
            return <DocumentComments selectedItemId={documentId} />;
        case DOCUMENT_HISTORY_PAGE:
            return <DocumentHistory selectedItemId={documentId} />;
        default:
            return <ErrorPage />
    }
};

const mapStateToProps = (state: ReduxStore) => {
    return {
        page: state.documents.documentInfoPage,
        documentId: state.documents.documentId
    }
};

export default connect(
    mapStateToProps,
    null
)(DocumentInfo);