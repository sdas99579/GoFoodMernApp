
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home></Home>}/>
        <Route exact path="/login" element={<Login></Login>}/>
        <Route exact path="/creatuser" element={<Signup></Signup>}/>
        <Route exact path="/myOrder" element={<MyOrder></MyOrder>}/>
      </Routes>
    </div>
    </Router>
     </CartProvider>
    
  );
}

export default App;
