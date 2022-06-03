import { getDiceRollArray, getDicePlaceholderHtml } from "./utils.js";








const  getPercentage = (maximumHealth , remainingHealth ) => 

Math.floor( (100 * remainingHealth) / maximumHealth)







function Character(data) {
  Object.assign(this, data);
  this.diceArray = getDicePlaceholderHtml(this.diceCount);

 this.maxHealth = this.health


  this.getHealthBarHtml = () => {
    const percent = getPercentage(this.maxHealth, this.health)
     
    return `<div class="health-bar-outer">
    <div class="health-bar-inner ${percent <= 25? "danger" : "" } " 
        style="width: ${percent}%;">
    </div>
</div>`  
  }
  this.getDiceHtml = () => {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((num) => `<div class="dice">${num}</div>`)
      .join("");
  };

  this.takeDamage = (attackScoreArray) => {
    const totalAttackScore = attackScoreArray.reduce( (total, currentNum) => total + currentNum);
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.health = 0;
      this.isDead = true;
    }
   //console.log( `take damage method` + getPercentage(this.maxHealth, this.health))
  };

  this.getCharacterHtml = () => {
   const healthBar = this.getHealthBarHtml()
   

    return  `
    <div class="character-card">
        <h4 class="name"> ${this.name} </h4>
        <img class="avatar" src="${this.avatar}" />
        ${healthBar}
        <div class="health">health: <b> ${this.health} </b></div>
        
        <div class="dice-container">
            ${this.diceArray}
            </div>
            </div>`
   
  };
}

export { Character };
