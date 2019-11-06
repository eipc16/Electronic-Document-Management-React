import {ChangeSplitProportionsAction} from "../../documents/SplitterUtils";
import {CommentEntity} from "simple-react-comments/dist/src/models";

export const SET_DOCUMENT_INFO_PAGE = 'SET_DOCUMENT_INFO_PAGE';
export const SET_SELECTED_DOCUMENT = 'SET_SELECTED_DOCUMENT';
export const SET_LAST_SPLITTER_ACTION = 'SET_LAST_SPLITTER_ACTION';
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';

export const FETCH_DOCUMENT_DETAILS = 'FETCH_DOCUMENT_DETAILS';
export const FETCH_DOCUMENT_HISTORY = 'FETCH_DOCUMENT_HISTORY';
export const FETCH_DOCUMENT_COMMENTS = 'FETCH_DOCUMENT_COMMENTS';
export const FETCH_DOCUMENT_FLOWCHART = 'FETCH_DOCUMENT_FLOWCHART';

export interface CustomColumn {
    name: string;
    options: {
        filter: boolean;
        sort: boolean;
    };
}

export interface DocumentTableData {
    table?: {
        columns: string[] | CustomColumn[];
        data: string[][];
        title: string;
    };
}

export interface DocumentsState {
    documentId: number | null;
    documentInfoPage: string;
    documentDetails: DocumentTableData;
    documentHistory: DocumentTableData;
    documentVersions: DocumentTableData;
    documentFlowChart: any;
    documentComments: CommentEntity[];
    lastSplitterAction: ChangeSplitProportionsAction;
}

export interface SetDocumentIdAction {
    type: typeof SET_SELECTED_DOCUMENT;
    id: number | null;
}

interface SetDocumentInfoPageAction {
    type: typeof SET_DOCUMENT_INFO_PAGE;
    page: string;
}

interface SetLastSplitterAction {
    type: typeof SET_LAST_SPLITTER_ACTION;
    actionType: ChangeSplitProportionsAction;
}

interface AddCommentAction {
    type: typeof ADD_NEW_COMMENT;
    commentData: CommentEntity;
}

export type DocumentsActions = SetDocumentIdAction
    | SetDocumentInfoPageAction
    | SetLastSplitterAction
    | AddCommentAction;