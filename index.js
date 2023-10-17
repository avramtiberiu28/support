function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
  
function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('.');
}

function reformatDatePlusOne(dateStr)
{
  var dArr = dateStr.split("-");  // ex input: "2010-01-18"
  dArr[2] = parseInt(dArr[2]) + 1;
  return dArr[2]+ "." +dArr[1]+ "." +dArr[0]; //ex output: "18/01/10"
}
function reformatDateCur(dateStr)
{
  var dArr = dateStr.split("-");  // ex input: "2010-01-18"
  return dArr[2]+ "." +dArr[1]+ "." +dArr[0]; //ex output: "18/01/10"
}
Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + parseInt(days));
  return this;
};

function generateZPLCodeBUC(details) {
  const font_denumire = `^CF0,30,40`;
  const font_normal = `^CF0,20`;
  const font_data = `^CF0,25`;
  let barcode;
  if(details.afiseaza_cod_bara != 0){
    barcode = `^BY2,2,50^FO40,395^BE,30,Y,N,N^FD${details.cod_bara.slice(0, -1)}^FS`;
  }
  else if(details.afiseaza_cod_bara == 0){
    barcode = '';
  }
  const rotatedLabel = '^FWN';
  let inaltime = 0;
  let zplCode = `^XA`
  zplCode += rotatedLabel;

  ///titlu eticheta
  let inaltimeTitlu = inaltime+20
  let nrRanduri;
  if(details.nume_marfa.length > 27){
    nrRanduri = details.nume_marfa.length / 30;
    if(parseInt(nrRanduri) < nrRanduri){
      nrRanduri = nrRanduri + 1;
    }
    if(parseFloat(nrRanduri).toFixed(2) > '1.90' && parseFloat(nrRanduri).toFixed(2) < '2.0'){
      nrRanduri = 2;
    }
  }
  else{
    nrRanduri = 1;
  }
  for(let i = 0; i <= 1; i++){
    zplCode += `${font_denumire}^FO${i},${inaltimeTitlu}^FB550,${parseInt(nrRanduri)},0,C^FD${details.nume_marfa.trim()}^FS`
  }
  inaltime = inaltimeTitlu + (parseInt(nrRanduri)*30);
  //titlu eticheta
   
  //sp
  zplCode += `${font_normal}^FO40,${inaltime}^FDSP: ${details.sp}^FS`
  //sp

  //clasa
  if(details.clasa != null && details.clasa != ''){
    zplCode += `${font_normal}^FO0,${inaltime}^FB550,1,0,C^FDClasa: ${details.clasa}^FS`
  }
  //clasa

  //tratament
  if(details.produs != null){
    zplCode += `${font_normal}^FO400,${inaltime}^FD${details.produs}^FS`
  }
  //tratament

  //transport depozitare
  if(details.depozitare_transport != null && details.depozitare_transport != ''){
    zplCode += `${font_normal}^FO20,${inaltime+=20}^FDDepozitat si transportat la: ${details.depozitare_transport}^FS`
  }
  //transport depozitare

  //recomandari
  if(details.recomandari != null && details.recomandari != ''){
    let nrRanduri;
    if(details.recomandari.length > 63){
      nrRanduri = details.recomandari.length / 63;
      if(parseInt(nrRanduri) < nrRanduri){
        nrRanduri = nrRanduri + 1;
      }
    }
    else{
      nrRanduri = 1;
    }
    inaltime = inaltime;
    zplCode += `${font_normal}^FO20,${inaltime+=20}^FB550,${parseInt(nrRanduri)},0^FDRecomandari: ${details.recomandari.trim()}^FS`
    //inaltime = inaltime+(20*parseInt(nrRanduri));
  }
  else{
    inaltime = inaltime - 20;
  }
  //recomandari

  //ingrediente
  if(details.ingrediente != null){
    let nrRanduri;
    if(details.ingrediente.length > 63){
      nrRanduri = details.ingrediente.length / 63;
      if(parseInt(nrRanduri) < nrRanduri){
        nrRanduri = nrRanduri + 1;
      }
    }
    else{
      nrRanduri = 1;
    }
    zplCode += `${font_normal}^FO20,${inaltime+=40}^FB550,${parseInt(nrRanduri)},0^FDIngrediente: ${details.ingrediente.trim()}^FS`
    inaltime = inaltime+(20*parseInt(nrRanduri));
  }
  //ingrediente

  //alergeni
  if(details.alergeni != null){
    let inaltimeAlergeni = inaltime;
    for(let i = 0; i <= 1; i++){
      zplCode += `${font_normal}^FO${i},${inaltimeAlergeni}^FB550,1,0,C^FDContine alergeni: ${details.alergeni.trim()}^FS`
    }
    inaltime = inaltime;
  }
  else{
    inaltime = inaltime;
  }
  //alergeni

  //origine,crestere,abatorizare
  if(details.origine != ''){
    let inaltimeOrigine = inaltime+20;
    for(let i = 0; i <= 1; i++){
      zplCode += `${font_normal}^FO${i},${inaltimeOrigine}^FB550,1,0,C^FDOrigine, crestere, abatorizare: ${details.origine}^FS`
    }
    inaltime = inaltime+20;
  }
  else{
    inaltime = inaltime;
  }
  //origine,crestere,abatorizare

  //valori energetice
  if(details.informatii_nutritionale != null){
    let nrRanduri;
    if(details.informatii_nutritionale.length > 63){
      nrRanduri = details.informatii_nutritionale.length / 63;
      if(parseInt(nrRanduri) < nrRanduri){
        nrRanduri = nrRanduri + 1;
      }
    }
    else{
      nrRanduri = 1;
    }
    zplCode += `${font_normal}^FO20,${inaltime+20}^FB550,${parseInt(nrRanduri)},0^FDValori nutritionale medii/ 100g produs: ${details.informatii_nutritionale.trim()}^FS`
    inaltime = inaltime+(20*parseInt(nrRanduri));
  }
  //valori energetice

  //lot
  zplCode += `${font_normal}^FO400,${inaltime+20}^FDLot: ${details.lot}^FS`
  //lot

  //masa neta
  if(details.masa_neta != '' && details.um.toLowerCase() == 'buc'){
    zplCode += `${font_normal}^FO400,${inaltime+40},400^FDMasa neta: ${details.masa_neta}^FS\n`
  }
  else if(details.masa_neta == '' && details.um.toLowerCase() == 'kg'){
    zplCode += `${font_normal}^FO400,${inaltime+40},400^FDMasa neta: 1 Kg^FS\n`
  }
  //masa neta

  //date
  const data_curenta = new Date;
  const data_productiei = data_curenta.addDays(details.data_productiei);
  if(details.congelat == 1){
    if(details.data_congelarii_is_data_productiei == 1){
      zplCode += `${font_data}^FO20,${inaltime+=25}^FDProdus si congelat la: ${formatDate(data_productiei)}^FS`
    }
    else{
      zplCode += `${font_data}^FO20,${inaltime+=25}^FDData productiei: ${formatDate(data_productiei)}^FS`
      const data_congelarii = data_productiei.addDays(details.data_congelarii);
      zplCode += `${font_data}^FO20,${inaltime+=25}^FDData congelarii: ${formatDate(data_congelarii)}^FS`
    }
    const data_expirarii = data_productiei.addDays(details.data_expirarii);
    zplCode += `${font_data}^FO20,${inaltime+=25}^FDData expirarii: ${formatDate(data_expirarii)}^FS`
  }
  //date

  //producator
  if(details.producator != null){
    let nrRanduri;
    if(details.producator.length > 63){
      nrRanduri = details.producator.length / 63;
      if(parseInt(nrRanduri) < nrRanduri){
        nrRanduri = nrRanduri + 1;
      }
    }
    else{
      nrRanduri = 1;
    }
    zplCode += `${font_normal}^FO20,${inaltime+25}^FB550,${parseInt(nrRanduri)},0^FDProducator: ${details.producator.trim()}^FS`
    inaltime = inaltime+(20*parseInt(nrRanduri));
  }
  //producator

  //stampila
  let stampila=`^FO350,${inaltime+=5}^GFA,1340,1340,20,,::V03KFE,S01QF,Q01UF,P03WF8,O03YF8,N03MF8K01MF8,M03KFEQ0LF8,M0KFT01JFE,L07IFEW0JFC,K03IFCU06I07IF8,K0IFEI0F8Q06J0IFE,J03FFEJ084W0IF8,J0IFK086W01FFE,I01FFCK0861E1B9C1E0B863CJ07FF8,I07FEL08C211CE2210C4642K0FFC,001FF8L0F861984301884603K03FF,003FEM08840984301886603L0FF8,007FCM08C4098431F88663FL03FC,00FFN0844098433188I63L01FE,01FCN08661984321886643M07F,03F8N08621184I388I67M03F8,07FO0821E18431D88663BM01FC,07EgS0FC,0FCgS07E,1F8T0F03C078R03F,1F8S01184208S03F,1FT030CC31T01F,3FT020C811T01F8,3ET020C813U0F8,3ET030C813F8S0F8,3ET01FC8130CS0F8,3EV0C81304S0F8,:3FV08C310CR01F8,1FU01042188R01F,1F8S03E03C0FS03F,1F8gS03F,0FCgS07E,07EgS0FC,07FU0787ES01FC,03F8T0844T03F8,01FCS01004T07F,00FFS03004S01FE,007F8R03004S03FC,003FER02007CR0FF8,001FF8Q02004R03FF,I07FEQ03004R0FFC,I03FFCP03004Q03FF8,J0IFP01004P01FFE,J03FFEO01844P0IF8,K0IFCO0787EN07FFE,K03IFCY07IF8,L07IFCW07IFC,L01JFET01KF,M03KFEQ0LF8,N03MF8L0MF8,O03YFC,P03WF8,Q01UF,S01QF8,V0LFE,,::^FS`;
  zplCode += stampila;
  //stampila
  zplCode += `${barcode}`
  zplCode += `^XZ`
  return zplCode;
}
function generateZPLCodeBAX(details) {
  const font_denumire = `^CF0,30,40`;
  const font_normal = `^CF0,20`;
  const font_data = `^CF0,25`;
  let barcode;
  if(details.afiseaza_cod_bara != 0){
      barcode = `^BY2,2,50^FO40,270^BE,30,Y,N,N^FD${details.cod_bara.slice(0, -1)}^FS\n`;
  }
  else if(details.afiseaza_cod_bara == 0){
    barcode = '';
  }
  const rotatedLabel = '^FWN';
  let inaltime = 0;
  let zplCode = `^XA`
  zplCode += rotatedLabel;

  ///titlu eticheta
  let inaltimeTitlu = inaltime+20
  let nrRanduri;
  if(details.nume_marfa.length > 27){
    nrRanduri = details.nume_marfa.length / 30;
    if(parseInt(nrRanduri) < nrRanduri){
      nrRanduri = nrRanduri + 1;
    }
    if(parseFloat(nrRanduri).toFixed(2) > '1.90' && parseFloat(nrRanduri).toFixed(2) < '2.0'){
      nrRanduri = 2;
    }
  }
  else{
    nrRanduri = 1;
  }
  for(let i = 0; i <= 1; i++){
    zplCode += `${font_denumire}^FO${i},${inaltimeTitlu}^FB550,${parseInt(nrRanduri)},0,C^FD${details.nume_marfa.trim()}^FS`
  }
  inaltime = inaltimeTitlu + (parseInt(nrRanduri)*30);
  //titlu eticheta
   
  //sp
  zplCode += `${font_normal}^FO40,${inaltime}^FDSP: ${details.sp}^FS`
  //sp

  //clasa
  if(details.clasa != null && details.clasa != ''){
    zplCode += `${font_normal}^FO0,${inaltime}^FB550,1,0,C^FDClasa: ${details.clasa}^FS`
  }
  //clasa

  //tratament
  if(details.produs != null){
    zplCode += `${font_normal}^FO400,${inaltime}^FD${details.produs}^FS`
  }
  //tratament

  //transport depozitare
  if(details.depozitare_transport != null && details.depozitare_transport != ''){
    zplCode += `${font_normal}^FO20,${inaltime+=20}^FDDepozitat si transportat la: ${details.depozitare_transport}^FS`
  }
  //transport depozitare

  //recomandari
  if(details.recomandari != null && details.recomandari != ''){
    let nrRanduri;
    if(details.recomandari.length > 63){
      nrRanduri = details.recomandari.length / 63;
      if(parseInt(nrRanduri) < nrRanduri){
        nrRanduri = nrRanduri + 1;
      }
    }
    else{
      nrRanduri = 1;
    }
    inaltime = inaltime;
    zplCode += `${font_normal}^FO20,${inaltime+=20}^FB550,${parseInt(nrRanduri)},0^FDRecomandari: ${details.recomandari.trim()}^FS`
    //inaltime = inaltime+(20*parseInt(nrRanduri));
  }
  else{
    inaltime = inaltime - 20;
  }
  //recomandari

  //origine,crestere,abatorizare
  if(details.origine != ''){
    let inaltimeOrigine = inaltime+40;
    for(let i = 0; i <= 1; i++){
      zplCode += `${font_normal}^FO${i},${inaltimeOrigine}^FB550,1,0,C^FDOrigine, crestere, abatorizare: ${details.origine}\\&^FS`
    }
    inaltime = inaltime+60;
  }
  else{
    inaltime = inaltime+40;
  }
  //origine,crestere,abatorizare

  //lot
  zplCode += `${font_normal}^FO400,${inaltime}^FDLot: ${details.lot}^FS`
  //lot

  //masa neta
  if(details.masa_neta != '' && details.um.toLowerCase() == 'buc'){
    zplCode += `${font_normal}^FO400,${inaltime+20},400^FDMasa neta: ${details.masa_neta}^FS\n`
  }
  else if(details.masa_neta == '' && details.um.toLowerCase() == 'kg'){
    zplCode += `${font_normal}^FO400,${inaltime+20},400^FDMasa neta: 1 Kg^FS\n`
  }
  //masa neta

  //date
  const data_curenta = new Date;
  const data_productiei = data_curenta.addDays(details.data_productiei);
  if(details.congelat == 1){
    if(details.data_congelarii_is_data_productiei == 1){
      zplCode += `${font_data}^FO20,${inaltime}^FDProdus si congelat la: ${formatDate(data_productiei)}^FS`
    }
    else{
      zplCode += `${font_data}^FO20,${inaltime}^FDData productiei: ${formatDate(data_productiei)}^FS`
      const data_congelarii = data_productiei.addDays(details.data_congelarii);
      zplCode += `${font_data}^FO20,${inaltime+=25}^FDData congelarii: ${formatDate(data_congelarii)}^FS`
    }
    const data_expirarii = data_productiei.addDays(details.data_expirarii);
    zplCode += `${font_data}^FO20,${inaltime+=25}^FDData expirarii: ${formatDate(data_expirarii)}^FS`
    }
  //date

  //producator
  if(details.producator != null){
    let nrRanduri;
    if(details.producator.length > 63){
      nrRanduri = details.producator.length / 63;
      if(parseInt(nrRanduri) < nrRanduri){
        nrRanduri = nrRanduri + 1;
      }
    }
    else{
      nrRanduri = 1;
    }
    zplCode += `${font_normal}^FO20,${inaltime+25}^FB550,${parseInt(nrRanduri)},0^FDProducator: ${details.producator.trim()}^FS`
    inaltime = inaltime+(20*parseInt(nrRanduri));
  }
  //producator

  //stampila
  let stampila=`^FO350,${inaltime+=5}^GFA,1340,1340,20,,::V03KFE,S01QF,Q01UF,P03WF8,O03YF8,N03MF8K01MF8,M03KFEQ0LF8,M0KFT01JFE,L07IFEW0JFC,K03IFCU06I07IF8,K0IFEI0F8Q06J0IFE,J03FFEJ084W0IF8,J0IFK086W01FFE,I01FFCK0861E1B9C1E0B863CJ07FF8,I07FEL08C211CE2210C4642K0FFC,001FF8L0F861984301884603K03FF,003FEM08840984301886603L0FF8,007FCM08C4098431F88663FL03FC,00FFN0844098433188I63L01FE,01FCN08661984321886643M07F,03F8N08621184I388I67M03F8,07FO0821E18431D88663BM01FC,07EgS0FC,0FCgS07E,1F8T0F03C078R03F,1F8S01184208S03F,1FT030CC31T01F,3FT020C811T01F8,3ET020C813U0F8,3ET030C813F8S0F8,3ET01FC8130CS0F8,3EV0C81304S0F8,:3FV08C310CR01F8,1FU01042188R01F,1F8S03E03C0FS03F,1F8gS03F,0FCgS07E,07EgS0FC,07FU0787ES01FC,03F8T0844T03F8,01FCS01004T07F,00FFS03004S01FE,007F8R03004S03FC,003FER02007CR0FF8,001FF8Q02004R03FF,I07FEQ03004R0FFC,I03FFCP03004Q03FF8,J0IFP01004P01FFE,J03FFEO01844P0IF8,K0IFCO0787EN07FFE,K03IFCY07IF8,L07IFCW07IFC,L01JFET01KF,M03KFEQ0LF8,N03MF8L0MF8,O03YFC,P03WF8,Q01UF,S01QF8,V0LFE,,::^FS`;
  zplCode += stampila;
  //stampila
  zplCode += `${barcode}`
  zplCode += `^XZ`
  return zplCode;
}

