import Logo from "../../assets/logo.png";
import "./Background.css";

export default function Background({ play }) {
  return (
    <div className="background">
      <img
        src={Logo}
        alt="logo image"
        className="absolute w-[15rem] top-[-3rem] z-10"
      />
      <div className="content">
        <div className="tunnel">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>

        <div className={play ? "door hovered" : "door"}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
