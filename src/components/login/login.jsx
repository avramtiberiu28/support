import {useState} from 'react'
import Axios from 'axios'
import $ from 'jquery'
export default function Login () {
    const [userName , setUsername] = useState("");
    const [passWord, setPassword] = useState("");
    const [result,result_list] = useState([]);
    const [societati, societati_list] = useState('');
    const validateEmail = (userName) => {
        return userName.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    function verifyEmail(username){
        if(validateEmail(username)){
            setUsername(username);
            $('#btn-login-form').prop('disabled', false);
        }
        else{
            $('#btn-login-form').prop('disabled', true);
        }
    }
    function adu_societati(){
        Axios.post("http://localhost:3002/api/get/societati").then((data) => {
            societati_list(data.data)
        })
    }
    function submit_login_form(){
        Axios.post("http://localhost:3002/api/get/login",{username: userName, password: passWord }).then((data)=>{
            result_list(data.data)
        });
        adu_societati();
    }
    $(document).on('change', '#societate', function () {
        let id_societate = $("#societate").val();
        localStorage.setItem('id_societate', id_societate);
        //location.reload(true);
    })
    if(result.length != 0){
        if(result[0][0].flag == 0 && result[0][0].mesaj == 'Wrong password!'){
            let mesaj = 'Parola completata este gresita!';
            $("#password").css('border', '1px solid red');
            $(".password-error").html(mesaj).css('display', 'block');
            $('#password').focus();
        }
        else{
            $("#password").css('border', '1px solid #ccc');
            $(".password-error").css('display', 'none');
        }
        if(result[0][0].flag == 0 && result[0][0].mesaj == 'Wrong username!'){
            let mesaj = 'Utilizatorul completat este gresit!';
            $("#username").css('border', '1px solid red');
            $(".email-error").html(mesaj).css('display', 'block');
            $("#username").focus();
        }
        else{
            $("#username").css('border', '1px solid #ccc');
            $(".email-error").css('display', 'none');
        }
        if(result[0][0].flag == 1 && result[0][0].mesaj == 'Success' && result[0][0].count_id_user_info == 1){
            $('#loggedin').val('1');
            localStorage.setItem("loggedin","true");
            let id_user = result[0][0].id_user;
            let name = result[0][0].name
            let username = result[0][0].username;
            let prename = result[0][0].prename
            let id_societate = result[0][0].id_societate;
            localStorage.setItem('id_user', id_user)
            localStorage.setItem("name", name );
            localStorage.setItem("username", username);
            localStorage.setItem('prename', prename);
            localStorage.setItem('id_societate', id_societate);
            location.reload(true);
        }
        else if(result[0][0].flag == 1 && result[0][0].mesaj == 'Success' && result[0][0].count_id_user_info  > 1){
            $('#loggedin').val('1');
            localStorage.setItem("loggedin","true");
            let id_user = result[0][0].id_user;
            let name = result[0][0].name
            let username = result[0][0].username;
            let prename = result[0][0].prename
            let count_societati = result[0][0].count_id_user_info;
            let societati_concat = result[0][0].societati;
            let societati_deconcat = societati_concat.split(',');
            localStorage.setItem('id_user', id_user)
            localStorage.setItem("name", name );
            localStorage.setItem("username", username);
            localStorage.setItem('prename', prename);
            localStorage.setItem('count_societati', count_societati);
            localStorage.setItem('societati_concat', societati_concat);
            $('#societate').removeClass('hidden');
            $('#societate').find('option').remove();
            $('#societate').append($('<option>', { 
                value: '0',
                text : 'Alege o societate' 
            }));
            $.each(societati_deconcat, function (j, societate_deconcat){
                $.each(societati, function (i, societate) {
                    if(societate_deconcat == societate.id_societate){
                        $('#societate').append($('<option>', { 
                            value: societate.id_societate,
                            text : societate.name 
                        }));
                    }
                });
            })
            
        }
    }
    return (
        <div className='login-box'>
            <div className='login-logo'>
                <center>
                    <b>FRAHER</b>
                    <br />
                    <small>HelpDesk</small>
                </center>
            </div>
            <div className='login-box-body'>
                <p className="login-box-msg">Logheaza-te pentru a incepe sesiunea</p>
                <div className="form-group has-feedback">
                    <input type="email" onChange={(e) => {verifyEmail(e.target.value)}} className="form-control w-75" id="username" name="username" placeholder="Email" required/>
                    <span className="glyphicon glyphicon-user form-control-feedback"></span>
                </div>
                <div className="form-group has-feedback">
                    <input type="password" onChange={(e) => {setPassword(e.target.value)}} className="form-control w-75" id="password" name="password" placeholder="Parola" required/>
                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div className="form-group has-feedback">
                    <select className='form-control w-75 hidden' id='societate' required>

                    </select>
                </div>
                <div className="row">
                    <div className="col-xs-7">

                    </div>
                    <div className="col-xs-5">
                        <button type="button" onClick={submit_login_form} id="btn-login-form" className="btn btn-primary btn-block btn-flat" control-id="ControlID-3">Autentificare</button>
                    </div>
                </div>
                <br />
                <div className="information-box round">
                    <div className="callout callout-danger">
                        Va rog frumos introduceti un utilizator si parola pentru logare        
                    </div>
                </div>
            </div>
        </div>
    )
}