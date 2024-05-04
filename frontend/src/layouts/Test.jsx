import Logo from "../assets/logo.png";
import { Button } from "@mui/material";

export default function Test() {
  return (
    <div className="w-full h-full flex bg-blackGrad pt-8 justify-center">
      <div className="h-fit flex flex-col bg-greyGrad pb-6 px-8 rounded justify-center items-center shadow-black shadow-md">
        <img
          src={Logo}
          alt="logo image"
          className="w-[10rem] bg-darkBlue rounded-xl"
        />
        <div className="w-full flex items-center justify-center py-2 gap-2 bg-blackGrad shadow-[black] shadow-md text-white text-[2rem] text-shadow tracking-[1px] ">
          Draw!
        </div>
        <div className="w-fit h-fit flex flex-row gap-4 py-8 rounded justify-between items-center text-shadow">
          <div className="w-[200px] flex flex-col p-4 bg-darkPurple rounded text-white text-center shadow-md shadow-black">
            <p className="text-[1.5rem]">player 1</p>
            <strong className="text-[4rem]">5</strong>
          </div>
          <div className="w-[200px] flex flex-col p-4 bg-darkPurple rounded text-white text-center shadow-md shadow-black">
            <p className="text-[1.5rem]">player 2</p>
            <strong className="text-[4rem]">4</strong>
          </div>
        </div>
        <Button
          variant="contained"
          sx={{
            color: "white",
            fontSize: "1rem",
            textTransform: "none",
          }}
          className="bg-blackGrad hover:opacity-50 text-shadow tracking-[1px]"
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  );
}
