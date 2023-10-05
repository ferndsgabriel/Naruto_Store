import {AiOutlineSearch, AiOutlineShoppingCart , AiOutlineMenu} from "react-icons/ai";


import styles from "./styles.module.scss";
function getAudio (value:string){
        try{
        const audio = new Audio(`${value}.wav`);
        audio.play();
        }catch(err){
        console.log('Erro ao reproduzir audio')
        }
    }
export default function Header(){
    return(
        <header className={styles.container}>
            <img src="vila.svg" alt="folha icone"
            className={styles.iconVila}/>
            <label className={styles.labelSearch}>
                <input type="search" className={styles.inputSearch}
                placeholder="Busca..."/>
                <p><AiOutlineSearch/></p>
            </label>
            <div className={styles.buttonsHeader}>
                <button  onClick={()=>getAudio('01')}><AiOutlineShoppingCart/></button>
                <button><AiOutlineMenu/></button>
            </div>
        </header>
    )
}