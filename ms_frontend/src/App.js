import './App.css';
import {useState, useEffect, useRef, useContext} from 'react'
import Header from './components/Header'
import ShowsListPage from './pages/ShowsListPage'
import ShowForm from './components/ShowForm';
import ShowDetailPage from './pages/ShowDetailPage';
import Alert from './components/Alert';
import AppState from './context/visibility/AppState';
import AlertState from './context/alerts/AlertState';
import ShowState from './context/shows/ShowState';
import alertsContext from './context/alerts/AlertContext';
import visiblityContext from './context/visibility/visibility-context';
import ShowsContext from './context/shows/ShowsContext';

const App = () => {

  const {formVisible, setFormVisible} = useContext(visiblityContext);
  const {alert, setAlert} = useContext(alertsContext);
  const {getPlatforms} = useContext(ShowsContext);

  let [updateme, setupdateme] = useState(false);
  const btnRef = useRef(null)
  const formRef = useRef(null)

  //updates platforms each time form opens
  useEffect(() => {
    getPlatforms()
  }, [formVisible])

  const handleClickOutside = (e) => {
      if(!formRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
          // setIsHidden(true)
          setFormVisible(false)
      }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  })

  return (
    <div className="container">
      <div className='sticky-header'>
        <Header btnRef={btnRef} />
      </div>
      <Alert alert={alert} />
      <ShowsListPage updateme={updateme} />
      
      <ShowForm setupdateme={setupdateme} updateme={updateme}  formRef={formRef} setAlert={setAlert}/>
      <ShowDetailPage setAlert={setAlert} />
    </div>  
  );
};

export default function AppWrapper() {
  return (
    <AppState>
      <AlertState>
        <ShowState>
          <App />
        </ShowState>
      </AlertState>
    </AppState>
  );
};
