import {
    DocumentsActions,
    SET_DOCUMENT_INFO_PAGE,
    SET_LAST_SPLITTER_ACTION,
    SET_SELECTED_DOCUMENT
} from "../types/Documents";
import {ChangeSplitProportionsAction} from "../../documents/SplitterUtils";

export function setSelectedDocument(id: string | null): DocumentsActions {
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