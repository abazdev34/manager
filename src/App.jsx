

import {Route,  Routes } from 'react-router-dom'

import Header from './components/header/index.jsx'
import Texkarta from './texkarta/index.jsx'
import Texkarta2 from './texkarta/kyxTex.jsx'

function App() {
  return (
 <div className="div">
  <Header/>
  <Routes>

  
    
  <Route path="/Texkarta" element={<Texkarta />} />
  <Route path="/Texkarta2" element={<Texkarta2 />} />


  </Routes>


 </div>
  )}
export default App