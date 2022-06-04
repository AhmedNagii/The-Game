import characterData from "./data.js";
import { Character } from "./character.js";

const attckButtonEl = document.getElementById("attack-button");
let monstersArray = ["orc", "demon", "goblin"];

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
  wizard.setDiceHtml();
  monster.setDiceHtml();
  wizard.takeDamage(monster.currentDiceScore);
  monster.takeDamage(wizard.currentDiceScore);
  render();

  if (wizard.isDead) {
    endGame();
  } else if (monster.isDead) {
    if (monstersArray.length > 0) {
      attckButtonEl.disabled = true;
      attckButtonEl.style.backgroundColor = "gray";
      setTimeout(() => {
        monster = getNewMonster();
        render();
        attckButtonEl.disabled = false;
        attckButtonEl.style.backgroundColor = "#fcc02a";
      }, 1500);
    } else {
      endGame();
    }
  }
}

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

function endGame() {
  attckButtonEl.disabled = true;
  attckButtonEl.style.backgroundColor = "gray";
  setTimeout(() => {
    const endMessage =
      monster.health === 0 && wizard.health > 0
        ? "The Wizard Wins"
        : wizard.health === 0 && monster.health > 0
        ? "The monsters are Victorious"
        : "No victors - all creatures are dead";

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️";

    document.body.innerHTML = `<div class="end-game">
  <h2>Game Over</h2>
  <h3>${endMessage}</h3>
  <p class="end-emoji">${endEmoji}</p>
</div>`;
  }, 1500);
}

attckButtonEl.addEventListener("click", attack);

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();
