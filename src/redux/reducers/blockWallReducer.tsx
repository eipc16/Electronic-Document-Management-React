import { 
    TOGGLE_BLOCKWALL, 
    SWITCH_BLOCKWALL,
    BlockWallTypes,
    BlockWallState
} from '../types/'

const initialState: BlockWallState = {
    visible: false
}

export default function blockWallReducer(state = initialState, action: BlockWallTypes): BlockWallState {
    switch(action.type) {
        case TOGGLE_BLOCKWALL:
            return {
                visible: !state.visible
            }
        case SWITCH_BLOCKWALL:
            return {
                visible: action.visible
            }
        default:
            return state
    }
}