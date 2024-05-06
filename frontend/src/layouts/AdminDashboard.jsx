import { useEffect, useState } from "react";

import ActiveUsersPieChart from "../components/AdminDashboard/ActiveUsersPieChart";
import UsersTable from "../components/AdminDashboard/UsersTable";
import GamesPieChart from "../components/AdminDashboard/GamesPieChart";
import GamesTable from "../components/AdminDashboard/GamesTable";

export default function AdminDashboard() {
  const [games, setGames] = useState(null);

  const fetchGames = async () => {
    try {
      const response = await fetch("https://quiz-wy28.onrender.com/matchHistory");
      if (!response.ok) {
        throw new Error("Failed to fetch users!");
      }
      const games = await response.json();
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
