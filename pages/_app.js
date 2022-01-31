function GlobalStyle() {
    return (
        <style global jsx>{`
             * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }

            #__next {
                flex: 1;
            }

            #__next > * {
                flex: 1;
            }
            html,
            body,
            .box {
                height: 100vh
            }

            body {
                overflow: hidden;
                background: url('/assets/img/bannerStarWars.png');
                background-size: cover;
                background-repeat: no-repeat;
            }

            ::-webkit-scrollbar {
                width: 10px;
            }
            
            ::-webkit-scrollbar-track {
                background:#333;
                border-radius: 3px;
            }
            
            ::-webkit-scrollbar-thumb {
                background-color: #fcdf2b;
                border-radius: 3px;
                border: 2px solid #fcdf2b;
            }

            .box {
                display: table;
                width: 100%;
            }

            .box_content {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
                padding: 3px;
            }

            .header {
                border-bottom: 1px solid #333;
            }

            .content {
                box-shadow: 0 0 5px 0 #000;
                background: rgba(0,0,0,0.9);
                margin: auto;
                min-width: 320px;
                max-width: 600px;
                max-height: 620px
            }

            .content_chat {
                background: rgba(0,0,0,0.9);
                margin: auto;
                width: 99%;
                height: 99%;
            }

            .box_image {
                height: 330px
            }

            .image {
                border-radius: 100%
            }

            .input {
                border: unset
            }

            .input:focus {
                outline: 0;
                border: unset;
                -moz-outline-style: none;
            }

            .image_chat {
                border-radius: 100%;
                width: 40px
            }

            /* KEYFRAME LOAD */


            /* BUTTONS */
            .logout {
                border: 1px solid #fcdf2b;
                font-size: 18px;
                color: #fcdf2b;
                transition: background 1s, color 0.5s;
            }

            .logout:hover {
                transition: background 1s, color 0.5s;
                color: #000;
                background: #fcdf2b
            }
            
            .button {
                font-size: 18px;
                background: #333;
                color: #fff;
            }

            .button:hover {
                color: #fff;
                background: #2e2e2e;
            }

            .excluir {
                font-size: 25px;
                color: #333;
            }

            .send {
                font-size: 30px;
                color: #fff;
            }

            .send:hover {
                color: #fff;
            }

            /* RETIRANDO OULINE ALL */
            .send, .stickers{
                border: unset
            }

            .stickers:focus,
            .send:focus,
            .excluir:focus {
                outline: 0;
                box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, .0);
            }
            
        `}</style>
    )
}

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />,
            <Component {...pageProps} />
        </>
    )
  }