import { EmojiEvents } from "@mui/icons-material";

export default function PlayerList({ data }) {
  return (
    <ul className="text-2xl flex flex-col justify-center items-center gap-4 w-[350px]">
      {data.map((item, index) => (
        <li
          key={item._id}
          className="w-full flex flex-row justify-between items-center"
        >
          <div className="flex flex-row gap-4 items-center justify-center uppercase italic">
            <span>{`${index + 1}.`}</span>
            <span>{item.username}</span>
            {index === 0 && (
              <EmojiEvents style={{ color: "gold", fontSize: "1.75rem" }} />
            )}
            {index === 1 && (
              <EmojiEvents style={{ color: "silver", fontSize: "1.75rem" }} />
            )}
            {index === 2 && (
              <EmojiEvents style={{ color: "#D2691E", fontSize: "1.75rem" }} />
            )}
          </div>
          <span className="font-bold">{item.totalPoints || 0}</span>
        </li>
      ))}
    </ul>
  );
}
