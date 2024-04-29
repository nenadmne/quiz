import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  { to: "/administrator/addQuestion", text: "ADD QUESTION" },
  { to: "/administrator/recievedQuestions", text: "RECIEVED QUESTIONS" },
];

export default function Admin() {
  const background =
    "linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%)";

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 bg-blueGrad p-8">
      <div className="flex flex-row">
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.to}
            className={`px-6 py-2 rounded-xl hover:bg-darkPurple cursor-pointer text-white $`}
            style={({ isActive }) => {
              return isActive
                ? { background: background, border: "1px solid white" }
                : {};
            }}
          >
            {tab.text}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </section>
  );
}
