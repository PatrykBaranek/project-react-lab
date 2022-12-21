import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *,*::after, *::before{
        box-sizing:border-box;
        margin: 0;
        padding: 0;
    }

    html{
        font-size:62.5%;
    }

    body{
        background-color: #333;
        font-family:sans-serif;
        color:#ddd;
    }

    #root{
        margin: 0 auto;
        max-width: 1440px;
    }

`;
