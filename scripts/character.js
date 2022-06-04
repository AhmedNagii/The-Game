import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

class Character{

constructor (data) {
  Object.assign(this, data);
  this.diceHtml = getDicePlaceholderHtml(this.diceCount);

  this.maxHealth = this.health;
}

  setDiceHtml = () => {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceHtml = this.currentDiceScore
      .map((num) => `<div class="dice">${num}</div>`)
      .join("");
  }

  takeDamage = (attackScoreArray) => {
    const totalAttackScore = attackScoreArray.reduce(
      (total, currentNum) => total + currentNum
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.isDead = true;
      this.health = 0;
     
    }
   
  };

  getHealthBarHtml = () => {
    const percent = getPercentage(this.maxHealth, this.health);

    return `<div class="health-bar-outer">
    <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
            style="width:${percent}%;">
         </div>
       </div>`  
  };

  getCharacterHtml = () => {
    
    const healthBar = this.getHealthBarHtml();

    return `
            <div class="character-card">
                <h4 class="name"> ${this.name} </h4>
                <img class="avatar" src="${this.avatar}" />
                ${healthBar}
                <div class="health">health: <b> ${this.health} </b>
              
               </div>
                
                <div class="dice-container">
                    ${this.diceHtml}
                </div>
            </div>`
  }
}

export { Character };



