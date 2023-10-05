import Header from "./components/header";
import { Promotions, Highlights, AllItens } from "@/fakebank";
import styles from "../styles/home.module.scss";
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineFilter } from "react-icons/ai";
import {GiSharpShuriken} from "react-icons/gi";
import {BsFillCartPlusFill} from "react-icons/bs";
import {FaMoneyCheckAlt} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import react,{useState, useEffect, useRef} from "react";
import {BiLogoFacebook,BiLogoInstagram,BiLogoYoutube, BiLogoLinkedin,BiLogoTiktok} from "react-icons/bi";




export default function Home(){
  const promotions = Promotions;
  const highlight = Highlights;
  const allItens = AllItens;
  const [promotionIndex, setPromotionIndex] = useState (0);
  const refCards = useRef<HTMLDivElement>(null);
  const [viewAll, setViewAll] = useState(false);
  const [styleViewAll, setStyleViewAll] = useState('');
  const [filter, setFilter] = useState ('');
  const [itensFilter, setItensFilter] = useState(AllItens);


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

  function automationNextPromotion() {
    const nextIndex = (promotionIndex + 1) % promotions.length;
    setPromotionIndex(nextIndex);
  };

  
  useEffect(() => {
    const intervalId = setInterval(automationNextPromotion, 5000);

    return () => clearInterval(intervalId);
  }, [promotionIndex, promotions]);
  

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
  


  



  function filterBy(filter:string) {
    switch(filter){
      case 'menorP':
        const sorted1 = [...itensFilter];
        sorted1.sort((a, b) => a.price - b.price);
        setItensFilter(sorted1);
        break;
          case 'maiorP':
            const sorted2 = [...itensFilter];
            sorted2.sort((a, b) =>  b.price - a.price);
            setItensFilter(sorted2);
            break;
              case 'nomeC':
                const sorted3 = [...itensFilter];
                sorted3.sort((a, b) =>  a.name.localeCompare(b.name));
                setItensFilter(sorted3);
                break;
                  case 'nomeD':
                    const sorted4 = [...itensFilter];
                    sorted4.sort((a, b) =>  b.name.localeCompare(a.name));
                    setItensFilter(sorted4);
                    break;
    }
  }
  

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
              <h3>R$ {promotions[promotionIndex].price.toFixed(2)}</h3>
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
                      <p>R$ {item.price.toFixed(2)}</p>
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

      <section className={styles.sectionAllItens}> 
        <div className={styles.filterArea}>         
              <AiOutlineFilter/>
            <select onChange={(e) => filterBy(e.target.value)}  className={styles.selectOrder}> 
              <option value="">Ordenar por </option>
              <option value="menorP">Menores preços</option>
              <option value="maiorP">Maiores preços</option>
              <option value="nomeC">Nome crescente</option>
              <option value="nomeD">Nome decrescente</option>
          </select>
        </div>
        <div className={styles.allCards}>
            {itensFilter.map((item,index)=>{
              return(
                <div key={item.id} className={styles.card}>
                  <button className={styles.addCar}>
                      <BsFillCartPlusFill/>
                    </button>
                      <div className={styles.aboutAndPrice}>
                      <img src={item.img} alt="produtos em destaque" width={100}/>
                        <div>
                          <h3>{item.name}</h3>
                          <p>R$ {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <button className={styles.buy}>Comprar</button>
                </div>
              )
            })}
        </div>
      </section>

      <footer className={styles.footer}>
            <div className={styles.signup}>
              <div className={styles.logo}>
                <h3>Naruto Store</h3>
                <GiSharpShuriken/>
              </div>   
              <form className={styles.form}>
                <input type="text" placeholder="Qual é o seu nome?"/>
                <input type="text" placeholder="Seu e-mail?"/>
                <button>Cadastrar</button>
              </form>
            </div>

            <div className={styles.vilas}>
              <div className={styles.cardVila}>
                <p>Vila Oculta da Folha</p>
                <button>
                  <AiOutlineArrowRight/>
                </button>
              </div>

              <div className={styles.cardVila}>
                <p>Vila Oculta da Névoa</p>
                <button>
                  <AiOutlineArrowRight/>
                </button>
              </div>

              <div className={styles.cardVila}>
                <p>Vila Oculta da Pedra</p>
                <button>
                  <AiOutlineArrowRight/>
                </button>
              </div>

              <div className={styles.cardVila}>
                <p>Vila Oculta da Nuvem</p>
                <button>
                  <AiOutlineArrowRight/>
                </button>
              </div>

              <div className={styles.cardVila}>
                <p>Vila Oculta da Areia</p>
                <button>
                  <AiOutlineArrowRight/>
                </button>
              </div>
              <div className={styles.sociais}>
                <p>Mídias sociais</p>
                <div className={styles.buttons}>
                  <button>
                    <BiLogoFacebook/>
                  </button>
                  <button>
                    <BiLogoInstagram/>
                  </button>
                  <button>
                    <FaXTwitter/>
                  </button>
                  <button>
                    <BiLogoYoutube/>
                  </button>
                  <button>
                    <BiLogoLinkedin/>
                  </button>
                  <button>
                    <BiLogoTiktok/>
                  </button>
                </div>
              </div>
            </div>
      </footer>
    </>
  )
}

