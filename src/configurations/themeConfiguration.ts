import {DefaultTheme} from "react-native-paper";

export const loadAppTheme = () => {
    return {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#3498db',
            accent: '#f1c40f',
        }
    };
};
