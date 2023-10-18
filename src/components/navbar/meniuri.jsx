export default function get_meniuri(rights){
    let meniuri = [];
    let name;
    console.log(rights);
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