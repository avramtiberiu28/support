import Axios from 'axios'
import {useState, useEffect} from 'react'
export function Articole (categorie){
    const [itemsList,setItem_list] = useState([]);
    useEffect(()=>{
        Axios.get(`http://localhost:3002/api/get/items/${categorie}`).then((data)=>{
            setItem_list(data.data)
        });
    },[])
    return itemsList;
}
export function Drepturi (item) {
    let articol = JSON.stringify(item);
    if(localStorage.length != 0){
        if(localStorage.loggedin == 'true'){
            let drepturi = localStorage.drepturi;
            if(drepturi == 1){
                return (
                    <div className="dropdown">
                        <button className="btn btn-success"><i className='fa fa-cog'></i> Optiuni</button>
                        <div className="dropdown-content">
                            <a href="#" id='delete' item={articol}><i className='fa fa-trash'></i> Sterge</a>
                            <a href="#" id='edit' item={articol}><i className='fa fa-edit'></i> Editeaza</a>
                            <a href="#" id='print-bax' item={articol}><i className='fa fa-print'></i> Printeaza bax</a>
                            <a href="#" id="print-single" item={articol}><i className='fa fa-print'></i> Printeaza buc</a>
                        </div>
                    </div>
                )
            }
            else if(drepturi == 0){
                return (
                    <div className="dropdown-normalUser">
                        <button className="btn btn-success"><i className='fa fa-cog'></i> Optiuni</button>
                        <div className="dropdown-content-normalUser">
                            <a href="#" id='print-bax' item={articol}><i className='fa fa-print'></i> Printeaza bax</a>
                            <a href="#" id="print-single" item={articol}><i className='fa fa-print'></i> Printeaza buc</a>
                        </div>
                    </div>
                )
            }
        }
    }
}