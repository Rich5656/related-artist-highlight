import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dashboard } from './Components/Dashboard';
import { Login } from './Components/Login';

// getting access token info from the url
const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <div className='main-style'>
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;
