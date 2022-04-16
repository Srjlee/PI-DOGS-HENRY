import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Dogs from './components/Dogs';
import Landing from './components/Landing';


function App() {

  


  

  return (
    <div className="App">
          <Nav/>
      <Routes>
        <Route path="/" element={<Landing/>}/>        
        <Route path='/dogs' element={<Dogs  />}/>
      </Routes>
    </div>
  );
}

export default App;
