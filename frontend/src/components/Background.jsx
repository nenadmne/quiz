import "./Background.css";

export default function Background({ play }) {
  return (
    <div className="background">
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
