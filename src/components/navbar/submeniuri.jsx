import {useState} from 'react'
import Axios from 'axios'
export default function get_submeniuri(id_societate,id_user){
    const controller = new AbortController;
    const [submeniuri , setSubmeniuri] = useState("");
    let submenus;
    let url = "http://localhost:3002/api/get/submeniuri/"+id_societate+"/"+id_user;
    Axios.get(url,{signal: controller.signal}).then((data) => {
        setSubmeniuri(data.data)
    })
    if(submeniuri.length == 1){
        controller.abort();
        submenus = submeniuri[0].submeniuri.split(',');
    }
    return submenus
}