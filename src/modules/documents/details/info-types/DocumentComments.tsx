import React from "react";
import CommentsBlock from "simple-react-comments";
import {connect} from "react-redux";
import {CommentEntity} from "simple-react-comments/dist/src/models";

import {DocumentProps} from "./DocumentInfo";

import '../styles/DocumentComments.scss'
import {addNewComment} from "../../../../redux/actions/Documents";
import {ReduxStore} from "../../../../utils/ReduxUtils";

interface StateProps {
    comments: CommentEntity[];
}

interface DispatchProps {
    addComment: (comment: CommentEntity) => void;
}

export type DocumentCommentsProps = DocumentProps & StateProps & DispatchProps;

class DocumentComments extends React.Component<DocumentCommentsProps> {
    constructor(props: DocumentCommentsProps) {
        super(props)
    }

    render() {
        if(this.props.comments === null) {
            return false;
        }
        return (
            <div className='document-info comments'>
                <CommentsBlock
                    comments={this.props.comments}
                    reactRouter={false}
                    isLoggedIn={true}
                    onSubmit={text => {
                        if(text.length > 0) {
                            this.props.addComment({
                                authorUrl: '/user',
                                avatarUrl: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                                createdAt: new Date(),
                                fullName: 'Przemysław Pietrzak',
                                text: text
                            })
                        }
                    }}
                    styles={{
                        comment: base => ({
                            ...base,
                            textAlign: 'left',
                            maxWidth: 'inherit',
                            textWrap: 'break-words'
                        }),
                        btn: base => ({
                            ...base,
                            float: 'right'
                        }),
                        textarea: base => ({
                            ...base,
                            minHeight: '100px',
                            maxHeight: '100%',
                            height: 'auto',
                            resize: 'vertical'
                        })
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = (store: ReduxStore, ownProps: DocumentProps) => {
    return {
        comments: store.documents.documentComments,
        ...ownProps
    }
};

const mapDispatchToProps: DispatchProps = {
    addComment: comment => addNewComment(comment)
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentComments)