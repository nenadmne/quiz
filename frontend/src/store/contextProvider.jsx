import { useReducer } from "react";
import GameContext from "./context";

const defaultGameState = {
  players: [],
};

const gameReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedPlayers = action.player;
    return {
      players: updatedPlayers,
    };
  }
  if (action.type === "REMOVE") {
    const updatedPlayers = state.players.filter(
      (player) => player.id !== action.id
    );
    return {
      players: updatedPlayers,
    };
  }
  if (action.type === "UPDATE") {
    const updatedPlayers = state.players.filter(
      (player) => player.id !== action.id
    );
    return {
      players: updatedPlayers,
    };
  }

  return defaultGameState;
};

const GameProvider = (props) => {
  const [gameState, dispatchGameAction] = useReducer(
    gameReducer,
    defaultGameState
  );

  const addPlayerHandler = (player) => {
    dispatchGameAction({ type: "ADD", player: player });
  };

  const removePlayerHandler = (id) => {
    dispatchGameAction({ type: "REMOVE", id: id });
  };

  const updatePlayerHandler = (player) => {
    dispatchGameAction({ type: "UPDATE", player: player });
  };

  const gameContext = {
    players: gameState.players,
    addPlayer: addPlayerHandler,
    removePlayer: removePlayerHandler,
    updatePlayer: updatePlayerHandler,
  };

  return (
    <GameContext.Provider value={gameContext}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
