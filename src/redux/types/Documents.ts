import {ChangeSplitProportionsAction} from "../../modules/documents/SplitterUtils";
import {CommentEntity} from "simple-react-comments/dist/src/models";
import {FetchState} from "./Form";
import {FlowChartDTO} from "../../modules/flowcharts/mapper/FlowChartInterfaces";

export const SET_DOCUMENT_INFO_PAGE = 'SET_DOCUMENT_INFO_PAGE';
export const SET_SELECTED_DOCUMENT = 'SET_SELECTED_DOCUMENT';
export const SET_LAST_SPLITTER_ACTION = 'SET_LAST_SPLITTER_ACTION';
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';


export const FETCH_DOCUMENT_LIST_BEGIN = 'FETCH_DOCUMENT_LIST_BEGIN';
export const FETCH_DOCUMENT_LIST = 'FETCH_DOCUMENT_LIST';
export const FETCH_DOCUMENT_LIST_COMPLETED = 'FETCH_DOCUMENT_LIST_COMPLETED';

export const FETCH_DOCUMENT_DETAILS_BEGIN = 'FETCH_DOCUMENT_DETAILS_BEGIN';
export const FETCH_DOCUMENT_DETAILS = 'FETCH_DOCUMENT_DETAILS';
export const FETCH_DOCUMENT_DETAILS_COMPLETED = 'FETCH_DOCUMENT_DETAILS_COMPLETED';

export const FETCH_DOCUMENT_HISTORY_BEGIN = 'FETCH_DOCUMENT_HISTORY_BEGIN';
export const FETCH_DOCUMENT_HISTORY = 'FETCH_DOCUMENT_HISTORY';
export const FETCH_DOCUMENT_HISTORY_COMPLETED = 'FETCH_DOCUMENT_HISTORY_COMPLETED';

export const FETCH_DOCUMENT_VERSIONS_BEGIN = 'FETCH_DOCUMENT_VERSIONS_BEGIN';
export const FETCH_DOCUMENT_VERSIONS = 'FETCH_DOCUMENT_VERSIONS';
export const FETCH_DOCUMENT_VERSIONS_COMPLETED = 'FETCH_DOCUMENT_VERSIONS_COMPLETED';

export const FETCH_DOCUMENT_COMMENTS_BEGIN = 'FETCH_DOCUMENT_COMMENTS_BEGIN';
export const FETCH_DOCUMENT_COMMENTS = 'FETCH_DOCUMENT_COMMENTS';
export const FETCH_DOCUMENT_COMMENTS_COMPLETED = 'FETCH_DOCUMENT_COMMENTS_COMPLETED';

export const FETCH_DOCUMENT_FLOWCHART_BEGIN = 'FETCH_DOCUMENT_FLOWCHART_BEGIN';
export const FETCH_DOCUMENT_FLOWCHART = 'FETCH_DOCUMENT_FLOWCHART';
export const FETCH_DOCUMENT_FLOWCHART_COMPLETED = 'FETCH_DOCUMENT_FLOWCHART_COMPLETED';

export interface CustomColumn {
    name: string;
    label: string;
    type: string;
    options: {
        filter: boolean;
        sort: boolean;
    };
}

export interface DocumentDTO {
    columns: CustomColumn[];
    data: any[];
    title: string;
    count: number;
}

export interface DocumentTableData {
    table?: {
        columns: string[] | CustomColumn[];
        data: any[];
        title: string;
        page: number;
        count: number;
        state: FetchState;
    };
}

export interface DocumentsState {
    documentId: number | null;
    documentInfoPage: string;
    documentList: DocumentTableData;
    documentDetails: DocumentTableData;
    documentHistory: DocumentTableData;
    documentVersions: DocumentTableData;
    documentFlowChart: FlowChartDTO | null;
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

interface FetchDocumentListBeginAction {
    type: typeof FETCH_DOCUMENT_LIST_BEGIN;
}

export interface FetchDocumentListAction {
    type: typeof FETCH_DOCUMENT_LIST;
    searchText?: string;
    page?: number;
    sort?: any;
    limit?: number;
    archived?: boolean;
}

interface FetchDocumentListCompletedAction {
    type: typeof FETCH_DOCUMENT_LIST_COMPLETED;
    payload: DocumentTableData;
}

interface FetchDocumentDetailsBeginAction {
    type: typeof FETCH_DOCUMENT_DETAILS_BEGIN;
}

export interface FetchDocumentDetailsAction {
    type: typeof FETCH_DOCUMENT_DETAILS;
    documentId: number;
}

interface FetchDocumentDetailsCompletedAction {
    type: typeof FETCH_DOCUMENT_DETAILS_COMPLETED;
    payload: DocumentTableData;
}

interface FetchDocumentHistoryBeginAction {
    type: typeof FETCH_DOCUMENT_HISTORY_BEGIN;
}

export interface FetchDocumentHistoryAction {
    type: typeof FETCH_DOCUMENT_HISTORY;
    documentId: number;
}

interface FetchDocumentHistoryCompletedAction {
    type: typeof FETCH_DOCUMENT_HISTORY_COMPLETED;
    payload: DocumentTableData;
}

interface FetchDocumentVersionsBeginAction {
    type: typeof FETCH_DOCUMENT_VERSIONS_BEGIN;
}

export interface FetchDocumentVersionsAction {
    type: typeof FETCH_DOCUMENT_VERSIONS;
    documentId: number;
}

interface FetchDocumentVersionsCompletedAction {
    type: typeof FETCH_DOCUMENT_VERSIONS_COMPLETED;
    payload: DocumentTableData;
}

export type DocumentsActions =
      SetDocumentIdAction
    | SetDocumentInfoPageAction
    | SetLastSplitterAction
    | AddCommentAction
    | FetchDocumentListBeginAction | FetchDocumentListAction | FetchDocumentListCompletedAction
    | FetchDocumentDetailsAction | FetchDocumentDetailsBeginAction | FetchDocumentDetailsCompletedAction
    | FetchDocumentHistoryAction | FetchDocumentHistoryBeginAction | FetchDocumentHistoryCompletedAction
    | FetchDocumentVersionsAction | FetchDocumentVersionsBeginAction | FetchDocumentVersionsCompletedAction;