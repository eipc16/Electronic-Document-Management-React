import React from 'react';
import {connect} from "react-redux";
import {setDocumentInfoPage} from "../../../redux/actions/Documents";
import {
    DOCUMENT_COMMENTS_PAGE,
    DOCUMENT_DETAILS_PAGE,
    DOCUMENT_FLOWCHART_PAGE,
    DOCUMENT_HISTORY_PAGE, DOCUMENT_VERSIONS_PAGE
} from "./DocumentInfo";
import {ReduxStore} from "../../../utils/ReduxUtils";

interface SelectorInterface {
    name: string;
    displayName: string;
}

interface StateProps {
    selectedPage?: string;
}

interface DispatchProps {
    setPage: (page: string) => void;
}

export type DetailsSelectorProps = DispatchProps & StateProps;

const selectors: SelectorInterface[] = [
    {
        name: DOCUMENT_DETAILS_PAGE,
        displayName: 'Details'
    },
    {
        name: DOCUMENT_HISTORY_PAGE,
        displayName: 'History'
    },
    {
        name: DOCUMENT_FLOWCHART_PAGE,
        displayName: 'Flowchart'
    },
    {
        name: DOCUMENT_COMMENTS_PAGE,
        displayName: 'Comments'
    },
    {
        name: DOCUMENT_VERSIONS_PAGE,
        displayName: 'Versions'
    }
]

const DocumentDetailsSelector = (props: DetailsSelectorProps) => {
    return (
        <div className='document-details-selector'>
            {
                selectors.map(selector => {
                    let className = 'document-detail';
                    if(props.selectedPage === selector.name) {
                        className = `${className} selected`
                    }

                    return (
                        <div className={className} key={selector.name} onClick={() => props.setPage(selector.name)}>
                            <p className={'document-detail-text'}>
                                {selector.displayName}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
};

const mapStateToProps = (store: ReduxStore) => ({
    selectedPage: store.documents.documentInfoPage
});

const mapDispatchToProps: DispatchProps = {
    setPage: (page: string) => setDocumentInfoPage(page)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentDetailsSelector);
