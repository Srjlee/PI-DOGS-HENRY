import { Route, Routes } from "react-router-dom";
import "./build/css/App.css";
import Nav from "./components/Nav";
import Dogs from "./components/Dogs";
import Landing from "./components/Landing";
import DogDetail from "./components/DogDetail";
import DogCreate from "./components/DogCreate";
import Mensaje from "./components/Mensaje";
import FormCreate from "./components/FormCreate";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/:id" element={<DogDetail />} />
        <Route path="/dog" element={<DogCreate />} />
        <Route path="/msj" element={<Mensaje />} />
        <Route path="/formCreate" element={<FormCreate />} />
      </Routes>
    </div>
  );
}

export default App;
