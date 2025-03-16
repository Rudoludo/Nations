import React from 'react'
import {motion} from 'framer-motion'

export default function WinBtn({winState,text,winner, compare}) {
    let p1 =1;
    let p2 =1;

    if( winner == "1" ){
        p1 = 2;
        
    } else {
        
        p2 =2;
    }

    const buttonAnimation = {
        hidden:{
            opacity: 0,
            visibility: "hidden",
            y:-100,
        },
        visible:{
            opacity:1,
            visibility:"visible",
            y:0,
        },
        exit:{
            opacity: 0,
            visibility: "hidden",
            y:-100,
        },
    }
    
  return (
    <motion.button 
        className={`btn win`}
        id="btn-win"
        variants={buttonAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{scale: 1.1}} 
        whileTap={{scale: 0.9}} 
        onClick={()=>{
            
            winState(winner)}}
    >{text.toUpperCase()}
    </motion.button>
  )
}
