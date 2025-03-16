import React from 'react'
import BigCard from './BigCard'
import BigCpuCard from './BigCpuCard'
import {motion,AnimatePresence} from 'framer-motion'


export default function Card({type,flip,flipFlag, gameState,nat,handleButtonClick,selectedStat,stats,setShowCountUp,showCountUp,startCompare}) {
    

    const shifX =(getComputedStyle(document.documentElement).getPropertyValue("--shiftX"))
    const shifX2 = `-${shifX}`

    const shifY =(getComputedStyle(document.documentElement).getPropertyValue("--shiftY"))
    const shifY2 = `-${shifY}`


    const marginX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--marginX")) || 0;
    const cardX2 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--cardX") )|| 0;

    const calcOver = `${100 - (marginX * 2) - (cardX2 / 2)}vw`;
    const calcOver2 = `-${calcOver}`
        

    const leftOrRight = ((type=="1")? "left" : "right")

    let exit1 = [shifX,0,0]
    let exit2 = [shifX2,0,0]

    console.log(gameState)
    

     if (gameState == "1") {
        
        exit2 = [shifX2,calcOver2,calcOver2]
    } else if (gameState == "2"){
        exit1 = [shifX,calcOver,calcOver]
        

    } 

    
    

    

      const moveToCenter = {
        hidden: {
          opacity: 0,
          
          scale: "var(--scale)",
        },
        animate: {
            opacity: [0, 1, 1],  
            x: (leftOrRight == "left" ? [0,0,shifX] : [0,0,shifX2]), 
            y: [0,0,shifY2],
            
            
            scale: ["var(--scale)", "var(--scale)", 1],  
            transition: {
              duration: 1,  
              times: [0, 0.3, 1],  
              ease: "easeOut",
            },
        },
        
        exit: {
            zIndex : [0], 
            opacity: [1, 1,0],  
            y: [shifY2,0,0],  
            /* x: (leftOrRight == "left" ? [shifX,0,0] : [shifX2,calcOver,calcOver]),  */
            x: (leftOrRight == "left" ? exit1 : exit2 ),
            
            
            scale: [1, "var(--scale)", "var(--scale)"],  
            transition: {
              duration: 1,  
              times: [0, 1],  
              
            },
          },
      };
      
      
  return (
    <motion.div 
        className={"container"+type} 
        id={`card${type}sm`}
        key={`card${type}sm`}

        variants={moveToCenter}
        initial="hidden"
        animate="animate"
        exit="exit"

        onClick={type == "1" ? flip : null}
        
        >
            {type == "1" && 
            <BigCard 
            flipFlag={flipFlag} 
            nat={nat} 
            handleButtonClick={handleButtonClick}
            selectedStat={selectedStat}
            stats={stats}
            showCountUp={showCountUp}
            />
            

            }

            {type == "2" && 
            <BigCpuCard
            startCompare={startCompare}
            flipFlag={flipFlag} 
            nat={nat} 
            selectedStat={selectedStat}
            stats={stats}
            setShowCountUp={setShowCountUp}
            showCountUp={showCountUp}

            
            />
            
            }


        

    </motion.div>
  )
}
