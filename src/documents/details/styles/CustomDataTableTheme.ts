import {createMuiTheme} from "@material-ui/core";

export const customTheme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                scrollbarWidth: 'none',
                height: 'inherit',
                position: 'relative',
                '& > div': {
                    maxHeight: '80%'
                },
                '& > .MuiPaper-root': {
                    height: 'fit-content'
                }
            }
        },
        MuiTable: {
            root: {
                maxHeight: '80vh'
            }
        },
        MuiTableRow: {
            footer: {
                position: 'absolute',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                zIndex: 100,
                bottom: '0',
                right: '0',
            }
        }
    }
});