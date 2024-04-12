import { useReducer } from "react";
import GameContext from "./context";

const defaultGameState = {
  players: [],
  answers: [],
};

const gameReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedPlayers = action.player;
    return {
      players: updatedPlayers,
      answers: state.answers,
    };
  }
  if (action.type === "REMOVE") {
    const updatedPlayers = state.players.filter(
      (player) => player.id !== action.id
    );
    return {
      players: updatedPlayers,
      answers: state.answers,
    };
  }
  if (action.type === "ADD_ANSWERS") {
    const updatedAnswers = action.answers;
    return {
      players: state.players,
      answers: updatedAnswers,
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

  const addAnswersHandler = (answers) => {
    dispatchGameAction({ type: "ADD_ANSWERS", answers: answers });
  };

  const gameContext = {
    answers: gameState.answers,
    players: gameState.players,
    addPlayer: addPlayerHandler,
    removePlayer: removePlayerHandler,
    addAnswers: addAnswersHandler,
  };

  return (
    <GameContext.Provider value={gameContext}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