async function generateLabelBUC(zplCodeBUC){
  const response = await fetch(
    `http://api.labelary.com/v1/printers/8dpmm/labels/2.87x2.24/0/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(zplCodeBUC),
    }
  ); 
  const responseBlob = await response.blob();
  const imageUrl = URL.createObjectURL(responseBlob); 
  $('#img_eticheta_buc').attr('src', imageUrl);
  $('#img_eticheta_edit_buc').attr('src', imageUrl);
}
async function generateLabelBAX(zplCodeBAX){
  const response = await fetch(
    `http://api.labelary.com/v1/printers/8dpmm/labels/2.87x2.24/0/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(zplCodeBAX),
    }
  ); 
  const responseBlob = await response.blob();
  const imageUrl = URL.createObjectURL(responseBlob); 
  $('#img_eticheta_bax').attr('src', imageUrl);
  $('#img_eticheta_edit_bax').attr('src', imageUrl);
}

$(document).ready(function () {
  if(localStorage.length != 0){
    if(localStorage.loggedin != undefined && localStorage.loggedin == 'true'){
      $('#loggedin').val(1);
    }
    else{
      $('#loggedin').val(0);
      $('#modalLogin').modal('show');
    }
  }
  else if(localStorage.length == 0){
    $('#modalLogin').modal('show');
  }
})

