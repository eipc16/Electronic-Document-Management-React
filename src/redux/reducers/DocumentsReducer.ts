import {
    ADD_NEW_COMMENT,
    DocumentsActions,
    DocumentsState,
    SET_DOCUMENT_INFO_PAGE,
    SET_LAST_SPLITTER_ACTION,
    SET_SELECTED_DOCUMENT
} from "../types/Documents";
import {DOCUMENT_DETAILS_PAGE} from "../../modules/documents/details/DocumentInfo";
import {SPLITTER_MAX_SECONDARY_ACTION} from "../../modules/documents/SplitterUtils";

const initialState: DocumentsState = {
    documentId: null,
    documentInfoPage: DOCUMENT_DETAILS_PAGE,
    documentComments: [],
    documentDetails: {
        table: {
            columns: [{
                name: "Property",
                options: {
                    filter: false,
                    sort: true
                }
            }, {
                name: "Value",
                options: {
                    filter: false,
                    sort: false
                }
            }],
            data: [
                ["One", "Two"],
                ["Three", "Four"],
                ["Five", "Six"],
            ],
            title: 'Document details'
        }
    },
    documentFlowChart: null,
    documentHistory: {
        table: {
            columns: ["One", "Two", "Three"],
            data: [
                ["1", "2", "3"],
                ["55", "Test", "4"],
                ["tester", "43", "532"]
            ],
            title: 'Documents history'
        }
    },
    documentVersions: {
        table: {
            columns: ["One", "Two", "Three"],
            data: [
                ["1", "2", "3"],
                ["55", "Test", "4"],
                ["tester", "43", "532"]
            ],
            title: 'Documents versions'
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
        default:
            return state
    }
}