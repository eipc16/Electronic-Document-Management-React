import {DefaultTheme} from "react-native-paper";

export const PRIMARY_COLOR = '#3498db';
export const ACCENT_COLOR = '#f1c40f';
export const ERROR_COLOR = '#dc3545';

export const loadAppTheme = () => {
    return {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: PRIMARY_COLOR,
            accent: ACCENT_COLOR
        }
    };
};
