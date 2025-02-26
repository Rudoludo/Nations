let myArray = [1,2,3,4,5]
let cpuArray = [5,6,7,6,7]

let i=0
let j=0

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

let counter = 0
while (true){

    counter = counter + 1
    console.log(`my array: ${myArray}-i:${i}, cpu array : ${cpuArray}-j${j}`)
    
    coin= getRndInteger(1, 4)
    
    if (myArray.length == 0 || cpuArray.length == 0) {
        console.log(`GAME OVER a the ${counter} turn`)
        break}

    if (i >= myArray.length){
        console.log(`resetting i`)
        i=0}

    if (j >= cpuArray.length){
        console.log(`resetting j`)
        j=0}


    if (coin == 1){
        console.log(`WON, stealing ${cpuArray[j]}`)
        myArray= [...myArray,cpuArray[j]]
        cpuArray.splice(j, 1)
        
        i= i +1}
    else if (coin == 2){
        console.log(`DRAW, nothing happens`)
        i=i+1
        j=j+1}
    else if (coin==3){
        console.log(`LOST, getting robbed of ${myArray[i]}`)
        cpuArray= [...cpuArray,myArray[i]]
        
        myArray.splice(i, 1)
        j = j+1}
    } 

