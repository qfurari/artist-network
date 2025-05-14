import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Callback from "./Callback";
import Search from "./Search"; // ← これを忘れてると表示できない！

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/search" element={<Search />} /> {/* ← これが大事！ */}
      </Routes>
    </Router>
  );
};

export default App;
