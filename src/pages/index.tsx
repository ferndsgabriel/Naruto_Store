import { Header } from "./components/header";
import { Promotions, Highlights } from "@/fakebank";
import styles from "../styles/home.module.scss";
import {AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {GiSharpShuriken} from "react-icons/gi";
import {BsFillCartPlusFill} from "react-icons/bs";
import {FaMoneyCheckAlt} from "react-icons/fa";
import {useState, useEffect, useRef} from "react";


export default function Home(){
  const promotions = Promotions;
  const highlight = Highlights;
  const [promotionIndex, setPromotionIndex] = useState (0);
  const refCards = useRef<HTMLDivElement>(null);
  const [viewAll, setViewAll] = useState(false);
  const [styleViewAll, setStyleViewAll] = useState('');

  function nextProdut(value:number){
    const limit = promotions.length - 1
    if (promotionIndex === 0 && value === -1){
      setPromotionIndex(limit)
      return
    }
    else if (promotionIndex === limit){
      setPromotionIndex(0)
    }
    else{
      setPromotionIndex(promotionIndex + value)   
    }

  }

  function automationNextPromotion(){
    setInterval(()=>{
      const limit = promotions.length - 1
      if (promotionIndex === limit){
        setPromotionIndex(0);
      }
      else{
        setPromotionIndex(promotionIndex + 1);
      }
    },5000)
  }

  const estiloDoProduto = {
    backgroundImage: `url(${promotions[promotionIndex].img})`,
  };

  function scrollHighlight(value: number) {
    if (refCards.current !== null) {
      refCards.current.scrollBy({
        top: 0,
        left: value,
        behavior: 'smooth',
      });
    }
  }

  function viewAllHighlights(){
    setViewAll(!viewAll);
    setStyleViewAll('viewAllStyle');
    if(styleViewAll === 'viewAllStyle'){
      setStyleViewAll('');
    }
  }
  

  useEffect(()=>{
    automationNextPromotion()
  },[promotionIndex, Home])

  return(
    <>
      <Header/>
      <section className={styles.promotion}>
        <div className={styles.conteudo} style={estiloDoProduto}>  
          <button className={styles.nextProduct} onClick={()=>nextProdut(-1)}>
              <AiOutlineArrowLeft/>
          </button>
            <div className={styles.info}>
              <h3>{promotions[promotionIndex].name}</h3>
              <h3>R$ {promotions[promotionIndex].price}</h3>
            </div>
            <button className={styles.buy}>
              Comprar
            </button>
          <button className={styles.nextProduct} onClick={()=>nextProdut(+1)}>
              <AiOutlineArrowRight/>
            </button>
          </div>
      </section>

      <span className={styles.orange}>
        {promotions.map((item, index)=>{
          var classNames = ''
          if (index === promotionIndex){
            classNames = 'indexclass'
          }
          return(
            <GiSharpShuriken key={index} className={`${styles[classNames]}`} />
          )
        })}
      </span>

      <main className={styles.highlight}>
        <p>Destaques - {highlight.length }</p>
        <div className={`${styles.highlightCards} ${styles[styleViewAll]}`}ref={refCards}>
          {highlight.map((item,index)=>{
            return(
              <div key={item.id} className={styles.card}>
                <button className={styles.addCar}>
                  <BsFillCartPlusFill/>
                </button>
                  <div className={styles.aboutAndPrice}>
                  <img src={item.img} alt="produtos em destaque" width={100}/>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.price}</p>
                    </div>
                  </div>

                  <label className={styles.highlightLabel}>
                      <div className={styles.svg}>
                        <FaMoneyCheckAlt/>
                      </div>
                      <button>Comprar</button>
                  </label>
              </div>
            )
          })}
        </div>
        {!viewAll?(
          <>
            <button className={`${styles.controlScroll} ${styles.scrollLeft}`}
            onClick={()=>scrollHighlight(-200)}>
              <AiOutlineArrowLeft/>
            </button>
            <button className={`${styles.controlScroll} ${styles.scrollRight}`}
            onClick={()=>scrollHighlight(+200)}>
              <AiOutlineArrowRight/>
            </button>
          </>
        ):null}

          {!viewAll?(
            <button className={styles.viewAll}
                onClick={viewAllHighlights}>
              Ver todos
            </button>
          ):(
            <button className={styles.viewAll}
            onClick={viewAllHighlights}>
              Ver menos
            </button>
          )}

      </main>

    </>
  )
}