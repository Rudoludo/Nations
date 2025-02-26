import React from 'react'

export default function CpuCard(props) {
    const {nat,index} = props

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }

    if (!nat) return <p>Loading card...</p>
    console.log(nat)
    
  return (
    <div className='cpuCard'>
    <p>index {index}</p>
    <p><img src={`https://flagsapi.com/${nat.flag}/flat/64.png`} /></p>
    <p>population : <button onClick={()=>{}} >{numberWithCommas(nat.population)}</button> </p>
    <p>cap population : <button>{numberWithCommas(nat.capital_population)}</button></p>
    <p>Name length : <button> {nat.name.length}</button></p>
    <p>GDP : <button>{numberWithCommas(nat.GDP)} millions USD </button></p>
    <p>Average Income: <button >{numberWithCommas(nat.PCI)} $</button></p>
    </div >
  )
}
