import React from 'react'
import { motion, spring } from 'framer-motion'

export default function DrawBtn({playDraw,text}) {
    const buttonAnimation = {
        hidden:{
            opacity: 0,
            visibility: "hidden",
            y:100,
        },
        visible:{
            opacity:1,
            visibility:"visible",
            y:0,
        },
        exit:{
            opacity: 0,
            visibility: "hidden",
            y:100,
        },
    }

  return (
    <motion.button 
        className="btn draw" 
        id="btn-draw"
        variants={buttonAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{scale: 1.1}} 
        whileTap={{scale: 0.9}} 
        onClick={playDraw}
    >{text}
    </motion.button>
  )
}
