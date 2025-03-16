import React, { useState } from 'react'
import { animate, AnimatePresence, motion } from 'framer-motion'
import CountUp from './Contup'
import TiltedCard from './TiltedCard/TiltedCard'



export default function BigCard({ flipFlag, nat, handleButtonClick,
    selectedStat, stats, showCountUp }) {


    const [play, setPlay] = useState(false)








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

        <TiltedCard
                    /* imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="300px"
                    imageHeight="300px"
                    imageWidth="300px" */
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
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

                

                        

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="button-container"

                >
                    <h2><img src={`https://flagsapi.com/${nat.flag}/flat/64.png`} /></h2>
                    {play && visibleButtons.map(stat => (
                        <motion.button
                            key={stat.key}
                            variants={buttonVariants}
                            className="minibtn"
                            onClick={() => handleButtonClick(stat)}
                        >
                            {stat.display}
                        </motion.button>
                    ))
                    }

                    {selectedStat && <h1>

                        {showCountUp &&

                            <CountUp
                                key={showCountUp} // This forces re-render when `showCountUp` changes

                                from={0}
                                to={selectedStat.accessor(nat)}
                                separator=","
                                direction="up"
                                /* duration={1} */
                                className="count-up-text"
                            />}

                        <p> {selectedStat.unit}
                        </p>
                    </h1>}

                </motion.div>



                    
                

                
            </div>
            
        </motion.div>
                    }
                    />

    )
}
