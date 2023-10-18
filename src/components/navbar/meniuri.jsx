export default function get_meniuri(){
    let drepturi_string = localStorage.drepturi;
    let drepturi = drepturi_string.split(',');
    console.log(drepturi_string);
    console.log(drepturi, drepturi.length);
    let meniuri = [];
    let name;
    for(let i = 0; i <= rights.length; i++){
        if(i == 0){
            name = 'Adauga';
        }
        else if (i == 1){
            name = 'Manager';
        }
        else if (i = 2){
            name = 'Utilitare';
        }
        meniuri[i] = name;
    }
    console.log(meniuri);
    return meniuri;
}