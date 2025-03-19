import { useState,useEffect } from 'react'
import { motion, AnimatePresence} from "framer-motion"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import nations from './data/eu_nations.json'
import Modal from './components/Modal'
import Backdrop from './components/Backdrop'
import Glow from './components/glow'

import Deck from './components/Deck'
import DrawBtn from './components/DrawBtn'
import WinBtn from './components/WinBtn'

function App() {

  const deckSize = 1
  const differentsCards = 1

  //PLAYERS DECKS
  const [randomss,setRandomss] = useState([])
  const [cpuRandomss,setCpuRandomss] = useState([])

  //DECK TOTAL CARDS
  const [deck,setDeck] =useState(0)
  const [cpuDeck,setCpuDeck] = useState(0)


  const [randomIndex, setRandomIndex] = useState(0)
  const [randomCpuIndex, setCpuRandomIndex] = useState(0)



  //PLAYER CARD INDEX ON THE NATIONS DICT
  const [displayCard, setDisplayCard] = useState(null)
  const [cpuDisplayCard, setCpuDisplayCard] = useState(null)


  const player="1"
  const cpu="2"

  const [draw, setDraw] = useState(false)
  const [flip1, setFlip1] = useState(false)
  const [flip2, setFlip2] = useState(false)

  
  const [gameState, setGameState] = useState("6")

  const [mainBtn, setMainBtn] = useState("Draw")

  const [resultBtn, setResultBtn] = useState("0")
  



  const [selectedStat, setSelectedStat] = useState(null);
  const [minValue, setMinValue] = useState(null)
  const [maxValue, setMaxValue] = useState(null)
  

  const [flipped, setFlipped] =useState(false)
  const [showCountUp, setShowCountUp] = useState(false);


  const [tieFlag,setTieFLag] = useState(false);
  const [modalOpen,setModalOpen]= useState(false);
  const [modalMessage,setModalMessage] = useState("TOP NATIONS!")

  const close = ()=> setModalOpen(false);
  const open = ()=> setModalOpen(true);

  

    

  const stats = [
      {key: "population", display: "population",unit:"people", accessor: (obj) => obj.population},
      {key: "capital_population", display: "cap population",unit:"people", accessor: (obj) => obj.capital_population},
      ,
      {key: "GDP", display: "GDP", unit:"milions $",accessor: (obj) => obj.GDP},
      {key: "PCI", display: "Average Income",unit:"$", accessor: (obj) => obj.PCI},
      {key: "nameLength", display: "Name length",unit:"letters", accessor: (obj) => obj.name.length}
  ];

  

  const handleButtonClick = (stat) => {

      if (selectedStat === null ){
          // First click - select this button (hide others)
          setSelectedStat(stat);
          const value1 = stat.accessor(nations[displayCard]);
          const value2 = stat.accessor(nations[cpuDisplayCard]);
          setMaxValue(value1 > value2 ? value1 : value2)
          setMinValue(value1 < value2 ? value1 : value2 )
          
          console.log(value1 < value2 ? value1 : value2 )
          setFlip2(true)
          setFlipped(false)

          
        }



      else if  (selectedStat.key === stat.key) {
        // Second click on the same button - call compare function
        
        
        
        
      } 
  };

  const startCompare = () => {

    compare(selectedStat.accessor(nations[displayCard]), selectedStat.accessor(nations[cpuDisplayCard]));
    
  }


  const getRandom = () => {

    setModalOpen(false)

    setDeck(deckSize)
    setCpuDeck(deckSize)
    let newRandomss = []
    let cpuRandomss = []
    for (let i = 0; i<deckSize; i++){
    newRandomss.push(Math.floor((Math.random() * differentsCards))+1)
    cpuRandomss.push(Math.floor((Math.random() * differentsCards))+1)
    
    }
    setRandomss(newRandomss)
    setCpuRandomss(cpuRandomss)
    setRandomIndex(0)
    setCpuRandomIndex(0)
    console.log("DECKS GENERATED")

    setGameState("0")
    
  }
  


  //this function enable to cycle over the deck again

  function updateIndex(listLength,index,gain){


    let lastIndex = listLength-1
    console.log(`updating index : current Index=${index} listend=${lastIndex}`)
    if (index >= lastIndex){
      console.log("newindex:0")
      return 0
    } else  {
      console.log(`new index :${index+1}`)
      return index+gain
    }
  }

  
  useEffect(()=>{
    
    setModalOpen(true)
    

  },[])
  /////////////////////////
  useEffect(()=>{
    console.log(`shocountUP: ${showCountUp}`)
    
    flipped && setShowCountUp(true)
    ///////????????
    !flipped && setShowCountUp(false)

    console.log(`shocountUP updated: ${showCountUp}`)

  },[flipped])

  useEffect(()=>{

     
    
    
    setTimeout(() => {
      if (gameState=="3"){
        setCpuDeck(cpuDeck +1 )
        setDeck(deck + 1)
      }

      //check winner
    if (randomss.length == deckSize * 2){
      setGameState("5");
      setModalMessage("Congratulations YOU WON!")
      setModalOpen(true)
      
    }
    else if (cpuRandomss.length == deckSize * 2){
      setGameState("5");
      
      setModalMessage("YOU LOST!  Try Again!")
      setModalOpen(true)
      
    }

    /* else { setGameState("0")}  */

    setDeck(randomss.length)
    setCpuDeck(cpuRandomss.length)
      
    
    
    if (randomss.length > 0 && cpuRandomss.length > 0) {

      setGameState("0")

      

      console.log(`random index ${randomIndex}`)
      console.log(randomss)
      console.log(`cpu random index ${randomCpuIndex}`)
      console.log(cpuRandomss)
      
      


      
      const firstCardIndex = randomss[randomIndex]
      const cpuCardIndex = cpuRandomss[randomCpuIndex]
      
      setDisplayCard(firstCardIndex)
      setCpuDisplayCard(cpuCardIndex)
      setSelectedStat(null)
      setMinValue(null)

      console.log(`first card index : ${firstCardIndex}`)

      console.log(`first card: ${nations[firstCardIndex].name}`)
      console.log(`XXXXXXX ${showCountUp}`)

    }

    

  }, 600);
},[randomIndex,randomCpuIndex,randomss,tieFlag])
  







  

  const playDraw = () => {
    setShowCountUp(false)

    setCpuDeck(cpuDeck-1)
    setDeck(deck - 1)
    setFlip1(false)
    setFlip2(false)
    setDraw(true);
    setGameState("5");
  }

  const winState = (x) => {
    console.log(`gamestate:${x}`)
    setGameState(x);
    setTimeout(() => {
      
      setDraw(false);
      setResultBtn("0");
      if (x==player){
        win() 
      }
      else if (x==cpu){
        lost()
      }
      else if (x=="3"){
        tie()
      }

      // Show component after 3 seconds
    }, 300);

       
  }

  const flipCard1 = () => setFlip1(true);
  const flipCard2 = () => setFlip2(true);

  //compare function
  function compare(my, their) {
    
    console.log(`called function on ${my} vs ${their}`)
  
    if (my > their) {          
      /* winState("1"); */
      setResultBtn("WIN")
    }
    else if (my === their) {
      setResultBtn("TIE")      
    }
    else {
      setResultBtn("LOST")      
      /* winState("2"); */
    }
    return gameState;
  }

  const win = () => {
    console.log(`WON, stealing ${cpuRandomss[randomCpuIndex]}`);

      setRandomss([...randomss, cpuRandomss[randomCpuIndex]]);
      const newDeck = cpuRandomss.filter((item, itemIndex) => {
        return itemIndex !== randomCpuIndex;
      })
      setCpuRandomss(newDeck);


      console.log(randomss);
      console.log(cpuRandomss)
      console.log(randomss.length)
      console.log(deckSize * 2)

      
      ///setRandomIndex(randomIndex+1)
      setRandomIndex(updateIndex(randomss.length, randomIndex, 1));
      setCpuRandomIndex(updateIndex(cpuRandomss.length, randomCpuIndex, 0));
    
  }

  const lost = ()=>{
    console.log(`LOST, losing ${randomss[randomIndex]}`);
      
      
      setCpuRandomss([...cpuRandomss, randomss[randomIndex]])
      const newDeck = randomss.filter((item, itemIndex) => {
        return itemIndex !== randomIndex;
      })
      ///ADDCHECKHERE
      console.log(newDeck);
      setRandomss(newDeck);
      ///setCpuRandomIndex(randomCpuIndex+1)
      setCpuRandomIndex(updateIndex(cpuRandomss.length, randomCpuIndex, 1));
      setRandomIndex(updateIndex(randomss.length, randomIndex, 0));
  }

  const tie = ()=>{
    ///setCpuRandomIndex(randomCpuIndex+1)
    setCpuRandomIndex(updateIndex(cpuRandomss.length, randomCpuIndex, 1));
    ///setRandomIndex(randomIndex+1)
    setRandomIndex(updateIndex(randomss.length, randomIndex, 1));
    setTieFLag(!tieFlag);
    
  }

  

  return (
    <>
      <AnimatePresence mode='sync'>
        
        {draw && <Card 
          type={player} 
          key={"p" + player} 
          flip={flipCard1} 
          flipFlag={flip1} 
          flipFlag2={flip2}
          gameState={gameState}
          nat={nations[displayCard]}
          nat2 = {nations[cpuDisplayCard]}
          startCompare={startCompare}
          selectedStat={selectedStat}
          handleButtonClick={handleButtonClick}
          showCountUp={showCountUp}
          minValue={minValue}
          
          stats={stats}
        /> }

        {draw && <Card 
          type={cpu} 
          key={"p" + cpu} 
          flip={flipCard2} 
          flipFlag={flip2} 
          gameState={gameState}
          nat={nations[cpuDisplayCard]}
          maxValue={maxValue}
          selectedStat={selectedStat}
          stats={stats}
          showCountUp={showCountUp}
          minValue={minValue}
          setFlipped={setFlipped}
          startCompare={startCompare}
          
        />}

        {(gameState=="0" ) && <DrawBtn playDraw={playDraw} text={mainBtn} />  }

        {(resultBtn=="WIN" ) && <WinBtn winState={winState} text={resultBtn} winner={player} key={`win${player}`} ></WinBtn>}

        {(resultBtn=="LOST" ) && <WinBtn winState={winState} text={resultBtn} winner={cpu} key={`win${cpu}`} ></WinBtn>}
        {(resultBtn=="TIE" ) && <WinBtn winState={winState} text={resultBtn} winner={"3"} key={`win3`} ></WinBtn>}
      </AnimatePresence>

      {deck > 0  && <Deck deckIndex={player} current={deck}/>}
      
      {cpuDeck > 0 && <Deck deckIndex={cpu} current={cpuDeck}/>}


      <AnimatePresence  mode='wait'>
              {modalOpen && <Modal modalOpen={modalOpen} text={modalMessage} restart={getRandom} gameState={gameState}/>}
      </AnimatePresence>
      

      

      

      
     
    </>
  )
}

export default App
