import { useEffect, useState } from "react";

import ActiveUsersPieChart from "../components/AdminDashboard/ActiveUsersPieChart";
import UsersTable from "../components/AdminDashboard/UsersTable";
import GamesPieChart from "../components/AdminDashboard/GamesPieChart";
import GamesTable from "../components/AdminDashboard/GamesTable";
import quizApi from "../api/api";

export default function AdminDashboard() {
  const [games, setGames] = useState(null);

  // Fetching games from database
  const fetchGames = async () => {
    try {
      const response = await quizApi.get("/matchHistory");
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch users!");
      }
      const games = response.data;
      setGames(games.matches);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred");
    }
  };

  useEffect(() => {
    fetchGames();
  }, [games]);

  return (
    <section className="flex flex-col gap-16 bg-white rounded-[1rem] p-8 max-h-[450px] overflow-y-scroll">
      <div className="flex flex-row gap-16 items-center justify-center">
        <ActiveUsersPieChart />
        <UsersTable />
      </div>
      <div className="flex flex-row items-center justify-center gap-16">
        {games && <GamesPieChart games={games} />}
        <GamesTable games={games} />
      </div>
    </section>
  );
}
