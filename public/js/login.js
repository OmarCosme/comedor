let signup      = document.querySelector('#signup');
let signin      = document.querySelector('#signin');
let body        = document.querySelector('body');
signup.onclick = function(){
    body.classList.add('signup');
}
signin.onclick = function(){
    body.classList.remove('signup');
}

var termCondition = false;

/*---------------------------------------------------------------------------------\
|                    Validación de datos que no esten en blanco                    |
\---------------------------------------------------------------------------------*/

document.querySelector('#idButtonOk').addEventListener('click', termsConditionOk);
document.querySelector('#idButtonNOk').addEventListener('click', termsConditionNok);

function termsConditionOk() {
    termCondition = true;
    location.href='#'
}

function termsConditionNok() {
    termCondition = false;
    location.href='#'
}

/*---------------------------------------------------------------------------------\
|                    Validación de datos que no esten en blanco                    |
\---------------------------------------------------------------------------------*/

function isEmpty(){

    const cUserNameReg         = document.getElementById("userNameReg").value;
    const cUserEmailReg        = document.getElementById("userEmailReg").value;
    const cUserPassReg         = document.getElementById("userPasswordReg").value;
  
    if(termCondition === false){
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        'Error al registrarse',
        'Debes de aceptar la política de privacidad para poder registrarte.',
        'Aceptar',
        );
    } else {
        if(cUserNameReg.trim() === "" || cUserEmailReg.trim() === "" || cUserPassReg.trim() === ""){
            return false
        } else{
            const cUserPassReg         = document.getElementById("userPasswordReg").value;
            const cUserPassConfirmReg  = document.getElementById("userPassConfirmReg").value;
            if (cUserPassReg !== cUserPassConfirmReg){
                Notiflix.Report.failure(
                    'Las contraseñas no coiciden',
                    '',
                    'Aceptar',
                );
            } else {
                return true
            }
        }
    }
}

/*---------------------------------------------------------------------------------\
|                                  Registro de cuenta                              |
\---------------------------------------------------------------------------------*/
document.querySelector('#inputCreateAccount').addEventListener('click', createAccount);

function createAccount() {
    if(isEmpty() === true){
        Notiflix.Loading.standard();
        const cUserNameReg    = document.getElementById("userNameReg").value;
        const cUserEmail      = document.getElementById("userEmailReg").value;
        const cUserPassReg    = document.getElementById("userPasswordReg").value;
        const cAccountActive  = false;

        let urlSignUp = '/signup';

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');

        const dataRegister = {
            uName:      cUserNameReg,
            uEmail:     cUserEmail,
            uPass:      cUserPassReg,
            cAccount:   cAccountActive
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(dataRegister)
        }

        fetch(urlSignUp, requestOptions)
        .then(response => {
            if (!response.ok) {
                //  throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {

            if(data.success === true){
                Notiflix.Loading.remove();
                mensagesOk('Cuenta Registrada', 'Espere a que su cuenta sea activada por el administrador del sistema.')
            } else if(data.success === false){
                Notiflix.Loading.remove();
                Notiflix.Report.failure(
                    'Error al registrarse',
                    data.message,
                    'Aceptar',
                );
            } else {
                Notiflix.Loading.remove();
                Notiflix.Report.failure(
                    'Error',
                    data.message,
                    'Aceptar',
                );
            }
        })
        .catch(error => {
            Notiflix.Loading.remove();
        });

    } else if (isEmpty() === false) {

        Notiflix.Report.failure(
            'Error',
            'Por favor, ingrese los datos requeridos.',
            'Aceptar',
        );
    } else {
    }
}

/*---------------------------------------------------------------------------------\
|                                 Iniciar Sesión                                   |
\---------------------------------------------------------------------------------*/
/*
function abrir() {
    fetch('/report', {
        method: 'GET',
        credentials: 'include' // Esto permite enviar cookies en la solicitud
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.text();
      })
      .then(data => {
        console.log(data); // Aquí puedes manejar la respuesta
        // Después de manejar la respuesta, redirigir a la página deseada
        window.location.href = "/report"; // Cambia la ubicación de la página
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
*/
document.querySelector('#inputLogin').addEventListener('click', signIn);

function signIn() { 
    Notiflix.Loading.standard();

    const cUserName    = document.getElementById("userName").value;
    const cUserPass    = document.getElementById("userPassword").value;

    let urlSignIn = '/loginUser';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", 'application/json');

    const dataUserLogin = {
        sName: cUserName,
        sPass: cUserPass,
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(dataUserLogin),
    }

    fetch(urlSignIn, requestOptions)
    .then(response => {
        if (!response.ok) {
            //  throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then(data => {

        if(data.success === true){
            Notiflix.Loading.remove();

            window.location.href = "/report";

        } else if(data.success === false){
            Notiflix.Loading.remove();
            Notiflix.Report.failure(
                'Error de inicio de sesión',
                data.message,
                'Aceptar',
            );
        } else {
            Notiflix.Loading.remove();
            Notiflix.Report.failure(
                'Error',
                data.message,
                'Aceptar',
            );
        }
    })
    .catch(error => {
        Notiflix.Loading.remove();
    });
}