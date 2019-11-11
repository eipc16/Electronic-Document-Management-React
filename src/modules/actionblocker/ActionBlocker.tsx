import React from 'react'
import './ActionBlocker.scss'
import {useBlockWallVisiblity} from "../../utils/ReduxUtils";

export const ActionBlocker: React.FC = () => {

    const visibility = useBlockWallVisiblity();

    const blockClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

    return (
        <div className={`action-blocker ${visibility ? 'visible' : ''}`} onClick={(event) => blockClick(event)}/>
    )
}