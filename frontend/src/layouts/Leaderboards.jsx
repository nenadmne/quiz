import { useEffect, useState } from "react";

import Loading from "../components/Loading";
import Heading from "../components/Leaderboard/Heading";
import PlayerList from "../components/Leaderboard/PlayerList";

export default function Leaderboards() {
  const [data, setData] = useState(null);
  const [sortedData, setSortedData] = useState(null);

  const leaderboardsLoader = async () => {
    try {
      const response = await fetch("https://quiz-wy28.onrender.com/leaderboards");

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
        setSortedData(sortedData);
      }, 300);
    }
  }, [data]);

  return sortedData !== null ? (
    <section className="flex w-full h-full p-8 items-start justify-center text-white bg-blackGrad">
      <div className="w-fit rounded-xl p-6 flex flex-col items-center justify-center gap-8">
        <Heading />
        <PlayerList data={sortedData} />
      </div>
    </section>
  ) : (
    <Loading className=" w-full h-full flex flex-col gap-4 justify-center items-center bg-blackGrad" />
  );
}
