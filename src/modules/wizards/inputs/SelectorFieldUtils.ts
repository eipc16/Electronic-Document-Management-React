import {Switch, withStyles} from "@material-ui/core";

export const BlueSwitch = withStyles({
    switchBase: {
        color: '#0885de',
        '&$checked': {
            color: '#0885de',
        },
        '&$checked + $track': {
            backgroundColor: '#0885de',
        },
    },
    checked: {},
    track: {},
})(Switch);