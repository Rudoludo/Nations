import React from 'react'
import { motion, spring } from 'framer-motion'
import Backdrop from './Backdrop'




export default function Modal({ text, restart, gameState}) {
    
    const firstMessage= "Challenge your Countries' knowledge"

    console.log(`modal Gamestate : ${gameState}`)
    
    
    const dropIn = {
        hidden:{
            y: "-100vh",
            opacity: 0,
        },
        visible:{
            y:"0",
            opacity:1,
            transition: {
                duration: 0.1,
                type: spring,
                damping:25,
                stiffness:500,
    
            },
    
    
        },
        exit:{
            y: "100vh",
            opacity: 0,
    
        }
    }
  return (
    <Backdrop >
        <motion.div 
            /* onClick={(e)=> e.stopPropagation}  */
            className='modal'
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >

            <h1>{text}</h1>
            {gameState == "6" && <h2>{firstMessage}</h2>}

            <motion.button className='btn' onClick={restart}>
                {gameState == "6" ? "PLAY" : "RESTART" }
            </motion.button>
        </motion.div>
    </Backdrop>
  )
}
