import {AiOutlineSearch, AiOutlineShoppingCart , AiOutlineMenu} from "react-icons/ai";


import styles from "./styles.module.scss";
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
                <button><AiOutlineShoppingCart/></button>
                <button><AiOutlineMenu/></button>
            </div>
        </header>
    )
}