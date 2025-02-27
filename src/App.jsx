import { useEffect, useState } from 'react'
import './App.css'
import nations from './data/eu_nations.json'
import Card from './components/Card'
import CpuCard from './components/CpuCard'
import ReactCardFlip from 'react-card-flip';




function App() {

  const [isFlipped, setIsFlipped] = useState(true)

  const deckSize = 4
  const differentsCards = 30

  //PLAYERS DECKS
  const [randomss,SetRandomss] = useState([])
  const [cpuRandomss,SetCpuRandomss] = useState([])

  //DECK TOTAL CARDS
  const [deck,SetDeck] =useState(deckSize)
  const [cpuDeck,SetCpuDeck] = useState(deckSize)


  const [randomIndex, SetRandomIndex] = useState(0)
  const [randomCpuIndex, SetCpuRandomIndex] = useState(0)



  //PLAYER CARD INDEX ON THE NATIONS DICT
  const [displayCard, setDisplayCard] = useState(null)
  const [cpuDisplayCard, setCpuDisplayCard] = useState(null)

  

  const [myScore,SetMyScore] = useState(0)
  const [cpuScore,SetCpuScore] = useState(0)

  const [nbutton,SetNbutton]=useState(false)
  const [result,SetResult] = useState("")
  
  
  
  
  const[pshow,setPshow] = useState("block")
  const[cshow,setCshow] = useState("block")

  

  function checkWinner(listLength){
    if (listLength == 0){
      SetResult("GAME OVER")
      setCshow("none")
      return true

    }
    
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



  function compare(my,their){
    if (my > their) {
      
      const newScore = myScore + 1
      SetResult("WON")
      SetMyScore(newScore)

      console.log(`WON, stealing ${cpuRandomss[randomCpuIndex]}`)
      SetRandomss([...randomss,cpuRandomss[randomCpuIndex]])

      const newDeck = cpuRandomss.filter((item,itemIndex)=>{
        return itemIndex !== randomCpuIndex
      })
      console.log(newDeck)

      if (checkWinner(newDeck.length)){
        return
      }
      ///ADDCHECK HERE
      SetCpuRandomss(newDeck)
      ///SetRandomIndex(randomIndex+1)
      SetRandomIndex(updateIndex(randomss.length,randomIndex,1))
      SetCpuRandomIndex(updateIndex(cpuRandomss.length,randomCpuIndex,0))

      
    }
    else if (my === their) {
      SetResult("DRAW")

      ///SetCpuRandomIndex(randomCpuIndex+1)
      SetCpuRandomIndex(updateIndex(cpuRandomss.length,randomCpuIndex,1))

      ///SetRandomIndex(randomIndex+1)
      SetRandomIndex(updateIndex(randomss.length,randomIndex,1))
      
    }
    else {
      console.log(`LOST, losing ${randomss[randomIndex]}`)
      const newScore = cpuScore + 1
      SetCpuScore(newScore)
      SetResult("LOST")
      nextCard()

      SetCpuRandomss([...cpuRandomss,randomss[randomIndex]])

      const newDeck = randomss.filter((item,itemIndex)=>{
        return itemIndex !== randomIndex
      })
      ///ADDCHECKHERE
      console.log(newDeck)
      SetRandomss(newDeck)

      ///SetCpuRandomIndex(randomCpuIndex+1)
      SetCpuRandomIndex(updateIndex(cpuRandomss.length,randomCpuIndex,1))
      SetRandomIndex(updateIndex(randomss.length,randomIndex,0))
    }

    

    
  }

  function getRandom(){
    let newRandomss = []
    let cpuRandomss = []
    for (let i = 0; i<deckSize; i++){
    newRandomss.push(Math.floor((Math.random() * differentsCards))+1)
    cpuRandomss.push(Math.floor((Math.random() * differentsCards))+1)
    
    }
    SetRandomss(newRandomss)
    SetCpuRandomss(cpuRandomss)
    console.log("DECKS GENERATED")
    
  }
  
  useEffect(()=>{
    getRandom()
    

  },[])



  useEffect(()=>{
    
    if (randomss.length > 0) {
      console.log(`random index ${randomIndex}`)
      console.log(randomss)
      console.log(`cpu random index ${randomCpuIndex}`)
      console.log(cpuRandomss)
      
      SetDeck(randomss.length)
      SetCpuDeck(cpuRandomss.length)


      
      const firstCardIndex = randomss[randomIndex]
      const cpuCardIndex = cpuRandomss[randomCpuIndex]
      
      setDisplayCard(firstCardIndex)
      setCpuDisplayCard(cpuCardIndex)

      console.log(`first card index : ${firstCardIndex}`)

      console.log(`first card: ${nations[firstCardIndex].name}`)

  }},[randomIndex,randomCpuIndex,randomss])
  

  return (
    <>
    <button>{result}</button>
    

    <div className='cards'>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

        

        <div>
          <Card   nat={nations[displayCard]}  cpu = {nations[cpuDisplayCard]} index={displayCard} compare={compare}>

              
          </Card>

        </div>

        <div  onClick={() => setIsFlipped(false)} className='cardBack'>
          <h1>WOWOOW</h1>
        </div>
        
      </ReactCardFlip>

      <div style={{ display: pshow }}>

          <Card nat={nations[displayCard]}  cpu = {nations[cpuDisplayCard]} index={displayCard} compare={compare}>

          
          </Card>
          
          <h2>cards : {deck}</h2>
      
      </div>

      <div style={{ display: cshow }}>
      <CpuCard nat={nations[cpuDisplayCard]} index={cpuDisplayCard} > </CpuCard>
      
      <h2>cards : {cpuDeck}</h2>
      </div>
      
    </div>
    </>
  )
}

export default App


///STEAL