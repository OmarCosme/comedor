function validateDate() {
    const cDateStart = new Date(document.getElementById("checkDateStart").value);
    const cDateEnd = new Date(document.getElementById("checkDateEnd").value);

    if (cDateStart <= cDateEnd) {
        return true;
    } else {
        return false;
    }
}

function seachTickets() {
    Notiflix.Loading.standard();
    const dateFunction = validateDate()

    if(dateFunction === true){
        const payrollNumber     = document.getElementById("checkPayrollNumber").value;
        const cDateStart        = document.getElementById("checkDateStart").value;
        const cDateEnd          = document.getElementById("checkDateEnd").value;

        const dataForm = {
            tPayroll: payrollNumber,
            tDateStar: cDateStart,
            tDateEnd:  cDateEnd
        }
        const urlTicket = '/seachTicket';
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", 'application/json');

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(dataForm)
        };

        fetch(urlTicket, requestOptions)
        .then(response => {
            if (!response.ok) {
                //  throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            if(data.success === true){
                Notiflix.Loading.remove();
                gridTicket(data.data);

            } else if(data.success === false){
                Notiflix.Loading.remove();
                Notiflix.Report.failure(
                    'No hay datos disponibles',
                    data.message,
                    'Aceptar',
                );
                const tablaReporte = document.getElementById('gridReport');
                tablaReporte.innerHTML = '';
            } else {
                Notiflix.Loading.remove();
                console.log("Error 505");
            }
        })
        .catch(error => {
            Notiflix.Loading.remove();
        });
    } else if (dateFunction === false){
        Notiflix.Loading.remove();
        Notiflix.Report.failure(
        'Error en Fechas',
        'Por favor, valide el rango de fecha. La fecha de inicio no puede ser mayor que la fecha final.',
        'Aceptar',
        );
    } else {

    }
}


function gridTicket(dataTicket) {
    const tablaReporte = document.getElementById('gridTickets');
    tablaReporte.innerHTML = '';

    const dataFile = [];
    var estado;
    var num = 0;

    for (let iCiclo = 0; iCiclo < dataTicket.length; iCiclo ++) {

        const nomina = dataTicket[iCiclo].cod_payroll_number
        const ticket = dataTicket[iCiclo].number_ticket
        const fecha = dataTicket[iCiclo].to_char
        const hora  = dataTicket[iCiclo].hour_reg 
        const precio  = dataTicket[iCiclo].price
        const check  = dataTicket[iCiclo].check_in 

        if (check === "1"){
            estado = "Aplicado"
        } else {
            estado = "Cancelado"
        }

        num = num + 1

        const row = {
            num,
            ticket,
            fecha,
            hora,
            precio,
            estado
        };
        dataFile.push(row);
    }

    const gridReport = new gridjs.Grid({
        columns: [
                    {name: 'Num',
                    atrributes: {
                        'data-field': 'num'   
                    }},
                    {name: 'Ticket',
                     atrributes: {
                        'data-field': 'ticket'   
                     }},
    
                     {name: 'Fecha',
                     atrributes: {
                        'data-field': 'fecha'   
                     }},

                     {name: 'Hora',
                     atrributes: {
                        'data-field': 'hora'   
                     }},
    
                     {name: 'Precio',
                     atrributes: {
                        'data-field': 'precio'   
                     }},

                     {name: 'Estado',
                        atrributes: {
                        'data-field': 'estado'   
                    }}
                 ],
        search: true,
        pagination: {
            limit: 15,
            summary: false
          },
        data: () => {
            return new Promise(resolve => {
              setTimeout(() =>
                resolve(dataFile), 2000);
            });
          },
          style: {
            table: {
                border: '3px solid #2A82C4'
            },
            th: {
                'background-color': 'rgba(43, 130, 196)',
                color: '#FFFFFF',
                'border-bottom': '3px solid #2A82C4',
                'text-align': 'center',
            },
            td: {
                'text-align': 'center'
            },
            footer:{
              border: '3px solid #45A0E6',
            }
        },
    
        language: {
            'search': {
              'placeholder': '🔍 Buscar...'
            },
              'pagination': {
              'previous': 'Anterior',
              'next': 'Siguiente',
              'results': 'Records 1000'
            }
        },
    }).render(document.getElementById("gridTickets"));

    gridReport.updateConfig({
        data: () => {
          return new Promise(resolve => {
            setTimeout(() =>
              resolve(dataFile), 2000);
          });
        },
    }).forceRender(); 
}