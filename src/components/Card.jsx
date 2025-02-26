import React from 'react'

export default function Card(props) {
    const {nat,cpu,index,compare} = props

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }

    if (!nat) return <p>Loading card...</p>
    console.log(nat)
    
  return (
    <div className='card'>
    <p>index {index}</p>
    <h2><img src={`https://flagsapi.com/${nat.flag}/flat/64.png`} /></h2>
    
    <p>population : <button onClick={()=>compare(nat.population,cpu.population)}>{numberWithCommas(nat.population)}</button> </p>
    <p>cap population : <button onClick={()=>compare(nat.capital_population,cpu.capital_population)}>{numberWithCommas(nat.capital_population)}</button></p>
    <p>Name length : <button onClick={()=>compare(nat.name.length,cpu.name.length)}> {nat.name.length}</button></p>
    <p>GDP : <button onClick={()=>compare(nat.GDP,cpu.GDP)}>{numberWithCommas(nat.GDP)} millions USD</button></p>
    <p>Average Income: <button onClick={()=>compare(nat.PCI,cpu.PCI)}>{numberWithCommas(nat.PCI)} $</button></p>
    </div >
  )
}
