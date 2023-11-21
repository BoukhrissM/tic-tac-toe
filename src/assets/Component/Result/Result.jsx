import React from "react";
import { InView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
const Result = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <InView>
        <div className="w-full h-[300px] flex flex-col justify-center items-center gap-5 dark:bg-slate-900">
          {props.win ? (
            <>
              <span className="text-center  text-black dark:text-white ">
                <span className="text-6xl animate__animated animate__fadeInUp animate__slower">
                  {props.winner}
                </span>
                <br/>
                <span className="text-2xl">Win the game</span>
              </span>
            </>
          ) : (
            <span className="text-3xl text-dark dark:text-white ">
              Null Part
            </span>
          )}
          <div className="w-full gap-x-2 flex justify-center items-center flex-wrap"></div>
        </div>
      </InView>
    </>
  );
};

export default Result;
