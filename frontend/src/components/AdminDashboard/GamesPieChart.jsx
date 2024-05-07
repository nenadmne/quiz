import { PieChart } from "@mui/x-charts/PieChart";

export default function GamesPieChart({ games }) {
  const drawGames =
    games && games.filter((item) => item.result === "Draw").length;
  const totalGames = games && games.length;

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 1, value: totalGames, label: `Games: ${totalGames}` },
            {
              id: 2,
              value: drawGames,
              label: `Draws: ${drawGames}`,
            },
            {
              id: 3,
              value: totalGames - drawGames,
              label: `Victories: ${totalGames - drawGames}`,
            },
          ],
        },
      ]}
    />
  );
}
