

import {Route,  Routes } from 'react-router-dom'

import Header from './components/header/index.jsx'
import Texkarta from './texkarta/index.jsx'
import Texkarta2 from './texkarta/kyxTex.jsx'
import TechCard from './texkarta/TechCard.jsx'

function App() {
  return (
 <div className="div">
  <Header/>
  <Routes>

  
    


 <Route path="/TechCard" element={<TechCard/>} />
  </Routes>


 </div>
  )}
export default App