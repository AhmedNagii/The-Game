import {getDiceRollArray} from "./utils"


function Character(data) {
    Object.assign(this, data);
  
    this.getDiceHtml = function (diceCount) {
      return getDiceRollArray(diceCount)
        .map(function (num) {
          return `<div class="dice">${num}</div>`;
        })
        .join("");
    };
  
    this.getCharacterHtml = function () {
      let diceHtml = getDiceHtml(this.diceCount);
  
      return `<div class="character-card">
            <h4 class="name"> ${this.name} </h4>
            <img class="avatar" src="${this.avatar}" />
            <div class="health">health: <b> ${this.health} </b></div>
            <div class="dice-container">    
                ${diceHtml}
            </div>
        </div>`;
    };
  }

  export {Character}