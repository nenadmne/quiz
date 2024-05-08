import { useReducer } from "react";
import GameContext from "./context";

const defaultGameState = {
  players: [],
  answers: [],
  room: {},
};

const gameReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedPlayers = action.player;
    return {
      players: updatedPlayers,
      answers: state.answers,
      room: state.room
    };
  }
  if (action.type === "REMOVE") {
    const updatedPlayers = state.players.filter(
      (player) => player.id !== action.id
    );
    return {
      players: updatedPlayers,
      answers: state.answers,
      room: state.room
    };
  }
  if (action.type === "ADD_ANSWERS") {
    const updatedAnswers = action.answers;
    return {
      players: state.players,
      answers: updatedAnswers,
      room: state.room
    };
  }
  if (action.type === "ADD_ROOM") {
    const updatedRoom = action.room;
    return {
      players: state.players,
      answers: state.answers,
      room: updatedRoom
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

  const addRoomHandler = (room) => {
    dispatchGameAction({ type: "ADD_ROOM", room: room });
  };

  const gameContext = {
    answers: gameState.answers,
    players: gameState.players,
    room: gameState.room,
    addPlayer: addPlayerHandler,
    removePlayer: removePlayerHandler,
    addAnswers: addAnswersHandler,
    addRoom: addRoomHandler,
  };

  return (
    <GameContext.Provider value={gameContext}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