$(document).on('keypress', '#password', function (e) {
  var key = e.which;
  if(key == 13){
    $('#btn-login-form').click();
    return false;
  }
})

$(document).on('click', '#btn-logout', function() {
  localStorage.clear();
  location.reload(true);
})

$(document).on('click', '#print-bax', function() {
  let undisable_printButtonFlag = 0;
  let articol = JSON.parse($(this).attr('item'));
  $('#item').val(JSON.stringify(articol));
  $('#item_edit').val(JSON.stringify(articol));
  let zplCodeBUC = generateZPLCodeBUC(articol);
  let zplCodeBAX = generateZPLCodeBAX(articol);
  
  sessionStorage.item = $(this).attr('item');
  $('#id_label').val(articol.id_item);
  $('#categorie').val(articol.categorie);
  $('#nume_marfa').val(articol.nume_marfa);
  $('#cod_marfa').val(articol.cod_marfa);
  $('#cod_bara').val(articol.cod_bara);
  $('#um').val(articol.um);
  $('#data_productiei').val(articol.data_productiei);
  if(articol.data_congelarii_is_data_productiei == 1){
    $('#data_congelarii').val(articol.data_productiei).attr('disabled', 'disabled');
  }
  if(articol.data_expirarii != 'null'){
    $('#data_expirarii').val(articol.data_expirarii).attr('disabled', 'disabled');
  }
  $('#impachetare').val('bax');
  $('#impachetare').attr('baxaj', articol.baxaj);
  
  generateLabelBUC(zplCodeBUC);
  generateLabelBAX(zplCodeBAX);
  $('#modalPrint').modal('show');
  if (articol.categorie == 'congelata') {
    $('#congelata').css('display', 'block');
  }
  else {
    $('#congelata').css('display', 'none');
  }

  if (articol.um.toLowerCase() == 'buc'){
    $('#print').css('display', 'none');
  }
  else {
    $('#print').css('display', 'none');
  }
  $("#tipareste").prop('disabled', 'disabled');
  $(document).on('change', '#lot', function (){
    undisable_printButtonFlag++;
    if(undisable_printButtonFlag == 2){
      $("#tipareste").prop('disabled', '');
    }
  })
  $(document).on('change', '#origine', function () {
    undisable_printButtonFlag++;
    if(undisable_printButtonFlag == 2){
      $("#tipareste").prop('disabled', '');
    }
  })
  $("#eticheta_bax").css('display', 'block');
  $('#modalPrint').on('hidden.bs.modal', function() {
    sessionStorage.clear();
    $(this).find("input, textarea, select")
      .val('')
      .end();
    $("#tipareste").prop('disabled', '');
  });
});

