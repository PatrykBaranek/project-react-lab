import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing:border-box;
        margin: 0;
        padding: 0;
    }

    html{
        font-size:62.5%;
    }

    body{
        background-color: #333;
        color:#ddd;
    }

    #root{
        margin: 0 auto;
        max-width: 1440px;
    }

`;
