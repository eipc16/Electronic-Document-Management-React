import React from 'react';

import '../Documents.scss';
import {connect} from "react-redux";
import {ErrorPage} from "../../common/ErrorPage";
import {DocumentFlowChart} from "./info-types/DocumentFlowChart";
import DocumentComments from "./info-types/DocumentComments";
import DocumentVersions from "./info-types/DocumentVersions";
import DocumentHistory from './info-types/DocumentHistory';
import DocumentDetails from "./info-types/DocumentDetailsComponent";
import {ReduxStore} from "../../../utils/ReduxUtils";

export const DOCUMENT_DETAILS_PAGE = 'details';
export const DOCUMENT_FLOWCHART_PAGE = 'flow-chart';
export const DOCUMENT_COMMENTS_PAGE = 'comments';
export const DOCUMENT_HISTORY_PAGE = 'history';
export const DOCUMENT_VERSIONS_PAGE = 'versions';

interface DocumentInfoProps {
    selectedItemIdentifier: string;
}

interface StateProps {
    page?: string;
}

type DocumentInfoCompleteProps = StateProps & DocumentInfoProps;

const DocumentInfo: React.FC<DocumentInfoCompleteProps> = (props: DocumentInfoCompleteProps) => {
    const { selectedItemIdentifier, page } = props;

    if(!selectedItemIdentifier) {
        return null;
    }

    switch(page) {
        case DOCUMENT_DETAILS_PAGE:
            return <DocumentDetails selectedItemId={selectedItemIdentifier} />;
        case DOCUMENT_FLOWCHART_PAGE:
            return <DocumentFlowChart selectedItemId={selectedItemIdentifier} />;
        case DOCUMENT_COMMENTS_PAGE:
            return <DocumentComments selectedItemId={selectedItemIdentifier} />;
        case DOCUMENT_HISTORY_PAGE:
            return <DocumentHistory selectedItemId={selectedItemIdentifier} />;
        case DOCUMENT_VERSIONS_PAGE:
            return <DocumentVersions selectedItemId={selectedItemIdentifier} />;
        default:
            return <ErrorPage />
    }
};

const mapStateToProps = (state: ReduxStore, ownProps: DocumentInfoProps) => {
    return {
        page: state.documents.documentInfoPage,
        ...ownProps
    }
};

export default connect(
    mapStateToProps,
    null
)(DocumentInfo);