$(document).on('click', '#print-single', function() {
  
  let undisable_printButtonFlag = 0;
  let articol = JSON.parse($(this).attr('item'));
  $('#item').val(JSON.stringify(articol));
  $('#item_edit').val(JSON.stringify(articol));
  sessionStorage.item = $(this).attr('item');
  $('#id_label').val(articol.id_item);
  $('#categorie').val(articol.categorie);
  $('#nume_marfa').val(articol.nume_marfa);
  $('#cod_marfa').val(articol.cod_marfa);
  $('#cod_bara').val(articol.cod_bara);
  $('#um').val(articol.um);
  $('#impachetare').val('single');
  $('#impachetare').attr('baxaj', 1);
  $('#data_productiei').val(articol.data_productiei);
  if(articol.data_congelarii_is_data_productiei == 1){
    $('#data_congelarii').val(articol.data_productiei).attr('disabled', 'disabled');
  }
  if(articol.data_expirarii != 'null'){
    $('#data_expirarii').val(articol.data_expirarii).attr('disabled', 'disabled');
  }
  let zplCodeBUC = generateZPLCodeBUC(articol);
  generateLabelBUC(zplCodeBUC);
  $('#modalPrint').modal('show');
  if (articol.congelat == 1) {
    $('#congelata').css('display', 'block');
  } 
  else {
    $('#congelata').css('display', 'none');
  }
  if (articol.congelat == 1) {
    $('#ambalare').css('display', 'none');
  }
  else {
    $('#ambalare').css('display', 'block');
  }

  if (articol.um.toLowerCase() == 'buc'){
    $('#print').css('display', 'block');
  }
  else {
    $('#print').css('display', 'none');
  }
  $("#tipareste").prop('disabled', 'disabled');
  $(document).on('change', '#lot', function (){
    undisable_printButtonFlag++;
    if(undisable_printButtonFlag == 2){
      $("#tipareste").prop('disabled', '');
    }
  })
  $(document).on('change', '#origine', function () {
    undisable_printButtonFlag++;
    if(undisable_printButtonFlag == 2){
      $("#tipareste").prop('disabled', '');
    }
  })
  $("#eticheta_bax").css('display', 'none');
  
  $('#modalPrint').on('hidden.bs.modal', function() {
    sessionStorage.clear();
    $(this).find("input, textarea, select")
      .val('')
      .end();
    $("#tipareste").prop('disabled', '');
  });
});
  
