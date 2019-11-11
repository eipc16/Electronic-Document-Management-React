import React from 'react'
import {ReduxStore} from "../../utils/ReduxUtils";
import {connect} from "react-redux";

import './ActionBlocker.scss';

const ActionBlocker: React.FC<{isVisible?: boolean} & any> = (props: {isVisible?: boolean} & any) => {

    const visibility = props.isVisible ? props.isVisible : false;

    const blockClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    console.log(props.children);
    console.log(visibility);
    console.log(props.isVisible);

    return (
        <div className={`action-blocker ${visibility ? 'visible' : ''}`}
            onClick={(event) => blockClick(event)} />
    )
};

const mapStateToProps = (store: ReduxStore, ownProps: any) => {
    return {
        isVisible: store.blockWall.visible,
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(ActionBlocker);