import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  { to: "/administrator", text: "HOME" },
  { to: "/administrator/addQuestion", text: "ADD QUESTION" },
  { to: "/administrator/recievedQuestions", text: "RECIEVED QUESTIONS" },
];

export default function AdminNavigation() {
  const background =
    "linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%)";

  return (
    <>
      <div className="flex flex-row gap-2 mt-8">
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
            end
          >
            {tab.text}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
}