import { PieChart } from "@mui/x-charts/PieChart";

export default function AdminHome() {
  return (
    <section className="bg-white rounded-[1rem] p-8">
      <div className="flex items-center justify-center">
        <PieChart
          series={[
            {
              data: [
                { id: 1, value: 40, label: "Players Online" },
                { id: 2, value: 12, label: "Active Games " },
              ],
            },
          ]}
          width={425}
          height={175}
        />
      </div>
    </section>
  );
}
