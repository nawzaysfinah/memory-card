import React, { useState, useEffect } from "react";
import logo from "./pokemon_logo.png";

import "./MemoryCardGame.css";

function MemoryCardGame() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [streak, setStreak] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  const generateCards = () => {
    const newCards = [];
    for (let i = 1; i <= 12; i++) {
      newCards.push({ id: i, isClicked: false });
    }
    setCards(shuffleArray(newCards));
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleClick = (cardId) => {
    if (selectedCards.includes(cardId)) {
      resetGame();
    } else {
      const updatedSelectedCards = [...selectedCards, cardId];
      setSelectedCards(updatedSelectedCards);
      setStreak(updatedSelectedCards.length);
      if (updatedSelectedCards.length === 12) {
        if (updatedSelectedCards.length > highestScore) {
          setHighestScore(updatedSelectedCards.length);
        }
        resetGame();
      } else {
        setCards(shuffleArray(cards));
      }
    }
  };

  const resetGame = () => {
    setSelectedCards([]);
    setStreak(0);
    generateCards();
  };

  useEffect(() => {
    generateCards();
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    if (streak > highestScore) {
      setHighestScore(streak);
    }
  }, [streak, highestScore]);

  return (
    <div className="main">
      <img src={logo} alt="pokemon_logo" className="logo" width={200} />
      <h1>Memory Card Game</h1>
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${
              selectedCards.includes(card.id) ? "selected" : ""
            }`}
            onClick={() => handleClick(card.id)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${card.id}.png`}
              alt={`Pokemon ${card.id}`}
            />
          </div>
        ))}
      </div>
      <div className="info">
        <p>Streak: {streak}</p>
        <p>Highest Score: {highestScore}</p>
      </div>
    </div>
  );
}

export default MemoryCardGame;
