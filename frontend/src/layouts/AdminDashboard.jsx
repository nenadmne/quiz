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
      const games = response.data;
      setGames(games.matches);
    } catch (error) {
      console.error("Error:", error);
      throw new Error(error.response.data.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchGames();
  }, [games]);

  return (
    <section className="flex flex-col w-full sm:w-[425px] md:w-[600px] lg:w-[1024px] xl:w-[1100px] gap-8 md:gap-16 bg-white rounded-[1rem] p-4 sm:p-8 max-h-[600px] md:max-h-[450px] overflow-y-scroll">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center w-[full]">
        <div className="w-full md:w-[425px] h-[100px] sm:h-[120px] md:h-[175px]">
          <ActiveUsersPieChart />
        </div>
        <UsersTable />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {games && (
          <div className="w-full md:w-[425px] h-[100px] sm:h-[120px] md:h-[175px]">
            <GamesPieChart games={games} />
          </div>
        )}
        <GamesTable games={games} />
      </div>
    </section>
  );
}
