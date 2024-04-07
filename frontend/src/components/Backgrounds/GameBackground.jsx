import image from "../../assets/background.jpg";
import "./GameBackground.css";

export default function GameBackground() {
  return (
    <div className="w-full h-full bg-blackGrad absolute">
      <img src={image} alt="background image" />
    </div>
  );
}
