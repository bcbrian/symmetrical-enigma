function getScrambledEggs() {
  const getMessageEl = document.getElementById("get-message");

  const message = getMessageEl.value;
  const words = message.split(" ");
  console.log("before", words);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const letters = word.split("");
    const mixed = letters.sort(function() {
      const rand = Math.random();
      if (rand < 0.5) {
        return -1;
      }
      return 0;
    });
    words[i] = mixed.join("");
  }

  const scramble = words.join(" ");

  document.getElementById("output").innerText = scramble;
  const cypher = Cypher("any string you like");
  console.log(cypher.tool);
}

let cypher = {};
function setCypher() {
  const setCypherEl = document.getElementById("set-cypher");

  const message = setCypherEl.value;
  cypher = Cypher("");
  cypher = Cypher(message);
}

function getEncrypted() {
  const getMessageEl = document.getElementById("get-message");

  const message = getMessageEl.value.toUpperCase();

  document.getElementById("output").innerText = cypher.encryption(message);
}

function getDecrypted() {
  const getMessageEl = document.getElementById("get-message");

  const message = getMessageEl.value.toUpperCase();

  document.getElementById("output").innerText = cypher.decryption(message);
}

// http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html#more
// https://medium.com/@TimSeverien/substitution-cipher-in-javascript-d530eb2d923d

// function cypher
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase();
const letters = LETTERS.split("");
const mixes = LETTERS.split("");
function Cypher(secret) {
  // map of all letters
  // lets use seedrandom and random to
  Math.seedrandom(secret);
  mixes.sort(function() {
    const rand = Math.random();
    if (rand < 0.5) {
      return -1;
    }
    return 0;
  });

  // make a new shuffled array
  this.tool = {
    encryption: {},
    decryption: {}
  };
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const mix = mixes[i];

    this.tool.encryption[letter] = mix;
    this.tool.decryption[mix] = letter;
  }

  // for encryption and decryption
  // encryption method
  this.encryption = function(message) {
    const mLetters = message.split("");
    console.log(mLetters);

    for (let i = 0; i < mLetters.length; i++) {
      const mLetter = mLetters[i];
      if (this.tool.encryption[mLetter]) {
        mLetters[i] = this.tool.encryption[mLetter];
      }
    }
    console.log(mLetters);

    return mLetters.join("");
  };

  // decryption method
  this.decryption = function(message) {
    const mLetters = message.split("");

    for (let i = 0; i < mLetters.length; i++) {
      const mLetter = mLetters[i];
      if (this.tool.decryption[mLetter]) {
        mLetters[i] = this.tool.decryption[mLetter];
      }
    }

    return mLetters.join("");
  };

  return this;
}
