import { Input } from "antd";
import React, { useState } from "react";

import "./Load.css";
import { useNavigate } from "react-router-dom";
const Load = () => {
  const navigate = useNavigate();
  const [user1, setuser1] = useState();
  const [user2, setuser2] = useState();
  const HandleClick = () => {
    if (user1 != null && user2 != null && user1 != "" && user2 != "")
      navigate(`/game/${user1}/${user2}`,{replace:true});
    else alert("Field Required !");
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-2">
      <h1 className="text-white text-6xl py-5 ">Tic-Tac-Toe</h1>
      <form className="w-full md:w-[50%] lg:w-[30%] flex flex-col justify-center items-center gap-3 bg-white p-2 rounded-lg py-5 dark:bg-slate-950 ">
        <Input
          addonBefore={
            <span className="text-black dark:text-white [.has(&)]:bg-green-800">
              user 1
            </span>
          }
          size="large"
          className="form-inpt"
          classNames={{ input: "dark:bg-slate-800 dark:border-gray-500" }}
          onChange={(e) => setuser1(e.target.value)}
        />
        <Input
          addonBefore={
            <span className="text-black dark:text-white dark:border-gray-500">
              user 2
            </span>
          }
          className="form-inpt"
          classNames={{ input: "dark:bg-slate-800 dark:border-gray-500" }}
          size="large"
          onChange={(e) => setuser2(e.target.value)}
        />
        <button
          type="button"
          className="w-full border-none rounded-lg h-10 bg-green-600 hover:bg-green-700 transition-all  text-white"
          onClick={HandleClick}
        >
          Begin
        </button>
      </form>
    </div>
  );
};

export default Load;
