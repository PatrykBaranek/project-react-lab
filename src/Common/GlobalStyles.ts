import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing:border-box;
        margin: 0;
        padding: 0;
    }

    html{
        font-size:10px;
    }

    body{
        background-color: #333;
        color:#ddd;
    }
`;
