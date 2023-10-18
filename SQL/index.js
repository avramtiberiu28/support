const express = require('express');
const db = require('./config/dbconnect.js')
const cors = require('cors')

const app = express();
const  PORT = 3002;
const controller = new AbortController;
app.use(cors());
app.use(express.json())

// Adu toate articolele
app.get("/api/get/items/:categorie", (req,res)=>{
    const categorie = req.params.categorie;
    let sql_query = "SELECT a.*, b.id_item_details, b.sp, b.clasa, b.produs, b.depozitare_transport, b.recomandari, b.ingrediente, b.alergeni, b.informatii_nutritionale, b.data_congelarii_is_data_productiei, b.data_expirarii, b.producator, b.masa_neta, b.stampila, b.congelat, b.afiseaza_cod_bara FROM items a LEFT JOIN item_details b ON a.id_item = b.id_item WHERE categorie = ? ORDER BY a.id_item ASC" 
    db.query(sql_query,categorie, (err,result)=>{
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});
app.get("/api/get/productie/:data_in/:data_out", (req, res) => {
    const data_in = req.params.data_in;
    const data_out = req.params.data_out;
    let sql_query = `CALL get_productie('${data_in}', '${data_out}')`;
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result);
    });
}); 

//Adu detalii login
app.post("/api/get/login", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let sql_query = "CALL get_login(?,?)"
    db.query(sql_query, [username, password], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        res.send(result)
        console.log(result)
    });   
});

app.post("/api/get/societati", (req, res) => {
    let sql_query = "SELECT * FROM societati";
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
        console.log(result);
    })
})

app.get("/api/get/societate/:id_societate", (req,res)=>{
    const id_societate = req.params.id_societate;
    let sql_query = "SELECT name FROM societati WHERE id_societate = ? ";
    db.query(sql_query, [id_societate], (err, result) => {
        if(err) {
            console.log(err);
        }
        controller.abort();
        res.send(result);
    })
})
app.get("/api/get/drepturi/:id_societate/:id_user", (req,res)=>{
    const id_societate = req.params.id_societate;
    const id_user = req.params.id_user;
    let sql_query = "SELECT drepturi FROM user_info WHERE id_societate = ? AND id_user = ?";
    db.query(sql_query, [id_societate, id_user], (err, result) => {
        if(err) {
            console.log(err);
        }
        controller.abort();
        res.send(result);
    })
})

app.post('/api/save/label', (req,res)=> {
    const item = req.body;
    const id_item = item.id_item;
    const cod_marfa = item.cod_marfa
    const cod_bara = item.cod_bara
    const nume_marfa = item.nume_marfa
    const um = item.um
    const nume_grupa_marfa = item.nume_grupa_marfa
    const categorie = item.categorie
    const baxaj = item.baxaj
    const data_productiei = item.data_productiei
    const id_item_details = item.id_item_details
    let flag;
    if(id_item_details == null){
        flag = 0;
    }
    else if(id_item_details != null){
        flag = 1;
    }
    const sp = item.sp
    const clasa = item.clasa;
    const produs = item.produs
    let depozitare_transport = item.depozitare_transport
    if(depozitare_transport == null){
        depozitare_transport = '';
    }
    const recomandari = item.recomandari
    const ingrediente = item.ingrediente
    const alergeni = item.alergeni
    const informatii_nutritionale = item.informatii_nutritionale
    const data_congelarii_is_data_productiei = item.data_congelarii_is_data_productiei
    const data_expirarii = item.data_expirarii
    const producator = item.producator
    const masa_neta = item.masa_neta
    let stampila = item.stampila
    if(stampila == null){
        stampila = '';
    }
    const congelat = item.congelat
    const afiseaza_cod_bara  = item.afiseaza_cod_bara

    db.query("CALL save_edit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id_item, cod_marfa, cod_bara, nume_marfa, um, nume_grupa_marfa, categorie, baxaj,
        data_productiei, id_item_details, sp, clasa, produs, depozitare_transport, recomandari,
        ingrediente, alergeni, informatii_nutritionale, data_congelarii_is_data_productiei,
        data_expirarii, producator, masa_neta, stampila, congelat, afiseaza_cod_bara, flag], (err, result) => {
            if(err){
                console.log(err);
            }
            console.log(result)
            result[1].flag = true;
            res.send(result);
        }
    );
})

