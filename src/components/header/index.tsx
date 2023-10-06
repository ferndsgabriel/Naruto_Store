import {AiOutlineSearch, AiOutlineShoppingCart , AiOutlineMenu,AiOutlineClose,
AiFillHome} from "react-icons/ai";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import react,{useState} from "react";
import {BiSolidUser,BiLogoLinkedin,BiLogoGithub} from "react-icons/bi";
import {BsFillBagFill} from "react-icons/bs";
import {RiFileList3Line} from "react-icons/ri";
import {IoIosPerson} from "react-icons/io";


export default function Header(){
    const [isOpen, setIsOpen] = useState(false);
    const [fixedNav, setFixedNav] = useState (''); //DEIXAR O HEADER FIXO QUANDO TIVER COM A NAV ABERTA

    function controlModal(){
        setIsOpen(!isOpen);
        controlNavStyles();
    }

    function controlNavStyles(){
        if (isOpen === false){
            document.body.style.overflow = 'hidden'; 
            setFixedNav('stylesFixed');
        }
        else{
            document.body.style.overflow = 'auto';
            setFixedNav('');
        }
    }

    function getAudio (value:string){
        try{
        const audio = new Audio(`${value}.wav`);
        audio.play();
        }catch(err){
        console.log('Erro ao reproduzir audio')
        }
    }

    Modal.setAppElement('#__next');
    return(
        <>
            <header className={`${[styles.container]} ${styles[fixedNav]}`}>
                <img src="vila.svg" alt="folha icone"
                className={styles.iconVila}/>
                <label className={styles.labelSearch}>
                    <input type="search" className={styles.inputSearch}
                    placeholder="Busca..."/>
                    <p><AiOutlineSearch/></p>
                </label>
                <div className={styles.buttonsHeader}>
                    <button  onClick={()=>getAudio('01')}><AiOutlineShoppingCart/></button>
                    {isOpen?(
                        <button onClick={ controlModal} className={styles.closed}><AiOutlineClose/></button>
                    ):(
                        <button onClick={ controlModal}><AiOutlineMenu/></button> 
                    )}
                </div>
                <Modal isOpen={isOpen}
                onRequestClose={controlModal}
                style={{overlay:{
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}}
                className={styles.modal}>   
                    <div className={styles.Modalcontainer}>
                        <label className={styles.sigin}>
                            <BiSolidUser/>
                            <h2>Olá, Faça seu login</h2>
                            <button onClick={()=>getAudio('13')}/>
                        </label>
                        <div className={styles.AllList}>
                            <ul className={styles.list1}>
                                <li onClick={()=>getAudio('09')}><AiFillHome/> <p>Minha conta</p></li>
                                <li onClick={()=>getAudio('10')}><BiSolidUser/> <p>Meus dados</p></li>
                                <li onClick={()=>getAudio('11')}><BsFillBagFill/><p>Meus pedidos</p></li>
                            </ul>

                            <ul className={styles.list2}>
                                <li onClick={()=>getAudio('12')}><IoIosPerson/> <p>Gabriel Fernandes</p></li>
                                <li><a target='_blank' href="https://www.linkedin.com/in/ferndsgabriel/"><BiLogoLinkedin/> <p>Linkedin</p></a></li>
                                <li><a target='_blank' href="https://github.com/fndsgabriel"><BiLogoGithub/> <p>Github</p></a></li>
                                <li><a target='_blank' href="https://portfolioferndsgabriel.vercel.app/portfolio"><RiFileList3Line/> <p>Portfólio</p></a></li>
                            </ul>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={()=>getAudio('13')}>Login</button>
                            <button onClick={()=>getAudio('14')}>Cadastro</button>
                        </div>
                    </div>
                </Modal>
            </header>
            <div className={styles.margin}>
            </div>
        </>
    )       
}


