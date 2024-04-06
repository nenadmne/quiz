import image from "../assets/background.jpg";
import "./GameBackground.css";

export default function GameBackground() {
  return (
    <div className="game-background absolute">
      <img src={image} alt="background image" />
    </div>
  );
}