app.post('/api/add/label', (req,res)=> {
    const item = req.body;
    console.log(item)
    const categorie = item.categorie
    const cod_marfa = item.cod_marfa
    const cod_bara = item.cod_bara
    const nume_marfa = item.nume_marfa
    const um = item.um
    const nume_grupa_marfa = item.nume_grupa_marfa
    const baxaj = item.baxaj
    const data_productiei = item.data_productiei
    const id_item_details = item.id_item_details
    let flag;
    if(id_item_details == null){
        flag = 0;
    }
    else if(id_item_details != null){
        flag = 1;
    }
    const sp = item.sp
    const clasa = item.clasa;
    const produs = item.produs
    let depozitare_transport = item.depozitare_transport
    if(depozitare_transport == null){
        depozitare_transport = '';
    }
    const recomandari = item.recomandari
    const ingrediente = item.ingrediente
    const alergeni = item.alergeni
    const informatii_nutritionale = item.informatii_nutritionale
    const data_congelarii_is_data_productiei = item.data_congelarii_is_data_productiei
    const data_expirarii = item.data_expirarii
    const producator = item.producator
    const masa_neta = item.masa_neta
    let stampila = item.stampila
    if(stampila == null){
        stampila = '';
    }
    const congelat = item.congelat
    const afiseaza_cod_bara  = item.afiseaza_cod_bara

    db.query("CALL add_label(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [cod_marfa, cod_bara, nume_marfa, um, nume_grupa_marfa, categorie, baxaj,
        data_productiei, id_item_details, sp, clasa, produs, depozitare_transport, recomandari,
        ingrediente, alergeni, informatii_nutritionale, data_congelarii_is_data_productiei,
        data_expirarii, producator, masa_neta, stampila, congelat, afiseaza_cod_bara, flag], (err, result) => {
            if(err){
                console.log(err);
            }
            console.log(result)
            result[1].flag = true;
            res.send(result);
        }
    );
})

app.post('/api/save/productie', (req,res)=> {
    const item = req.body;
    const id_item = item.id_item;
    const um = item.um
    const impachetare = item.impachetare;
    const contor = item.contor;
    let cantitate;
    if(item.impachetare == 'single' && um.toLowerCase() == 'buc'){
        cantitate = item.nrPrint
        if(item.nrPrint == ''){
            cantitate = 1;
        }
    }
    else if(item.impachetare == 'bax' && um.toLowerCase() == 'buc'){
        cantitate = item.baxaj
    }
    else if(item.impachetare == 'single' && um.toLowerCase() == 'kg'){
        cantitate = parseFloat(item.greutate.slice(0, -2)).toFixed(3);
    }
    else if(item.impachetare == 'bax' && um.toLowerCase() == 'kg'){
        cantitate = parseFloat(item.suma).toFixed(3);
    }


    if( item.impachetare == 'bax' && um.toLowerCase() == 'kg' && item.contor == item.baxaj && item.suma != ''){
        db.query("CALL save_productie(?, ?, ?, ?)",
            [id_item, um, cantitate, impachetare], (err, result) => {
                if(err){
                    console.log(err);
                }
                console.log(result)
            }
        );
    }
    else if(item.impachetare == 'single' && um.toLowerCase() == 'kg' && item.baxaj == 1){
        db.query("CALL save_productie(?, ?, ?, ?)",
            [id_item, um, cantitate, impachetare], (err, result) => {
                if(err){
                    console.log(err);
                }
                console.log(result)
            }
        );
    }
    else if(um.toLowerCase() == 'buc'){
        db.query("CALL save_productie(?, ?, ?, ?)",
            [id_item, um, cantitate, impachetare], (err, result) => {
                if(err){
                    console.log(err);
                }
                console.log(result)
            }
        );
    }
    console.log(item);
})

app.post('/api/delete/item' , (req, res) => {
    const articol = req.body;
    const id_item = articol.id_item
    db.query("CALL delete_item(?)", [id_item], (err, result) => {
        if(err){
            console.log(err);
            result.flag = false;
        }
        console.log(result);
        result.flag = true;
        res.send(result);
    })
})


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})