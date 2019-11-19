import {
    ADD_NEW_COMMENT,
    DocumentsActions,
    DocumentTableData,
    FETCH_DOCUMENT_DETAILS,
    FETCH_DOCUMENT_DETAILS_BEGIN,
    FETCH_DOCUMENT_DETAILS_COMPLETED,
    FETCH_DOCUMENT_HISTORY,
    FETCH_DOCUMENT_HISTORY_BEGIN,
    FETCH_DOCUMENT_HISTORY_COMPLETED,
    FETCH_DOCUMENT_LIST,
    FETCH_DOCUMENT_LIST_BEGIN,
    FETCH_DOCUMENT_LIST_COMPLETED,
    FETCH_DOCUMENT_VERSIONS,
    FETCH_DOCUMENT_VERSIONS_BEGIN, FETCH_DOCUMENT_VERSIONS_COMPLETED,
    SET_DOCUMENT_INFO_PAGE,
    SET_LAST_SPLITTER_ACTION,
    SET_SELECTED_DOCUMENT
} from "../types/Documents";
import {ChangeSplitProportionsAction} from "../../modules/documents/SplitterUtils";
import {CommentEntity} from "simple-react-comments/dist/src/models";

export function setSelectedDocument(id: number | null): DocumentsActions {
    return {
        type: SET_SELECTED_DOCUMENT,
        id: id
    }
}

export function setDocumentInfoPage(page: string): DocumentsActions {
    return {
        type: SET_DOCUMENT_INFO_PAGE,
        page: page
    }
}

export function setLastSplitterAction(actionType: ChangeSplitProportionsAction): DocumentsActions {
    return {
        type: SET_LAST_SPLITTER_ACTION,
        actionType: actionType
    }
}

export function addNewComment(commentData: CommentEntity): DocumentsActions {
    return {
        type: ADD_NEW_COMMENT,
        commentData: commentData
    }
}

export function fetchDocumentListBegin(): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_LIST_BEGIN
    }
}

export function fetchDocumentList(searchText?: string, page?: number, sort?: any, limit?: number, archived?: boolean): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_LIST,
        searchText: searchText,
        page: page,
        sort: sort,
        limit: limit,
        archived: archived
    }
}

export function fetchDocumentListCompleted(payload: DocumentTableData): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_LIST_COMPLETED,
        payload: payload
    }
}

export function fetchDocumentDetailsBegin(): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_DETAILS_BEGIN
    }
}

export function fetchDocumentDetails(documentId: number): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_DETAILS,
        documentId: documentId
    }
}

export function fetchDocumentDetailsCompleted(payload: DocumentTableData): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_DETAILS_COMPLETED,
        payload: payload
    }
}

export function fetchDocumentHistoryBegin(): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_HISTORY_BEGIN
    }
}

export function fetchDocumentHistory(documentId: number): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_HISTORY,
        documentId: documentId
    }
}

export function fetchDocumentHistoryCompleted(payload: DocumentTableData): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_HISTORY_COMPLETED,
        payload: payload
    }
}

export function fetchDocumentVersionsBegin(): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_VERSIONS_BEGIN
    }
}

export function fetchDocumentVersions(documentId: number): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_VERSIONS,
        documentId: documentId
    }
}

export function fetchDocumentVersionsCompleted(payload: DocumentTableData): DocumentsActions {
    return {
        type: FETCH_DOCUMENT_VERSIONS_COMPLETED,
        payload: payload
    }
}