import {put, takeEvery} from 'redux-saga/effects';
import {
    DocumentDTO,
    FETCH_DOCUMENT_DETAILS,
    FETCH_DOCUMENT_HISTORY,
    FETCH_DOCUMENT_LIST,
    FETCH_DOCUMENT_VERSIONS,
    FetchDocumentDetailsAction,
    FetchDocumentHistoryAction,
    FetchDocumentListAction,
    FetchDocumentVersionsAction
} from "../types/Documents";
import {
    fetchDocumentDetailsBegin,
    fetchDocumentDetailsCompleted,
    fetchDocumentHistoryBegin,
    fetchDocumentHistoryCompleted,
    fetchDocumentListBegin,
    fetchDocumentListCompleted,
    fetchDocumentVersionsBegin,
    fetchDocumentVersionsCompleted
} from "../actions/Documents";
import {request, RequestType} from "../../utils/APIUtils";
import {FetchState} from "../types/Form";

function fetchDocumentInfoTable(url: string) {
    return request({
        url: url,
        method: RequestType.GET
    }).then((response: DocumentDTO) => {
        return {
            table: {
                columns: response.columns,
                data: response.data,
                title: response.title,
                count: response.count,
                page: 0,
                state: FetchState.COMPLETED
            }
        }
    }).catch((error: any) => {
        console.error(error);
        return {
            table: {
                columns: [],
                data: [],
                title: error.message,
                count: 0,
                page: 0,
                state: FetchState.ERROR
            }
        }
    });
}

function* fetchDocumentHistoryAsync(action: FetchDocumentHistoryAction) {
    yield put(fetchDocumentHistoryBegin());
    const tableDTO = yield fetchDocumentInfoTable(`http://localhost:8080/documents/${action.documentId}/history`);
    yield put(fetchDocumentHistoryCompleted(tableDTO))
}

function* fetchDocumentVersionsAsync(action: FetchDocumentVersionsAction) {
    yield put(fetchDocumentVersionsBegin());
    const tableDTO = yield fetchDocumentInfoTable(`http://localhost:8080/documents/${action.documentId}/versions`);
    yield put(fetchDocumentVersionsCompleted(tableDTO))
}

function* fetchDocumentDetailsAsync(action: FetchDocumentDetailsAction) {
    yield put(fetchDocumentDetailsBegin());
    const tableDTO = yield fetchDocumentInfoTable(`http://localhost:8080/documents/${action.documentId}/details`);
    yield put(fetchDocumentDetailsCompleted(tableDTO))
}

function* fetchDocumentListAsync(action: FetchDocumentListAction) {
    yield put(fetchDocumentListBegin());
    const tableDTO = yield request({
        url: `http://localhost:8080/documents${action.archived ? '/archived' : ''}` +
            `?searchText=${action.searchText ? action.searchText : ''}` +
            `&page=${action.page ? action.page : ''}` +
            `&sort=${action.sort ? action.sort : ''}` +
            `&limit=${action.limit ? action.limit : ''}`,
        method: RequestType.GET
    }).then((response: DocumentDTO) => {
        return {
            table: {
                columns: response.columns,
                data: response.data,
                title: response.title,
                count: response.count,
                page: action.page,
                state: FetchState.COMPLETED
            }
        }
    }).catch((error: any) => {
        console.error(error);
        return {
            table: {
                columns: [],
                data: [],
                title: error.message,
                count: 0,
                page: action.page,
                state: FetchState.ERROR
            }
        }
    });
    yield put(fetchDocumentListCompleted(tableDTO))
}

export function* watchDocumentActions() {
    yield takeEvery(FETCH_DOCUMENT_LIST, fetchDocumentListAsync);
    yield takeEvery(FETCH_DOCUMENT_DETAILS, fetchDocumentDetailsAsync);
    yield takeEvery(FETCH_DOCUMENT_HISTORY, fetchDocumentHistoryAsync);
    yield takeEvery(FETCH_DOCUMENT_VERSIONS, fetchDocumentVersionsAsync);
}