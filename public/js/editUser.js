function emptyForm (){

    let nameUpdate          = document.getElementById('uNameUpdate');
    let secondNameUpdate    = document.getElementById('uSecondName');
    let lastNameUpdate      = document.getElementById('uLastName');
    let maternalNameUpdate  = document.getElementById('uMaternalName');
    let areaUpdate          = document.getElementById('uArea');
    let positionUpdate      = document.getElementById('uPosition');
    let constCentersUpdate  = document.getElementById('uCostCenters');
    let paymentMethodUpdate = document.getElementById('uPaymentMethod');

    nameUpdate.value                    = "";
    secondNameUpdate.value              = "";
    lastNameUpdate.value                = "";
    maternalNameUpdate.value            = "";
    areaUpdate.value                    = "";
    positionUpdate.value                = "";
    constCentersUpdate.value            = "";
    paymentMethodUpdate.selectedIndex   = "Seleccione...";

}


function userData (dataUpdate){

    let nameUpdate          = document.getElementById('uNameUpdate');
    let secondNameUpdate    = document.getElementById('uSecondName');
    let lastNameUpdate      = document.getElementById('uLastName');
    let maternalNameUpdate  = document.getElementById('uMaternalName');
    let areaUpdate          = document.getElementById('uArea');
    let positionUpdate      = document.getElementById('uPosition');
    let constCentersUpdate  = document.getElementById('uCostCenters');
    let paymentMethodUpdate = document.getElementById('uPaymentMethod');

    nameUpdate.value            = dataUpdate[0].first_name;
    secondNameUpdate.value      = dataUpdate[0].second_name;
    lastNameUpdate.value        = dataUpdate[0].last_name;
    maternalNameUpdate.value    = dataUpdate[0].maternal_name;
    areaUpdate.value            = dataUpdate[0].area;
    positionUpdate.value        = dataUpdate[0].position;
    constCentersUpdate.value    = dataUpdate[0].cost_centers;

    let valorInicial = dataUpdate[0].payment_method;

    for (let i = 0; i < paymentMethodUpdate.options.length; i++) {
        if (paymentMethodUpdate.options[i].value === valorInicial) {
            paymentMethodUpdate.selectedIndex = i;
          break;
        }
    }
}

function seachPayrollNum (){
    Notiflix.Loading.standard();
    const cPayroll  = document.getElementById("payrollNumber").value;
    const dataForm = {
        regPayroll:         cPayroll,
    }
    const urlRegister = '/searchPayroll';

    var myHeaders = new Headers();
      myHeaders.append("Content-Type", 'application/json');

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(dataForm)
    };

    fetch(urlRegister, requestOptions)
    .then(response => {
        if (!response.ok) {
            //  throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then(data => {

        if(data.success === true){
            Notiflix.Loading.remove();
            userData(data.data)

        } else if(data.success === false){
            Notiflix.Loading.remove();
            messageError("Error", data.message);
        } else {
            Notiflix.Loading.remove();
            console.log("Error 505");
        }
    })
    .catch(error => {
        Notiflix.Loading.remove();
    });
}

function updateDataUser (){
    Notiflix.Loading.standard();

    const cPayroll          = document.getElementById("payrollNumber").value;
    const cNameUpdate       = document.getElementById("uNameUpdate").value;
    const cNdNameUpdate     = document.getElementById("uSecondName").value;
    const cLastName         = document.getElementById("uLastName").value;
    const cMatName          = document.getElementById("uMaternalName").value;
    const cAreaUpdate       = document.getElementById("uArea").value;
    const cPositionUpdate   = document.getElementById("uPosition").value;
    const cCostUpdate       = document.getElementById("uCostCenters").value;
    const cPaymentUpdate    = document.getElementById("uPaymentMethod").value;

    const dataForm = {
        uPayroll:     cPayroll,
        uName:        cNameUpdate,
        uNdName:      cNdNameUpdate,
        uLastName:    cLastName,
        uMatName:     cMatName,
        uArea:        cAreaUpdate,
        uPosition:    cPositionUpdate,
        uCost:        cCostUpdate,
        uPayment:     cPaymentUpdate,
    }
    const urlRegister = '/updateUser';

    var myHeaders = new Headers();
      myHeaders.append("Content-Type", 'application/json');

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(dataForm)
    };

    fetch(urlRegister, requestOptions)
    .then(response => {
        if (!response.ok) {
            //  throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then(data => {

        if(data.success === true){
            Notiflix.Loading.remove();
            emptyForm()
        } else if(data.success === false){
            Notiflix.Loading.remove();
            messageError("Error", data.message);
        } else {
            Notiflix.Loading.remove();
            console.log("Error 505");
        }
    })
    .catch(error => {
        Notiflix.Loading.remove();
    });
}