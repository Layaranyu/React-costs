import {BrowserRouter as Router,Route,Routes  } from 'react-router-dom'
import Home from './Components/Pages/Home';
import Contact from './Components/Pages/Contact';
import NewProject from './Components/Pages/NewProject';
import Company from './Components/Pages/Company';
import Projects from './Components/Pages/Projects';

import Container from './Components/Layout/Container';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';


function App() {
  return (
      <Router>
        <Navbar/>
        <Container customClass="min-height">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/company' element={<Company/>}/>
          <Route path='/newproject' element={<NewProject/>}/>
        </Routes>
        </Container>
        <Footer/>
      </Router>
  );
}

export default App;
