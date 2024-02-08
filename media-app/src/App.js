import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Landingpage from './Pages/Landingpage';
import Home from './Pages/Home';
import Watchhistory from './Pages/Watchhistory';

function App() {
  return (
    <div className="App">
      <Header/>
     <Routes>
      <Route path='/' element={<Landingpage/>}/>
           <Route path='/home' element={<Home/>}/>
                <Route path='/watch-history' element={<Watchhistory/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
