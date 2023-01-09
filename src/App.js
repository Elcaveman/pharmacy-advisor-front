
import './App.css';
import SideBar from './pages/SideBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeVille from './Pharmacie/HomeVille';
import EditVille from './Pharmacie/EditVille';
import HomeZone from './Pharmacie/HomeZone';
import EditZone from './Pharmacie/EditZone';
import HomePharmacie from './Pharmacie/HomePharmacie';
import MyMap from './Pharmacie/MyMap';
import Chart from './Pharmacie/Chart';
import AddGarde from './Pharmacie/AddGarde';
import ListPharmacieGarde from './Pharmacie/ListPharmacieGarde';
import Historique from './Pharmacie/Historique';
import MapFiltre from './Pharmacie/MapFiltre';
import HomeGarde from './Pharmacie/HomeGarde';
import EditGarde from './Pharmacie/EditGarde';
import AddPharmacie from './Pharmacie/AddPharmacie';
import Home from './Pharmacie/Home';



function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="" element={<Home />} />
        {/* login route */}
        <Route exact path="/ville" element={<HomeVille />} />
        <Route exact path="/ville/:id" element={< EditVille />} />

        <Route exact path="/zone" element={<HomeZone />} />
        <Route exact path="/zone/:id" element={< EditZone />} />

        <Route exact path="/garde" element={<HomeGarde />} />
        <Route exact path="/garde/:id" element={< EditGarde />} />
        <Route exact path='/addGarde' element={<AddGarde />} />

        <Route exact path="/pharmacie" element={<HomePharmacie />} />
        <Route exact path="/pharmacie/add" element={<AddPharmacie />} />
        <Route exact path='/listPharmacieGarde' element={<ListPharmacieGarde />} />
        
        <Route exact path="/map/:id" element={<MyMap />} />
        <Route exact path="/chart" element={<Chart />} />
        <Route exact path='/historique/:id' element={<Historique />} />
        <Route exact path='/map' element={<MapFiltre />} />
      </Routes>
    </Router>


  );
}

export default App;
