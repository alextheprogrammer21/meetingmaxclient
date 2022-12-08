var deck = [];

fetch("https://meetingmaxserver.onrender.com/deck")
  .then((response) => response.json())
  .then((data) => (deck = data.deck))
  .catch(() => {
    deck = [
      "A♥",
      "2♥",
      "3♥",
      "4♥",
      "5♥",
      "6♥",
      "7♥",
      "8♥",
      "9♥",
      "10♥",
      "J♥",
      "Q♥",
      "K♥",
      "A♠",
      "2♠",
      "3♠",
      "4♠",
      "5♠",
      "6♠",
      "7♠",
      "8♠",
      "9♠",
      "10♠",
      "J♠",
      "Q♠",
      "K♠",
      "A♦",
      "2♦",
      "3♦",
      "4♦",
      "5♦",
      "6♦",
      "7♦",
      "8♦",
      "9♦",
      "10♦",
      "J♦",
      "Q♦",
      "K♦",
      "A♣",
      "2♣",
      "3♣",
      "4♣",
      "5♣",
      "6♣",
      "7♣",
      "8♣",
      "9♣",
      "10♣",
      "J♣",
      "Q♣",
      "K♣",
    ];
  });

const unicodeMap = {
  "A♥": "&#127153;",
  "2♥": "&#127154;  ",
  "3♥": "&#127155;  ",
  "4♥": "&#127156;  ",
  "5♥": "&#127157;  ",
  "6♥": "&#127158;  ",
  "7♥": "&#127159;  ",
  "8♥": "&#127160;  ",
  "9♥": "&#127161;  ",
  "10♥": "&#127162;  ",
  "J♥": "&#127163;  ",
  "Q♥": "&#127165;  ",
  "K♥": "&#127166;  ",
  "A♠": "&#127137;  ",
  "2♠": "&#127138;  ",
  "3♠": "&#127139;  ",
  "4♠": "&#127140;  ",
  "5♠": "&#127141;  ",
  "6♠": "&#127142;  ",
  "7♠": "&#127143;  ",
  "8♠": "&#127144;  ",
  "9♠": "&#127145;  ",
  "10♠": "&#127146;  ",
  "J♠": "&#127147;  ",
  "Q♠": "&#127149;  ",
  "K♠": "&#127150;  ",
  "A♦": "&#127169;  ",
  "2♦": "&#127170;",
  "3♦": "&#127171;",
  "4♦": "&#127172;",
  "5♦": "&#127173;",
  "6♦": "&#127174;",
  "7♦": "&#127175;",
  "8♦": "&#127176;",
  "9♦": "&#127177;",
  "10♦": "&#127178;",
  "J♦": "&#127179;",
  "Q♦": "&#127181;",
  "K♦": "&#127182;",
  "A♣": "&#127185;  ",
  "2♣": "&#127186;  ",
  "3♣": "&#127187;  ",
  "4♣": "&#127188;  ",
  "5♣": "&#127189;  ",
  "6♣": "&#127190;  ",
  "7♣": "&#127191;  ",
  "8♣": "&#127192;  ",
  "9♣": "&#127193;  ",
  "10♣": "&#127194;  ",
  "J♣": "&#127195;  ",
  "Q♣": "&#127197;  ",
  "K♣": "&#127198;  ",
};

const draw = function () {
  document.getElementsByClassName("full-house")[0].classList.add("hide");
  const drawnCards = [];
  for (let i = 0; i < 7; i++) {
    const x = Math.floor(Math.random() * 52);
    let card = deck[x];
    //Checks for duplicate cards
    if (drawnCards.includes(card)) {
      i--;
      continue;
    }

    drawnCards.push(card);
  }
  appendDrawnCards(drawnCards);
  if (containsFullHouse(drawnCards)) {
    document.getElementsByClassName("full-house")[0].classList.remove("hide");
    alert("You drew a full house!");
  }
};

const appendDrawnCards = function (drawnCards = []) {
  const container = document.getElementById("visible-cards");
  //Empties all previously displayed cards
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  //Appends your new cards to the dom
  for (let i = 0; i < drawnCards.length; i++) {
    const node = document.createElement("li");
    node.innerHTML = unicodeMap[drawnCards[i]];
    node.className = drawnCards[i];
    container.appendChild(node);
  }
};

const containsFullHouse = function (drawnCards = []) {
  const counter = {};
  const highlightCards = [];

  for (let i = 0; i < drawnCards.length; i++) {
    let card = drawnCards[i].slice(0, -1);

    if (counter[card]) {
      counter[card].push(drawnCards[i]);
    } else {
      counter[card] = [drawnCards[i]];
    }
  }

  let threeOfAKind = false;
  let twoPair = false;
  /*Checks if there is three of one rank and two of the other. Excludes if there is
  a four of a kind or if there is two three of a kinds*/
  for (const key in counter) {
    if (counter[key].length === 3) {
      threeOfAKind = true;
      highlightCards.push(...counter[key]);
    }
    if (counter[key].length === 2) {
      twoPair = true;
      highlightCards.push(...counter[key]);
    }
  }

  if (threeOfAKind && twoPair) {
    highlight(highlightCards);
    return true;
  } else {
    return false;
  }
};

const highlight = function (hightlightCards = []) {
  for (let i = 0; i < hightlightCards.length; i++) {
    const selector = hightlightCards[i];
    document.getElementsByClassName(selector)[0].style.fontSize = "1.5em";
  }
};
