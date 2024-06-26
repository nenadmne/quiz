import Logo from "../../assets/logo.png";
import "./Background.css";

export default function Background({ play }) {
  return (
    <div className="background">
      <img
        src={Logo}
        alt="logo image"
        className="absolute w-[10rem] sm:w-[12rem] 2xl:w-[15rem] top-[1rem] sm:top-[-2.25rem] md:top-[-2.5rem] 2xl:top-[-3rem] z-10"
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
