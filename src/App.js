import { useSelector } from 'react-redux';
import './App.scss';
import Alert from './components/Alert/Alert';
import Routings from './Routings';
// import Signup from './pages/Signup/Signup';


function App() {
  return (
    <div className="App">
      <Alert/>
      <Routings/>
    </div>
  );
}

export default App;
