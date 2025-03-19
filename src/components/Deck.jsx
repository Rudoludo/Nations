import React from 'react'
import {motion} from 'framer-motion'

export default function Deck({deckIndex,current}) {
    
  return (

    <div className={`deck${deckIndex}`}>

      {current > 0 && <motion.div 
                        className='deckCount'
                        initial={{scale:0.5, opacity: 0,}}
                        whileHover={{scale: 1.1, opacity :1,}} >
                          <h1 >{current} 
                          </h1>
                          
                      </motion.div>}

    </div>
  )
}
