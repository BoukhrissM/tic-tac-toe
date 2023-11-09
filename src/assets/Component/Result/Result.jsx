import React from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Result = () => {
  const navigate = useNavigate();
  const { type, usr } = useParams();
  return (
    <>
      {type === "win" ? <Confetti className="w-full h-screen" /> : ""}
      <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
        {type === "win" ? (
          <>
            <span className="text-center animate-bounce text-white">
              <span className="text-6xl">{usr}</span>
              <br></br>
              <span className="text-2xl">Win the game</span>
            </span>
          </>
        ) : (
          <span className="text-3xl text-white">Partie Null</span>
        )}
        <div className="w-full gap-x-2 flex justify-center items-center flex-wrap">
          <button
            type="button"
            className="transition-all bg-slate-600 hover:bg-slate-700 rounded-lg px-3 w-44 h-10 text-2xl text-white"
            onClick={()=>{history.back()}}
          >
            Restart
          </button>
          <button
            type="button"
            className="transition-all  bg-green-400 hover:bg-green-500 rounded-lg px-3 w-44 h-10 text-2xl text-white"
            onClick={()=>{
              
              navigate("/",{replace:true})}}
          >
            New
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
