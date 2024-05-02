import { useEffect, useState } from "react";

import Loading from "../components/Loading";
import Heading from "../components/Leaderboard/Heading";
import PlayerList from "../components/Leaderboard/PlayerList";

export default function Leaderboards() {
  const [data, setData] = useState(null);

  const leaderboardsLoader = async () => {
    try {
      const response = await fetch("http://localhost:4000/leaderboards");

      if (!response.ok) {
        throw new Error("Failed to add question");
      }
      const leaderboardData = await response.json();
      setData(leaderboardData.filteredUsers);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred");
    }
  };

  useEffect(() => {
    leaderboardsLoader();
    if (data) {
      const sortedData = data.sort((a, b) => b.totalPoints - a.totalPoints);
      setTimeout(() => {
        setData(sortedData);
      }, 300);
    }
  }, [data]);

  return data !== null ? (
    <section className="flex w-full h-full p-8 items-start justify-center text-white bg-greyGrad">
      <div className="w-[500px] max-h-[800px] overflow-y-scroll bg-darkPurple rounded-xl p-6 flex flex-col items-center justify-center gap-8">
        <Heading />
        <PlayerList data={data} />
      </div>
    </section>
  ) : (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4 bg-blackGrad">
      <Loading />
    </div>
  );
}
