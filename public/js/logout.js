function logout() { 
    Notiflix.Loading.standard();

    let urlLogout = '/logout';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", 'application/json');

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
    }

    fetch(urlLogout, requestOptions)
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
                'Error',
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