import React from 'react';

import '../Documents.scss';
import {connect} from "react-redux";
import {ReduxStore} from "../../utils/ReduxUtils";
import {ErrorPage} from "../../common/ErrorPage";
import {DocumentFlowChart} from "./info-types/DocumentFlowChart";
import DocumentComments from "./info-types/DocumentComments";
import DocumentVersions from "./info-types/DocumentVersions";
import DocumentHistory from './info-types/DocumentHistory';
import DocumentDetails from "./info-types/DocumentDetails";

export const DOCUMENT_DETAILS_PAGE = 'details';
export const DOCUMENT_FLOWCHART_PAGE = 'flow-chart';
export const DOCUMENT_COMMENTS_PAGE = 'comments';
export const DOCUMENT_HISTORY_PAGE = 'history';
export const DOCUMENT_VERSIONS_PAGE = 'versions';

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
        case DOCUMENT_VERSIONS_PAGE:
            return <DocumentVersions selectedItemId={documentId} />;
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