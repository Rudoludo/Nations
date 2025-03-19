import React from 'react'
import { useTime,useTransform,motion } from "framer-motion"

export default function Glow({children}) {
    const time = useTime();

    const rotate = useTransform(time, [0,3000],[0,360],{
        clamp: false,
    })

    const rotatingBg = useTransform(rotate, (r) =>{
        /* return `conic-gradient( from ${r}deg,)` */
        return `conic-gradient( from ${r}deg at 100% 100%,  #ffd04303,#fff8d1, #ffd04303)`;    })

  return (
    <div className="glowContainer"> 
    
    {children}


    <motion.div
    className="glow"
    style={{
        background:rotatingBg, }}
    />

</div>
  )
}
