import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AddBook from "./pages/AddBook";
import DeleteBook from "./pages/DeleteBook";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/delete" element={<DeleteBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
