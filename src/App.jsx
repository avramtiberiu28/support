import './App.css'
import Login from './components/login/login';
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';
function App() {
   if(localStorage.length != 0){
    if(localStorage.loggedin != undefined && localStorage.loggedin == 'true' && localStorage.id_societate != undefined){
      $('body').remove('hold-transition login-page');
      $('body').addClass('sidebar-mini skin-black layout-top-nav');
      return(
        <div>
          <Navbar />
          <Main />
        </div>
      )
    }
    else if(localStorage.loggedin != undefined && localStorage.loggedin != 'true'){
      return(<Login />)
    }
  }
  else if(localStorage.length == 0){
    $('body').addClass('hold-transition login-page');
    return(<Login />)
  }
}

export default App
