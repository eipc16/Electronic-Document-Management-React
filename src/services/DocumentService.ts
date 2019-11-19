import {Store} from "redux";
import {
    fetchDocumentDetails,
    fetchDocumentHistory,
    fetchDocumentList,
    fetchDocumentVersions
} from "../redux/actions/Documents";

export const DocumentService = (store: Store) => {

    const fetchDocumentTableData = (searchText?: string, page?: number, sort?: any, limit?: number, archived?: boolean) => {
        store.dispatch(fetchDocumentList(searchText, page, sort, limit, archived));
    };

    const fetchDocumentDetailsTableData = (documentId: number) => {
        store.dispatch(fetchDocumentDetails(documentId));
    };

    const fetchDocumentHistoryTableData = (documentId: number) => {
        store.dispatch(fetchDocumentHistory(documentId));
    };

    const fetchDocumentVersionsTableData = (documentId: number) => {
        store.dispatch(fetchDocumentVersions(documentId));
    };

    return Object.freeze({ fetchDocumentTableData, fetchDocumentDetailsTableData,
        fetchDocumentHistoryTableData, fetchDocumentVersionsTableData });
};