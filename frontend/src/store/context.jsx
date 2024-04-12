import { createContext } from "react";

const GameContext = createContext({
  players: [],
  answers: [],
  addPlayers: (item) => {},
  removePlayer: (id) => {},
  addAnswers: (item) => {},
});

export default GameContext;
