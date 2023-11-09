import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Load from "./assets/Component/Load/Load";
import Result from "./assets/Component/Result/Result";
import Game from "./assets/Component/Game/Game";

function App() {
  return (
    <div className="h-screen w-full dark:bg-slate-900 bg-blue-400">
      <Router>
        <Routes>
          <Route path="/" element={<Load />} />
          <Route path="/game/:usr1/:usr2" element={<Game />} />
          <Route path="/result/:type/:usr" element={<Result />} />
          <Route path="*" element={<h1 >Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
