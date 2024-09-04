document.querySelector('#forgetPass').addEventListener('click', forgetPassToken);

function forgetPassToken() {
    Notiflix.Loading.standard();

    const cUserName    = document.getElementById("forgetUser").value;
    const cUserMail    = document.getElementById("forgetMail").value;

    let urlForgetPass = '/createToken';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", 'application/json');

    const dataUser = {
        fName: cUserName,
        fEmail: cUserMail,
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(dataUser),
    }

    fetch(urlForgetPass, requestOptions)
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