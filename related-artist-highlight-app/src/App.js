import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './Components/Login';
import { DashboardContainer } from './Containers/DashboardContainer';

// getting access token info from the url
const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <div className='main-style'>
        {code ? <DashboardContainer code={code} /> : <Login />}
    </div>
  );
}

export default App;
