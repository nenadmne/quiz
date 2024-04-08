import { createContext } from "react";

const GameContext = createContext({
  players: [],
  addPlayers: (item) => {},
  removePlayer: (id) => {},
});

export default GameContext;
