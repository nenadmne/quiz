import { createContext } from "react";

const GameContext = createContext({
  players: [],
  answers: [],
  room: {},
  addPlayers: (item) => {},
  removePlayer: (id) => {},
  addAnswers: (item) => {},
  addRoom: (item) => {},
});

export default GameContext;
