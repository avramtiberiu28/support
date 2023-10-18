import {useState} from 'react'
import Axios from 'axios'
import submeniu_societati from './submenu_societati';
import get_nume_societate from './nume_societate';
const controller = new AbortController;
const controller_meniu = new AbortController;
export default function Navbar () {
    const id_user = localStorage.id_user;
    const id_societate = localStorage.id_societate;
    const count_societati = localStorage.count_societati;
    let url;
    let rights;
    let submenus;
    let nume_societate = get_nume_societate(id_societate);
    const [drepturi , setDrepturi] = useState("");
    const [submeniuri , setSubmeniuri] = useState("");
    const [meniu , setMeniu] = useState("");
    url = "http://localhost:3002/api/get/drepturi/"+id_societate+"/"+id_user;
    Axios.get(url,{signal: controller.signal}).then((data) => {
        setDrepturi(data.data)
    })
    url = "http://localhost:3002/api/get/submeniuri/"+id_societate+"/"+id_user;
    Axios.get(url,{signal: controller.signal}).then((data) => {
        setSubmeniuri(data.data)
    })
   
    if(drepturi.length == 1){
        controller.abort();
        rights = drepturi[0].drepturi.split(',');
    }
    if(submeniuri.length == 1){
        controller.abort();
        submenus = submeniuri[0].submeniuri.split(',');
    }
    if(count_societati > 1){
        submeniu_societati(id_societate);
    }
    function meniuri(rights){
        $.each(rights, function(i, drept){
            url = "http://localhost:3002/api/get/nume_meniu/"+drept;
            Axios.get(url,{signal: controller_meniu.signal}).then((data) => {
                setMeniu(data.data)
            })
            console.log(meniu);
        })
        controller_meniu.abort();
    }
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
                                            <a className="titles" href="?mytickets" target="_self" title="Ticketele mele">
                                                <i className="fa  fa-arrow-right"></i>Tickete 
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Manager <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li>
                                            <a className="titles" href="?alltickets" target="_self" title="Toate ticketele">
                                                <i className="fa  fa-arrow-right"></i>Toate ticketele 
                                            </a>
                                        </li>
                                        <li>
                                            <a className="titles" href="?stats" target="_self" title="Grafice">
                                                <i className="fa fa-arrow-right"></i>Grafice 
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Utilitare <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li>
                                            <a className="titles" href="?user_mgmt" target="_self" title="Utilizatori">
                                                <i className="fa  fa-arrow-right"></i>Utilizatori 
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav">
                                <li className="dropdown user user-menu">
                                    <a href="?user" className="dropdown-toggle" data-toggle="dropdown">
                                        <span className="hidden-xs"><span className="glyphicon glyphicon-user" />{' '+localStorage.name+' '+localStorage.prename}</span>
                                    </a> 
                                </li>
                                <li>
                                    <a className="p-6 block f-size-14px" id="btn-logout"><span className="glyphicon glyphicon-log-out" title="Inchide aplicatia"></span> Logout</a>
                                </li>
                            </ul>
                            <ul id="societate" className="nav navbar-nav navbar-right">
                                <li>
                                    <a className="p-6 block f-size-14px societate"><span><b>Societate: </b>{nume_societate}</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
}