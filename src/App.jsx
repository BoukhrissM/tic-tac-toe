import { useState, useRef } from "react";
import "./App.css";
function App() {
  const [user, setUser] = useState(1);
  const [user1Field, setUser1Field] = useState([]);
  const [user2Field, setUser2Field] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [Disabled, setDisabled] = useState(false);

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

  const checkWinner = (lst, usr) => {
    if (hasWinningCombination(lst))
      if (confirm(`user ${usr} win the game \n\n replay ?`))
        window.location.reload();
      else setDisabled(true);

    if (clicked.length === 9)
      if (confirm(`Null Part \n\n replay ?`)) window.location.reload();
      else setDisabled(true);
  };

  return (
    <div className="w-full h-screen bg-blue-400 flex justify-start items-center flex-col ">
      <h1 className="text-white text-6xl my-20">
        <span className="">Tic</span>-<span>Tac</span>-<span>Toe</span>
      </h1>
      <div className="w-[300px] h-[300px] bg-yellow-50 grid grid-cols-3 p-0 m-0 rounded-3xl overflow-hidden">
        {Array.from({ length: 9 }).map((v, i) => {
          var r = useRef();
          var cnt = (
            <div
              ref={r}
              aria-valuetext={i}
              key={i}
              className="border border-black w-[100px] h-[100px] flex justify-center items-center font-semibold text-6xl cursor-pointer"
              onClick={() => {
                if (!Disabled) {
                  if (
                    !clicked.includes(r.current.getAttribute("aria-valuetext"))
                  ) {
                    r.current.innerHTML = user === 1 ? "X" : "0";
                    if (user === 1) {
                      user1Field.push(r.current.getAttribute("aria-valuetext"));
                    } else {
                      user2Field.push(r.current.getAttribute("aria-valuetext"));
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
  );
}

export default App;
