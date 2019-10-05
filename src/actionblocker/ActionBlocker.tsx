import React from 'react'

import rootReducer from '../redux/reducers/'
import { useSelector } from 'react-redux'

import './ActionBlocker.scss'

export const ActionBlocker: React.FC = () => {

    const visibility = useSelector((state: ReturnType<typeof rootReducer>) => state.blockWall.visible)

    console.log(visibility)

    const blockClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

    return (
        <div className={`action-blocker ${visibility ? 'visible' : ''}`} onClick={(event) => blockClick(event)}/>
    )
}