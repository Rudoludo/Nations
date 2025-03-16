import React, { useState } from 'react'
import { animate, AnimatePresence, motion } from 'framer-motion'
import CountUp from './Contup'

export default function BigCpuCard({ flipFlag, nat,
    selectedStat, stats, setShowCountUp, showCountUp,startCompare }) {

    

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

            onAnimationComplete={() => {
                if (flipFlag) {
                  setShowCountUp(true); // Start CountUp when flip finishes
                } else {
                  setShowCountUp(false); // Reset when flipping back
                }
              }}
        >
            <div className="front">
                <p>Front</p>
            </div>

            <div className="back">
                <h2><img src={`https://flagsapi.com/${nat.flag}/flat/64.png`} /></h2>

                {visibleButtons.map(stat => (
                    <button
                        key={stat.key}
                        className="minibtn"
                        onClick={() => null}
                    >
                        {stat.display}
                    </button>
                ))
                }

                {selectedStat && <h1>

                    {showCountUp &&
                        <CountUp
                            from={0}
                            to={selectedStat.accessor(nat)}
                            separator=","
                            direction="up"
                            /* duration={1} */
                            className="count-up-text"
                            onEnd={startCompare}
                        />}

                    <p> {selectedStat.unit}
                    </p>
                </h1>}


            </div>
        </motion.div>

    )
}




