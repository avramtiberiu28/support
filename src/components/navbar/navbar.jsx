import {useState} from 'react'
import Axios from 'axios'
export default function Navbar () {
    const id_societate = localStorage.id_societate;
    const id_user = localStorage.id_user;
    const [societati, societati_list] = useState('');
    function get_nume_societate(){
        Axios.post("http://localhost:3002/api/get/nume_societate").then((data) => {
            societati_list(data.data)
        })
    }
    get_nume_societate();
    //const drepturi = localStorage.drepturi;
    /*if(drepturi == 1){
        return (
            <div className="navbar border-bottom border-top border-right border-left">
                <div className="container container-navbar">
                    <ul className="nav navbar-nav">
                        <li><a href="?refrigerata">Refrigerate</a></li>
                        <li><a href="?congelata">Congelate</a></li>
                        <li><a href="?shaorma">Shaorma</a></li>
                        <li><a href="?preparate">Preparate</a></li>
                        <li><a href="?burgeri">Burgeri</a></li>
                        <li><a href="?licitatii">Licitatii</a></li>
                        <li><a href="?curcan">Curcan</a></li>
                    </ul>
                    <div className="float-right">
                        <a className="p-6 block f-size-14px" id="btn-addLabel"><i className="fa fa-add" aria-hidden='true'></i> Adauga eticheta</a>
                        <a className="p-6 block f-size-14px" id="btn-productie"><i className="fa fa-bars" aria-hidden='true'></i> Productie</a>
                        <a className="p-6 block f-size-14px" id="btn-logout"><span className="glyphicon glyphicon-log-out"></span> Logout</a>
                    </div>
                </div>
            </div>
        )
    }
    else if(drepturi == 0){*/
        return (
            <header className="main-header"> 
                <nav className="navbar navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="?main" className="navbar-brand">
                                <span className="logo-mini"> 
                                    <b>Fraher</b> HelpDesk
                                </span>
                            </a>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                                <i className="fa fa-bars"></i>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse justify-content-end" id="navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Adauga <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li>
                                            <a className="titles" href="/application/master/v_item.php" target="_self" title="Ticketele mele">
                                                <i className="fa  fa-arrow-right"></i>Tickete 
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Manager <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li>
                                            <a className="titles" href="/application/mananger/v_index.php" target="_self" title="Toate ticketele">
                                                <i className="fa  fa-arrow-right"></i>Toate ticketele 
                                            </a>
                                        </li>
                                        <li>
                                            <a className="titles" href="/application/mananger/grafice.php" target="_self" title="Grafice">
                                                <i className="fa �fa-arrow-right"></i>Grafice 
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Utilitare <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li>
                                            <a className="titles" href="/application/utility/v_mstuser.php" target="_self" title="Utilizatori">
                                                <i className="fa  fa-arrow-right"></i>Utilizatori 
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav">
                                <li className="dropdown user user-menu">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <span className="hidden-xs"><span className="glyphicon glyphicon-user" />{' '+localStorage.name+' '+localStorage.prename}</span>
                                    </a> 
                                </li>
                                <li>
                                    <a className="p-6 block f-size-14px" id="btn-logout"><span className="glyphicon glyphicon-log-out" title="Inchide aplicatia"></span> Logout</a>
                                </li>
                            </ul>
                            <ul id="societate" className="nav navbar-nav societate">
                                <li>
                                    <a className="p-6 block f-size-14px societate"><span><b>Societate: </b>{localStorage.id_societate}</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    //}
}