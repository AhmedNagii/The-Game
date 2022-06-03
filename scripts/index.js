import characterData from "./data.js";
import { Character } from "./character.js";

function attack() {
  wizard.getDiceHtml();
  orc.getDiceHtml();
  wizard.takeDamage(orc.currentDiceScore);
  orc.takeDamage(wizard.currentDiceScore);

  render();
  if (wizard.isDead || orc.isDead) {
    endGame();
  }
}




function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = orc.getCharacterHtml();
}

function endGame() {
  const endMessage =
    orc.health === 0 && wizard.health > 0
      ? "The Wizard Wins"
      : wizard.health === 0 && orc.health > 0
      ? "The Orc is Victorious"
      : "No victors - all creatures are dead";

  const endEmoji = wizard.health > 0 ? "🔮" : "☠️";

  document.body.innerHTML = `<div class="end-game">
  <h2>Game Over</h2>
  <h3>${endMessage}</h3>
  <p class="end-emoji">${endEmoji}</p>
</div>`;
}

document.getElementById("attack-button").addEventListener("click", attack);

const wizard = new Character(characterData.hero);
const orc = new Character(characterData.monster);
render();