$(document).on('click', '#edit', function() {
  
  
  let articol = JSON.parse($(this).attr('item'));
  $('#item_edit').val(JSON.stringify(articol));
  
  sessionStorage.item = $(this).attr('item');
  $('#id_label_edit').val(articol.id_item);
  $('#nume_marfa_edit').val(articol.nume_marfa);
  if(articol.congelat == 1){
    $('#congelat_edit').prop('checked', true);
  }
  else{
    $('#congelat_edit').prop('checked', false);
  }
  $('#cod_marfa_edit').val(articol.cod_marfa);
  $('#cod_bara_edit').val(articol.cod_bara);
  if(articol.afiseaza_cod_bara == 1){
    $('#afiseaza_codBara_edit').prop('checked', true);
  }
  else if(articol.afiseaza_cod_bara == 0){
    $('#afiseaza_codBara_edit').prop('checked', false);
  }
  $('#um_edit').val(articol.um);
  $('#baxaj_edit').val(articol.baxaj);
  $('#impachetare_edit').val('single');
  $('#impachetare_edit').attr('baxaj', 1);
  if (articol.congelat == 1) {
    if(articol.data_congelarii_is_data_productiei == 1){
      $('#congelata_edit').css('display', 'none');
      $('#data_congelarii_is_data_productiei_edit').prop('checked', true);
      $('#data_productiei_label').html('Produs si congelat la: ')
      $('#data_productiei_edit').val(articol.data_productiei);
    }
    else{
      $('#congelata_edit').css('display', 'block');
      $("#data_congelarii_edit").val(articol.data_congelarii);
    }   
  } 
  else {
    $('#congelata_edit').css('display', 'none');
  }
  $("#data_expirarii_edit").val(articol.data_expirarii);
  $("#sp_edit").val(articol.sp);
  $('#clasa_edit').val(articol.clasa);
  $("#produs_edit").val(articol.produs);
  $("#transport_depozitare_edit").val(articol.depozitare_transport)
  $("#recomandari_edit").val(articol.recomandari);
  $("#ingrediente_edit").val(articol.ingrediente);
  $("#alergeni_edit").val(articol.alergeni);
  $("#valori_energetice_edit").val(articol.informatii_nutritionale);
  $("#producator_edit").val(articol.producator);
  $("#masa_neta_edit").val(articol.masa_neta);


  let zplCodeBUC = generateZPLCodeBUC(articol);
  let zplCodeBAX = generateZPLCodeBAX(articol);

  generateLabelBUC(zplCodeBUC);
  generateLabelBAX(zplCodeBAX);
  $('#modalEdit').modal('show');
  
  $('#modalEdit').on('hidden.bs.modal', function() {
    sessionStorage.clear();
    location.reload();
    $(this).find("input, textarea, select")
      .val('')
      .prop('checked', false)
      .end();
  });
});

