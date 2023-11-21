import { Modal } from "antd";
import { useState, useRef, lazy, Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InView } from "react-intersection-observer";
import Confetti from "react-confetti";
import $ from "jquery";

const Game = () => {
  const navigate = useNavigate();

  let { usr1, usr2 } = useParams();
  const [user, setUser] = useState(1);

  const [user1Field, setUser1Field] = useState([]);
  const [user2Field, setUser2Field] = useState([]);
  const [clicked, setClicked] = useState([]);

  const [Disabled, setDisabled] = useState(false);
  const [isResultShown, setResultShow] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const [winner, setWinner] = useState("");

  const [usr1Score, setUsr1Score] = useState(0);
  const [usr2Score, setUsr2Score] = useState(0);

  const Result = lazy(() => import("./../Result/Result"));

  function hasWinningCombination(lst) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical
      [0, 4, 8],
      [2, 4, 6], // Diagonal
    ];
    let val = false;
    winningCombinations.forEach((com) => {
      const [a, b, c] = com;
      if (lst.includes(a + "") && lst.includes(b + "") && lst.includes(c + ""))
        val = true;
    });

    return val;
  }

  const HandleRestart = () => {
    setUsr1Score(winner === 1 && isWin ? usr1Score + 1 : usr1Score);
    setUsr2Score(winner === 2 && isWin ? usr2Score + 1 : usr2Score);
    console.log(winner, usr1Score);
    $(".game-fields").each((i, e) => {
      e.innerHTML = "";
    });
    setWinner("");
    setUser(1);

    setIsWin(false);
    setDisabled(false);
    setResultShow(false);

    setUser1Field([]);
    setUser2Field([]);
    setClicked([]);
  };
  const checkWinner = (lst, usr) => {
    if (hasWinningCombination(lst)) {
      //If Win ==> Stock Winner in Winner Variable and  Open the modal
      setIsWin(true);
      setWinner(usr);
      setResultShow(true);
    }

    if (clicked.length === 9 && !hasWinningCombination(lst)) {
      //If Null Part ==> Show The Modal with  NULL PARTs
      setIsWin(false);
      setResultShow(true);
    }
  };

  return (
    <>
      <div className="w-full h-screen  flex justify-start items-center flex-col ">
        {isWin ? <Confetti className="w-full h-full z-[999]" /> : null}
        <h1 className="text-white text-6xl mt-20">
          <span>Tic</span>-<span>Tac</span>-<span>Toe</span>
        </h1>
        <span className="text-white my-10 flex justify-center items-center gap-1 font-extrabold text-xl transition-all ">
          <span
            className={`${
              user === 1 && !Disabled ? "animate-bounce" : ""
            } text-center`}
          >
            {usr1}
            <br />
            {usr1Score}
          </span>
          <span className="font-extrabold text-6xl">VS</span>
          <span
            className={`${
              user === 2 && !Disabled ? "animate-bounce" : ""
            } text-center`}
          >
            {usr2}
            <br />
            {usr2Score}
            <br />
          </span>
        </span>
        <div className="w-[300px] h-[300px] bg-yellow-50 grid grid-cols-3 p-0 m-0 rounded-3xl overflow-hidden">
          {Array.from({ length: 9 }).map((v, i) => {
            var r = useRef();
            var cnt = (
              <div
                ref={r}
                aria-valuetext={i}
                key={i}
                className="border border-black w-[100px] h-[100px] flex justify-center items-center font-semibold text-6xl cursor-pointer game-fields"
                onClick={() => {
                  if (!Disabled) {
                    if (
                      !clicked.includes(
                        r.current.getAttribute("aria-valuetext")
                      )
                    ) {
                      r.current.innerHTML = user === 1 ? "X" : "0";
                      if (user === 1) {
                        user1Field.push(
                          r.current.getAttribute("aria-valuetext")
                        );
                      } else {
                        user2Field.push(
                          r.current.getAttribute("aria-valuetext")
                        );
                      }

                      clicked.push(r.current.getAttribute("aria-valuetext"));

                      checkWinner(
                        user === 1 ? user1Field : user2Field,
                        user === 1 ? 1 : 2
                      );
                      setUser(user === 1 ? 2 : 1);
                    }
                  }
                }}
              ></div>
            );
            return cnt;
          })}
        </div>
      </div>
      <InView>
        <Modal
          closeIcon={false}
          keyboard
          open={isResultShown}
          onCancel={HandleRestart}
          onOk={() => {
            navigate("/", { replace: true });
          }}
          className="sm:w-[100%] md:w-[50%] h-20 result-modal"
          okText={"New"}
          cancelText={"Restart"}
          destroyOnClose
          style={{ backgroundImage: "red" }}
          okButtonProps={{
            style: {
              backgroundColor: "#C5E898",
              color: "white",
              fontWeight: "bolder",
            },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "#ED9ED6",
              color: "white",
              fontWeight: "bolder",
            },
          }}
        >
          {isResultShown ? (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Result win={isWin} winner={winner === 1 ? usr1 : usr2} />
            </Suspense>
          ) : null}
        </Modal>
      </InView>
    </>
  );
};

export default Game;
