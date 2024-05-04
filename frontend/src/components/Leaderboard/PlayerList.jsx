import { EmojiEvents } from "@mui/icons-material";

export default function PlayerList({ data }) {
  return (
    <ul className="text-2xl flex flex-col justify-center items-center gap-2 w-[800px]">
      {data.map((item, index) => (
        <li
          key={item._id}
          className="w-full flex flex-row justify-between items-center bg-blue bg-lineGrad py-2 px-12 rounded text-shadow"
        >
          <div className="flex flex-row gap-4 items-center justify-center uppercase italic">
            <span>{`${index + 1}.`}</span>
            <strong className="tracking-[2px]">{item.username}</strong>
            {index === 0 && (
              <EmojiEvents
                style={{
                  color: "gold",
                  fontSize: "2rem",
                  filter:
                    "drop-shadow(rgba(0, 0, 0, 0.533333) 0.1em 0.1em 0.1em)",
                }}
              />
            )}
            {index === 1 && (
              <EmojiEvents
                style={{
                  color: "silver",
                  fontSize: "2rem",
                  filter:
                    "drop-shadow(rgba(0, 0, 0, 0.533333) 0.1em 0.1em 0.1em)",
                }}
              />
            )}
            {index === 2 && (
              <EmojiEvents
                style={{
                  color: "#D2691E",
                  fontSize: "2rem",
                  filter:
                    "drop-shadow(rgba(0, 0, 0, 0.533333) 0.1em 0.1em 0.1em)",
                }}
              />
            )}
          </div>
          <span className="font-bold">{item.totalPoints || 0}</span>
        </li>
      ))}
    </ul>
  );
}