$(document).on('click', '#delete', function () {
  let articol = JSON.parse($(this).attr('item'));
  Swal.fire({
    icon : 'warning',
    title : 'Stergere articol',
    text : 'Esti sigur ca doresti sa stergi acest articol?',
    showConfirmButton : false,
    showDenyButton: true,
    showCancelButton: true,
    cancelButtonText: 'Renunta',
    denyButtonText: `Sterge`,
  }).then((result) => {
    if(result.isDismissed == true){
      Swal.fire('Articolul nu a fost sters', '', 'info')
    }
    else if(result.isDenied == true){
      fetch('http://localhost:3002/api/delete/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articol),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('API-ul SQL nu functioneaza.');
      })
      .then(data => {
        // Alte acțiuni după apelul cu succes al API-ului
        if(data.flag == true){
          Swal.fire('Articol sters!', '', 'error').then((res) => {if(res.isConfirmed == true){ location.reload() }})
          //location.reload();
        }
      })
      .catch(error => {
        Swal.fire('Eroare', error, 'error');
        console.error(error); // Tratarea erorilor în cazul unui eșec al apelului API
      });
    }
  })
})

$(document).on('click', '#btn-productie', function() {
  $('#modalProductie').modal('show');
  let data = new Date()
  data = data.toISOString().split('T')[0]
  fetch(`http://localhost:3002/api/get/productie/${data}/${data}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('API-ul SQL nu functioneaza.');
  })
  .then(productie => {
    // Alte acțiuni după apelul cu succes al API-ului
    let production = productie[0];
    const sumeCantitati = {};

    // Parcurgem fiecare element din array
    production.forEach((element) => {
      const id_item = element.id_item;
      const nume_marfa = element.nume_marfa;
      let data_productie = element.data_productie;
      data_productie = data_productie.slice(0, 10)
      data_productie = reformatDatePlusOne(data_productie);
      const cantitate = parseFloat(element.cantitate);
      const um = element.um;

      const cheie = `${id_item}-${nume_marfa}-${data_productie}-${um}`;

      if (sumeCantitati[cheie]) {
        sumeCantitati[cheie] += cantitate;
      }
      else {
        sumeCantitati[cheie] = cantitate;
      }
    });
    let i = 1;
    for (const cheie in sumeCantitati) {
      const [id_item, nume_marfa, data_productie, um] = cheie.split('-');
      let html = 
        `<tr>
          <th scope='row'>
            ${i}
          </th>
          <td>
            ${id_item}
          </td>
          <td>
            ${nume_marfa}
          </td>
          <td>
            ${data_productie}
          </td>
          <td>
            ${parseFloat(sumeCantitati[cheie]).toFixed(3)}
          </td>
          <td>
            ${um}
          </td>
        </tr>`
      $('#body_table').append(html);
      i++;
    }
  })
  .catch(error => {
    console.error(error); // Tratarea erorilor în cazul unui eșec al apelului API
  });
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date = new Date()) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }
  /*$('.datepicker').datepicker({
    format: "dd.mm.yyyy",
    todayBtn : true,
    language : "ro"
  });*/
  $('#data-in').val(formatDate());
  $('#data-out').val(formatDate());
  $('#modalProductie').on('hidden.bs.modal', function() {
    sessionStorage.clear();
    $(this).find("input, textarea, select")
      .val('')
      .prop('checked', false)
      .end();
    $("#body_table").html('')
  });
});

$(document).on('click', '#btn-addLabel', function() {
  let undisable_saveButtonFlag = 0;
  $(document).on('change', '#categorie_addLabel', function (){
    if($('#categorie_addLabel').val() != '' || $('#categorie_addLabel').val() != undefined){
      undisable_saveButtonFlag++;
    }
    if(undisable_saveButtonFlag == 3){
      $('#save_addLabel').prop('disabled', '');
    }
  })
  $(document).on('change', '#nume_marfa_addLabel', function (){
    undisable_saveButtonFlag++;
    if(undisable_saveButtonFlag == 3){
      $('#save_addLabel').prop('disabled', '');
    }
  })
  $(document).on('change', '#cod_marfa_addLabel', function (){
    if($('#categorie_addLabel').val() != '' || $('#categorie_addLabel').val() != undefined){
      undisable_saveButtonFlag++;
    }
    if(undisable_saveButtonFlag == 3){
      $('#save_addLabel').prop('disabled', '');
    }
  })
  $('#save_addLabel').prop('disabled', 'disabled');
  $('img').css('display', 'none');
  $('#modalAddLabel').modal('show');
  
  $('#modalAddLabel').on('hidden.bs.modal', function() {
    sessionStorage.clear();
    location.reload();
    $(this).find("input, textarea, select")
      .val('')
      .prop('checked', false)
      .end();
  });
})

$(document).on('click', '#save_table' , function () {
  $('#table_productie').tableExport({type: 'excel'});
})
  