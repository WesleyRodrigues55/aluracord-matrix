import { useRouter } from 'next/router';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createClient } from '@supabase/supabase-js';
//icons
import { GoTrashcan } from 'react-icons/go';
import { RiSendPlaneFill } from 'react-icons/ri';
//temp
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

//con db
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MzYxOSwiZXhwIjoxOTU4ODY5NjE5fQ.efJ0BJqWWRN-6rxY-Oq2_DtxiGFbncGX5r6v8dywxIo';
const SUPABASE_URL = 'https://juulskwfgtzbwghedjnb.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Title(props) {
    const Tag = props.tag || 'h1';
    const element = (
        <>
            <Tag>{props.children}</Tag>
            <style tag jsx>{`
                ${Tag} {
                    color: #fcdf2b
                }
            `}</style>
        </>
    )

    return element;
}

function DateTime() {
    const datetime = (
        <Title tag='p' className='m-2'>
            {(new Date().toLocaleDateString())}
        </Title>
    )
    return datetime;
}

export default function PaginaChat() {
    const roteamento = useRouter();
    const user = roteamento.query.user;
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagens, setListaMensagens] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(false);

 

    const header = (
        <div className='d-flex justify-content-between p-3 header'>
            <Title tag='h2'>Chat</Title>
            <a href='../' className='btn logout px-5 py-1'>
                Sair
            </a>
        </div>
    );

    const FormMensagem = (
        <form className='form d-flex justify-content-between align-items-center'>
            <textarea rows={`3`} 
                type={`text`} placeholder='Digite sua mensagem' className='form-control w-100 py-3 input'
                value={mensagem} 
                onChange={(e) => {
                    e.preventDefault();
                    const valor = e.target.value;
                    setMensagem(valor);
                }}
                onKeyPress={(e) => {
                    const clicado = e.key;
                    if (clicado == 'Enter' && mensagem.length > 0) {
                        e.preventDefault();
                        NovaMensagem(mensagem, user);
                    }
                }}
            ></textarea> 
            <ButtonSendSticker className='m-2'
                onStickerClick={(sticker) => {
                    NovaMensagem(`:sticker: ${sticker}`);
                }}
            />
            <button type={`submit`} value={`Enviar`} className='btn send p-2 m-3' title='Enviar mensagem!'
                onClick={(e) => {
                    e.preventDefault();
                    NovaMensagem(mensagem);
                }} 
            >
                <RiSendPlaneFill />
            </button>
        </form>
    )

    const Chat = (
        <div className='p-3 position-relative d-flex flex-column' style={{height: '75vh', width: '98vw',  flex: '1'}}>
            <ul className='d-flex flex-column-reverse' style={{overflowY: 'scroll', flex: '1', textAlign: 'left', color: '#fff', padding: '0'}}>
                {listaMensagens.map((mensagem) => {
                    return (
                        <li style={{borderBottom: '1px solid #333'}} className='p-2' key={mensagem.id}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center'>
                                    <img src={`https://github.com/${mensagem.de}.png`} className='m-2 image_chat'/>
                                    <div className='mx-2'>
                                        <Title tag='h4' className='m-2'>{mensagem.de}</Title>
                                        <DateTime />
                                    </div>
                                </div>
                                <button className='btn excluir p-2' onClick={(e) => ApagarMensagem(e, mensagem.id, mensagem.de)} title='Excluir mensagem?'>
                                    <GoTrashcan />
                                </button>
                            </div>
                            <p className='m-2 p-2' style={{fontSize: '18px', wordBreak: 'break-all'}}>
                                {mensagem.texto.startsWith(':sticker: ') ? (
                                    <img 
                                        style={{width: '150px'}}
                                        src={mensagem.texto.replace(':sticker: ', '')} 
                                    />
                                ) : (
                                    '> ' + mensagem.texto
                                )}
                            </p>
                        </li>
                    )
                })}
            </ul>
            {FormMensagem}
        </div>
    );
    
    const ApagarMensagem = (e, msgId, msgDe) => {
        e.preventDefault();
        if (user = msgDe) {
            supabaseClient
                .from('mensagens')
                .delete()
                .match({id: msgId})
                .then (({ data }) => {
                    const apagarMensagem = listaMensagens.filter(
                        (mensagem) => mensagem.id !== msgId
                    );
                    setListaMensagens(apagarMensagem);
                    setIsLoaded(true);
                    window.alert('Mensagem excluída!.');
                });
        } else {
            window.alert('Você não pode excluir mensagens de outros usuários!')
        }
    }
    
    function escutaNovaMensagem(adicionaMensagem) {
        return supabaseClient
            .from('mensagens')
            .on('INSERT', (respostaLive) => {
                adicionaMensagem(respostaLive.new)
            }).subscribe();
    }

    function NovaMensagem(novaMensagem) {
        const msg = {
            de: user,
            texto: novaMensagem
        }
        supabaseClient
            .from('mensagens')
            .insert([
                msg
            ])
            .then(({ data }) => {
                // setListaMensagens([
                //     msg, ...listaMensagens
                // ]);
            })
        setMensagem('');
        setIsLoaded(true);   
    }

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaMensagens(data);
                setIsLoaded(true);
            });
        escutaNovaMensagem((NovaMensagem) => {
            setListaMensagens((valorAtualDaLista) => {
                return [
                    NovaMensagem,
                    ...valorAtualDaLista
                ]
            });
        });
    }, []);
    
    if (!isLoaded) {
        return (
            <div className='box'  styleSheet={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(/assets/img/bannerStarWars.png)'}}>
                <div className='box_content'>
                    <img src='/assets/img/load.gif' className='carregando' />
                </div>
            </div>
        )
    }

    if (isLoaded) {
        return (
            <div className='box'>
                <div className='box_content'>
                    <div className='content_chat px-3 pt-5'>
                        <Title>Bem vindo(a) ao chat {user}!</Title>
                        {header}
                        {Chat}
                    </div>
                </div>
            </div>
        )
    }
}