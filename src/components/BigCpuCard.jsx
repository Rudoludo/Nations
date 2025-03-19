import React, { useEffect, useState } from 'react'
import Glow from './glow'
import { animate, AnimatePresence, motion } from 'framer-motion'
import CountUp from './Contup'

export default function BigCpuCard({ flipFlag, nat, maxValue,
    selectedStat, stats, setFlipped, showCountUp, startCompare, minValue }) {

    
    


    
    
    
    const [cpuCountUp,setCpuCountUp]=useState(null)
    const [step, setStep] = useState(false)
    const [min,setMin] = useState(null)
    const [max,setMax] = useState(null)

    useEffect(()=>{
        minValue != null && setMin(minValue)
        maxValue != null && setMax(maxValue)
        
    },[minValue])


    useEffect(()=>{
        showCountUp && setCpuCountUp(true)
        

    },[showCountUp])






    const bCardAnim = {
        still: {
            rotateX: 0,
            rotateZ: 0,



        },
        flip: {
            scale: 1,
            rotateX: 180,
            rotateZ: 180,

        },

        exit: {
            rotateX: 0,
            rotateZ: 0,
            transition: {
                duration: 0.5,
            }

        },

    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 1, // Delay each child by 0.2s
            },
        },
    };

    const visibleButtons = stats.filter(stat =>
        selectedStat === null || selectedStat.key === stat.key
    );

    return (

        <motion.div
            variants={bCardAnim}

            initial="still"
            animate={flipFlag ? "flip" : "still"}

            exit="exit"
            className="card"
            id="card1"
            transition={{ duration: 1 }}

            onAnimationComplete={(definition) => {
                if (definition === "flip") {
                    console.log("Flip animation finished!");
                    setFlipped(true);
                } else {
                    setFlipped(false);
                }
            }}
        >
            <div className="front">
                <p>Front</p>
            </div>

            <div className="back">


                <div className='flag'><img className="flagImg" src={`https://flagsapi.com/${nat.flag}/flat/64.png`} /></div>
                
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="button-container"

                >

                    {visibleButtons.map(stat => (
                        <button
                            key={stat.key}
                            className="minibtn single-btn"
                            onClick={() => null}
                        >
                            {stat.display}
                        </button>
                    ))
                    }

                </motion.div>
                {min != null &&
                <div className='playValue'>
                    
                    
                        
                    {selectedStat && (
                        cpuCountUp &&
                        <CountUp
                            from={0}
                            to={min}
                            separator=","
                            direction="up"
                            /* duration={1} */
                            className="count-up-text"
                            onEnd={() => {
                                console.log(min,max)
                                
                                if (selectedStat.accessor(nat) > min) {
                                    setStep(true);
                                    setCpuCountUp(false);
                                } else if (min == max) {
                                    
                                    
                                    startCompare()
                                }
                            }}
                        />
                    )}
                    
                    

                    {step && 
                    <Glow><CountUp
                    from={min}
                    to={selectedStat.accessor(nat)}
                    separator=","
                    direction="up"
                    /* duration={1} */
                    className="count-up-text"
                    onEnd={startCompare}
                    /></Glow>}



                    {selectedStat && < p > {selectedStat.unit}
                    </p>}
                    
                </div>}


            </div>
        </motion.div >
                    
    )
}




