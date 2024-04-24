import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Leaderboards() {
  const [data, setData] = useState(null);
  const loaderData = useLoaderData();

  useEffect(() => {
    setData(loaderData);
  }, []);

  console.log(data)

  return (
    <div className="flex flex-col justify-center items-center w-full h-full transform translate-y-[-20%]">
      <h1>Leaderboard</h1>
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
