import { Articole, Drepturi} from './function';

export default function Main() {
  let categorie_meniu = location.search.substring(1);
  console.log(categorie_meniu);
  /*if(categorie_meniu != ''){
    let articole = Articole(categorie_meniu);
    return (
      <div className='container-main' id='main-body'>
        <div className='items w-full'>
          <div className='panel panel-items panel-success w-full'>
            <div className='panel-heading w-full h-20'>
              <h4 className='float-left mt-2'>{categorie_meniu.charAt(0).toUpperCase() + categorie_meniu.slice(1)}</h4>
            </div>
            <div className='panel-body'>
              {articole.map((item, key) => {
                return (
                  <div className='col-lg-2 col-md-2 col-xs-4 col-sm-2 item' key={key}>
                    <div className='row h-auto relative'>
                      <div className='col col-md-12 col-sm-12 col-lg-12 col-xs-12 item-cell'>
                        <div className='row row-denumire'>
                          <center>
                            <span className='denumire'>{item.nume_marfa}</span>
                          </center>
                        </div>
                        <div className='row row-buton'>
                          {Drepturi(item)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {*/
    return (
      <div className='container-main' id='main-body'>
        <div className='items w-full h-100'>
          <div className='panel panel-items panel-success w-full h-full'>
            <div className='panel-heading w-full h-20'>
              <h4 className='float-left mt-2'>Alege o categorie de articole de mai sus</h4>
            </div>
            <div className='panel-body h-full'>
              
            </div>
          </div>
        </div>
      </div>
    )
  //}
}
