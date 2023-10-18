import {useState} from 'react'
import Axios from 'axios'
export default function get_drepturi(){
    let id_societate = localStorage.id_societate;
    let id_user = localStorage.id_user;
    const controller = new AbortController;
    const [drepturi , setDrepturi] = useState("");
    let url = "http://localhost:3002/api/get/drepturi/"+id_societate+"/"+id_user;
    Axios.get(url,{signal: controller.signal}).then((data) => {
        setDrepturi(data.data)
    })
    if(drepturi.length == 1){
        controller.abort();
    }
    localStorage.setItem('drepturi', drepturi[0].drepturi);
    return drepturi[0];
}