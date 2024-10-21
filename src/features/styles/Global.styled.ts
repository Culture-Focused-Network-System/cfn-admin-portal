import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        position: relative;
        font-family: "Montserrat", sans-serif;
    }

    #root, html, body {
        width: 100%;
        height: 100%;
        font-size: 16px;
    }

    h1{
        font-size: 30px;
        font-weight: 600;
        line-height: 38px;
    }

    h2{
        font-size: 22px;
        font-weight: 400;
        line-height: 28px;
        color: #1B1B1E;
    }

    h3{
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.5px;
        text-align: left;
    }

    p{
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.5px;
        line-height: 24px;
        color: ${({ theme }) => theme.colors.textGray};
    }

    a{
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
    }

    svg{
        width: 20px;
        height: 20px;
    }

    .text-primary{
        color: ${({ theme }) => theme.colors.primary};
    }

    .text-error{
        font-weight: 400;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.error};
        line-height: 20px;
    }

    .text-center{
        text-align: center;
    }

    .text-xs{
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0.4px;
        color: #42474E;
    }

    .clickable{
        cursor: pointer;
    }
    
    .button{
        padding: 10px 18px;
        border-radius: 8px;
        outline: none;
        border: none;
        background: ${({ theme }) => theme.colors.primary};
        color: white;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.25s ease-in-out;

        &:hover{
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
    }

    .warning-bg{
        background-color: #FFAB1A;
    }

    .error-bg{
        background-color: #D41111;
    }
`;

export default GlobalStyles;
