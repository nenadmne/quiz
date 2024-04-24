import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";

export default function Leaderboards() {
  const [data, setData] = useState(null);
  const loaderData = useLoaderData();

  useEffect(() => {
    setTimeout(() => {
      setData(loaderData);
    }, 300);
  }, []);

  return data !== null ? (
    <div className="flex flex-col w-full h-full items-center p-8">
      <>
        <h1 className="text-[1.25rem] font-bold uppercase">Leaderboards</h1>
        <div className="flex flex-row justify-center items-center">
          <div>
            <ul>
              {data.map((item) => (
                <li key={item.id}>{item.username}</li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {data.map((item) => (
                <li key={item.id}>{item.username}</li>
              ))}
            </ul>
          </div>
        </div>
      </>
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
