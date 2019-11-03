import {
    DocumentsActions,
    DocumentsState,
    SET_DOCUMENT_INFO_PAGE,
    SET_LAST_SPLITTER_ACTION,
    SET_SELECTED_DOCUMENT
} from "../types/Documents";
import {DOCUMENT_DETAILS_PAGE} from "../../documents/details/DocumentInfo";
import {SPLITTER_MAX_SECONDARY_ACTION} from "../../documents/SplitterUtils";

const initialState: DocumentsState = {
    documentId: null,
    documentInfoPage: DOCUMENT_DETAILS_PAGE,
    documentComments: null,
    documentDetails: null,
    documentFlowChart: null,
    documentHistory: null,
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
        default:
            return state
    }
}