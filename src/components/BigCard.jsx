import React, { useState,useEffect } from 'react'
import { animate, AnimatePresence, motion } from 'framer-motion'
import CountUp from './Contup'
import TiltedCard from './TiltedCard/TiltedCard'
import Glow from './glow'



export default function BigCard({ flipFlag, nat, handleButtonClick,
    selectedStat, stats, showCountUp, minValue , startCompare}) {


    const [play, setPlay] = useState(false)

    const [countUp, setCountUp] = useState(null)
    const [step, setStep] = useState(false)
    const [min, setMin] = useState(null)

    useEffect(() => {
        minValue != null && setMin(minValue)
    }, [minValue])


    useEffect(() => {
        showCountUp && setCountUp(true)
    }, [showCountUp])








    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }

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

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
            onAnimationComplete={() => setPlay(true)}


        >



            <div className="front">
                <p>Front</p>
            </div>

            <div className="back">
                <TiltedCard
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={





                        <div className='backCard'>

                            <div className='flag'><img className="flagImg" src={`https://flagsapi.com/${nat.flag}/flat/64.png`} /></div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="button-container"

                            >

                                {play && visibleButtons.map((stat, index) => (


                                    <motion.button
                                        key={stat.key}
                                        variants={buttonVariants}
                                        className={`minibtn item${index} ${visibleButtons.length === 1 ? "single-btn" : ""}`}
                                        onClick={() => {
                                            handleButtonClick(stat)
                                            /* setPlay(false) */
                                        }}
                                    >
                                        {stat.display}
                                    </motion.button>
                                ))
                                }
                            </motion.div>

                            {min != null &&
                                <div className='playValue'>



                                    {selectedStat && (
                                        countUp &&
                                        <CountUp
                                            from={0}
                                            to={min}
                                            separator=","
                                            direction="up"
                                            /* duration={1} */
                                            className="count-up-text"
                                            onEnd={() => {
                                                if (selectedStat.accessor(nat) > min) {
                                                    setStep(true);
                                                    setCountUp(false);
                                                } else {
                                                    null;
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

                    } />








            </div>



        </motion.div>


    )
}
