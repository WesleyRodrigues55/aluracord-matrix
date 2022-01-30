import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRouter } from 'next/router';


function Title(props) {
    const Tag = props.tag || 'h1';
    const element = (
        <>
            <Tag>{props.children}</Tag>
            <style tag jsx>{`
                ${Tag} {
                    color: #fcdf2b;
                    margin-bottom: 20px
                }
            `}</style>
        </>
    )

    return element;
}

export default function Home() {
    const [username, setUserName] = React.useState('');
    const roteamento = useRouter();

    const ImagemPerfil = (
        
        <>
            <div className='box_image p-2'>
                <Title>Bem vindo ao lado sombrio da força</Title>
                <img src={username.length > 2 ? `https://github.com/${username}.png` : `/assets/img/error.gif`} 
                    className='image' style={{width: '180px', height: '180px'}}
                />
                <p className='m-2' style={{color: '#fff'}}>                    
                    {username}<br/>
                    <a href={`https://github.com/${username}`} target={`_blank`}>
                        {username.length > 2 ? `Acessar perfil` : ``}
                    </a>
                </p>
            </div>
        </>
    );

    const FormLogin = (
        <>
            <form className='form p-2 text-start'>
                <div className='form-group m-3'>
                    <input 
                        type={`text`} id='user' placeholder='Digite seu usuário do GitHub aqui!' 
                        className='form-control p-3 input'
                        onChange={(e) => {
                            const valor = e.target.value;
                            setUserName(valor)
                        }}
                    />
                </div>
                <div className='form-group m-3 d-grid gap-2'>
                    <input 
                        type={`submit`} id='submit' value={'Entrar'} className='btn button py-3 mt-1' 
                        onClick={(e) => { 
                            e.preventDefault();
                            roteamento.push(username.length > 2 ? `/chat?user=${username}` : ``)
                        }}
                    />
                </div>
            </form>
        </>
    )

    //renderiza
    return (
        <>
            <div className='box'>
                <div className='box_content'>
                    <div className='content px-3 py-5'>
                        {/* <Title>Bem vindo(a)!</Title> */}
                        <div className=''>
                                {ImagemPerfil}
                                {FormLogin}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}