import {ChangeSplitProportionsAction} from "../../documents/SplitterUtils";

export const SET_DOCUMENT_INFO_PAGE = 'SET_DOCUMENT_INFO_PAGE';
export const SET_SELECTED_DOCUMENT = 'SET_SELECTED_DOCUMENT';
export const SET_LAST_SPLITTER_ACTION = 'SET_LAST_SPLITTER_ACTION';

export const FETCH_DOCUMENT_DETAILS = 'FETCH_DOCUMENT_DETAILS';
export const FETCH_DOCUMENT_HISTORY = 'FETCH_DOCUMENT_HISTORY';
export const FETCH_DOCUMENT_COMMENTS = 'FETCH_DOCUMENT_COMMENTS';
export const FETCH_DOCUMENT_FLOWCHART = 'FETCH_DOCUMENT_FLOWCHART';

export interface DocumentsState {
    documentId: string | null;
    documentInfoPage: string;
    documentDetails: any;
    documentHistory: any;
    documentFlowChart: any;
    documentComments: any;
    lastSplitterAction: ChangeSplitProportionsAction;
}

interface SetDocumentIdAction {
    type: typeof SET_SELECTED_DOCUMENT;
    id: string | null;
}

interface SetDocumentInfoPageAction {
    type: typeof SET_DOCUMENT_INFO_PAGE;
    page: string;
}

interface SetLastSplitterAction {
    type: typeof SET_LAST_SPLITTER_ACTION;
    actionType: ChangeSplitProportionsAction;
}

export type DocumentsActions = SetDocumentIdAction | SetDocumentInfoPageAction | SetLastSplitterAction;