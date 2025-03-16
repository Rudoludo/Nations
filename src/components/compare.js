function compare(my, their) {
  
  if (my > their) {    
    SetResult("WON");
    setGameState("1");
    console.log(`WON, stealing ${cpuRandomss[randomCpuIndex]}`);
    SetRandomss([...randomss, cpuRandomss[randomCpuIndex]]);
    const newDeck = cpuRandomss.filter((item, itemIndex) => {
      return itemIndex !== randomCpuIndex;
    })
    console.log(newDeck);
    if (checkWinner(newDeck.length)) {
      return
    }
    ///ADDCHECK HERE
    SetCpuRandomss(newDeck);
    ///SetRandomIndex(randomIndex+1)
    SetRandomIndex(updateIndex(randomss.length, randomIndex, 1));
    SetCpuRandomIndex(updateIndex(cpuRandomss.length, randomCpuIndex, 0));
  }
  else if (my === their) {
    SetResult("DRAW");
    ///SetCpuRandomIndex(randomCpuIndex+1)
    SetCpuRandomIndex(updateIndex(cpuRandomss.length, randomCpuIndex, 1));
    ///SetRandomIndex(randomIndex+1)
    SetRandomIndex(updateIndex(randomss.length, randomIndex, 1));
  }
  else {
    console.log(`LOST, losing ${randomss[randomIndex]}`);
    SetResult("LOST");
    /* nextCard() */
    SetCpuRandomss([...cpuRandomss, randomss[randomIndex]])
    const newDeck = randomss.filter((item, itemIndex) => {
      return itemIndex !== randomIndex;
    })
    ///ADDCHECKHERE
    console.log(newDeck);
    SetRandomss(newDeck);
    ///SetCpuRandomIndex(randomCpuIndex+1)
    SetCpuRandomIndex(updateIndex(cpuRandomss.length, randomCpuIndex, 1));
    SetRandomIndex(updateIndex(randomss.length, randomIndex, 0));
  }
}

export default compare;