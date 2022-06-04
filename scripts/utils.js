function getDiceRollArray(diceCount) {
  return new Array(diceCount).fill(0).map(() => 
  Math.floor(Math.random() * 6) + 1);
}

const getPercentage = (maximumHealth, remainingHealth) => 
 (100 * remainingHealth) / maximumHealth;


function getDicePlaceholderHtml(diceCount) {
  return new Array(diceCount).fill(0).map( () => 
     `<div class="placeholder-dice"></div>`
    ).join(""); // replace the , between the array members
}


export { getDiceRollArray, getDicePlaceholderHtml, getPercentage };
