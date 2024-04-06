import "./LobbyBackground.css";

export default function LobbyBackground() {
  const total = 360 * 3;
  const particles = [];

  for (let i = total; i > 0; i--) {
    particles.push(
      <div
        key={total - i}
        className="particle"
        style={{ "--index": total - i }}
      />
    );
  }

  return (
    <div className="center bg-blackGrad" style={{ "--total": total }}>
      {particles}
    </div>
  );
}
