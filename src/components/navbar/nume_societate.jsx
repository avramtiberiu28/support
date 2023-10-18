import {useState} from 'react'
import Axios from 'axios'
export default function get_nume_societate(id_societate){
    const controller = new AbortController;
    let nume_societate;
    const [societate , setSocietate] = useState("");
    let url = "http://localhost:3002/api/get/societate/"+id_societate;
    Axios.get(url,{signal: controller.signal}).then((data) => {
        setSocietate(data.data)
    })
    console.log(societate);
    if(societate.length == 1){
        controller.abort();
        nume_societate = societate[0].name;
    }
    return nume_societate;
}