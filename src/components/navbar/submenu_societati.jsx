import get_nume_societate from './nume_societate';
export default function submeniu_societati () {
        const id_societate = localStorage.id_societate;
        let nume_societate = get_nume_societate(id_societate);
        $("#societate").html('');
        let html = '<li className="dropdown">'
            html +=  '<a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">'
            html +=     'Societate: ' + nume_societate                                
            html +=  '</a>'
            html +=  '<ul class="dropdown-menu">'
            let societati_concat = localStorage.societati_concat;
            let societati_deconcat = societati_concat.split(',');
            let denumire_societate;
            $.each(societati_deconcat, function (i, id_societate) {
                if(id_societate == 1){
                    denumire_societate = 'Fraher Distribution'
                }
                else if(id_societate == 2){
                    denumire_societate = 'Fraher Retail'
                }
                else if(id_societate == 3){
                    denumire_societate = 'Fraher'
                }
                html +=     '<li>'
                html +=         '<a className="titles" href="?change_societate='+id_societate+'"><i className="fa fa-arrow-right"></i>'+denumire_societate+'</a>'
                html +=     '</li>'
            });
            html +=  '</ul>'
            html += '</li>'
        $("#societate").append(html);
}