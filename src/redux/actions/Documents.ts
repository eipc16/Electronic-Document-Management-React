import {
    ADD_NEW_COMMENT,
    DocumentsActions,
    SET_DOCUMENT_INFO_PAGE,
    SET_LAST_SPLITTER_ACTION,
    SET_SELECTED_DOCUMENT
} from "../types/Documents";
import {ChangeSplitProportionsAction} from "../../documents/SplitterUtils";
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