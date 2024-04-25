import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";

import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { EmojiEvents } from "@mui/icons-material";

export default function Leaderboards() {
  const [data, setData] = useState(null);
  const loaderData = useLoaderData();

  useEffect(() => {
    if (loaderData) {
      const sortedData = loaderData.sort(
        (a, b) => b.totalPoints - a.totalPoints
      );
      setTimeout(() => {
        setData(sortedData);
      }, 300);
    }
  }, [loaderData]);

  return data !== null ? (
    <div className="flex w-full h-full p-8 items-start justify-center text-white bg-greyGrad">
      <div className="w-[500px] max-h-[800px] overflow-y-scroll bg-darkPurple rounded-xl p-6 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-row gap-2 justify-center items-center">
          <MilitaryTechIcon style={{ fontSize: "2.5rem" }} />
          <h1 className="text-[2rem] font-bold uppercase">Leaderboard</h1>
          <MilitaryTechIcon style={{ fontSize: "2.5rem" }} />
        </div>
        <ul className="text-2xl flex flex-col justify-center items-center gap-4 w-[350px]">
          {data.map((item, index) => (
            <li
              key={item._id}
              className="w-full flex flex-row justify-between items-center"
            >
              <div className="flex flex-row gap-4 items-center justify-center uppercase italic">
                {index === 0 && (
                  <EmojiEvents style={{ color: "gold", fontSize: "1.75rem" }} />
                )}
                {index === 1 && (
                  <EmojiEvents
                    style={{ color: "silver", fontSize: "1.75rem" }}
                  />
                )}
                {index === 2 && (
                  <EmojiEvents
                    style={{ color: "brown", fontSize: "1.75rem" }}
                  />
                )}
                <span>{`${index + 1}.`}</span>
                <span>{item.username}</span>
              </div>
              <span className="font-bold">{item.totalPoints}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4 bg-black opacity-60">
      <Loading />
    </div>
  );
}

export const leaderboardsLoader = async () => {
  try {
    const response = await fetch("http://localhost:4000/leaderboards");

    if (!response.ok) {
      throw new Error("Failed to add question");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
};
