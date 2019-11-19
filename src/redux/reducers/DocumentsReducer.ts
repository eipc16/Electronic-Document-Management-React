import {
    ADD_NEW_COMMENT,
    DocumentsActions,
    DocumentsState,
    FETCH_DOCUMENT_DETAILS_BEGIN,
    FETCH_DOCUMENT_DETAILS_COMPLETED,
    FETCH_DOCUMENT_HISTORY_BEGIN,
    FETCH_DOCUMENT_HISTORY_COMPLETED,
    FETCH_DOCUMENT_LIST_BEGIN,
    FETCH_DOCUMENT_LIST_COMPLETED, FETCH_DOCUMENT_VERSIONS_BEGIN, FETCH_DOCUMENT_VERSIONS_COMPLETED,
    SET_DOCUMENT_INFO_PAGE,
    SET_LAST_SPLITTER_ACTION,
    SET_SELECTED_DOCUMENT
} from "../types/Documents";
import {DOCUMENT_DETAILS_PAGE} from "../../modules/documents/details/DocumentInfo";
import {SPLITTER_MAX_SECONDARY_ACTION} from "../../modules/documents/SplitterUtils";
import {FetchState} from "../types/Form";

const initialState: DocumentsState = {
    documentId: null,
    documentInfoPage: DOCUMENT_DETAILS_PAGE,
    documentComments: [],
    documentDetails: {
        table: {
            columns: [],
            data: [],
            title: 'Document details',
            count: 0,
            page: 1,
            state: FetchState.COMPLETED
        }
    },
    documentFlowChart: null,
    documentHistory: {
        table: {
            columns: [],
            data: [],
            title: 'Documents history',
            count: 0,
            page: 1,
            state: FetchState.COMPLETED
        }
    },
    documentVersions: {
        table: {
            columns: [],
            data: [],
            title: 'Documents versions',
            count: 0,
            page: 1,
            state: FetchState.COMPLETED
        }
    },
    documentList: {
        table: {
            columns: [],
            data: [],
            title: 'Document List',
            count: 0,
            page: 1,
            state: FetchState.COMPLETED
        }
    },
    lastSplitterAction: SPLITTER_MAX_SECONDARY_ACTION
};

export default function documentsReducer(state = initialState, action: DocumentsActions) {
    switch(action.type) {
        case SET_DOCUMENT_INFO_PAGE:
            return {
                ...state,
                documentInfoPage: action.page
            };
        case SET_SELECTED_DOCUMENT:
            return {
                ...state,
                documentId: action.id
            };
        case SET_LAST_SPLITTER_ACTION:
            return {
                ...state,
                lastSplitterAction: action.actionType
            };
        case ADD_NEW_COMMENT:
            return {
                ...state,
                documentComments: [
                    ...state.documentComments,
                    action.commentData
                ]
            };
        case FETCH_DOCUMENT_LIST_BEGIN:
            return {
                ...state,
                documentList: {
                    table: {
                        ...state.documentList.table,
                        state: FetchState.ONGOING
                    }
                }
            };
        case FETCH_DOCUMENT_LIST_COMPLETED:
            return {
                ...state,
                documentList: action.payload
            };
        case FETCH_DOCUMENT_DETAILS_BEGIN:
            return {
                ...state,
                documentDetails: {
                    table: {
                        ...state.documentDetails.table,
                        state: FetchState.ONGOING
                    }
                }
            };
        case FETCH_DOCUMENT_DETAILS_COMPLETED:
            return {
                ...state,
                documentDetails: action.payload
            };
        case FETCH_DOCUMENT_HISTORY_BEGIN:
            return {
                ...state,
                documentHistory: {
                    table: {
                        ...state.documentHistory.table,
                        state: FetchState.ONGOING
                    }
                }
            };
        case FETCH_DOCUMENT_HISTORY_COMPLETED:
            return {
                ...state,
                documentHistory: action.payload
            };
        case FETCH_DOCUMENT_VERSIONS_BEGIN:
            return {
                ...state,
                documentVersions: {
                    table: {
                        ...state.documentVersions.table,
                        state: FetchState.ONGOING
                    }
                }
            };
        case FETCH_DOCUMENT_VERSIONS_COMPLETED:
            return {
                ...state,
                documentVersions: action.payload
            };
        default:
            return state
    }
}