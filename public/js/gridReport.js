import { Grid } from "https://unpkg.com/gridjs?module";

export function createReport(dataFile) {
    const gridRollTable = new Grid({
        columns: [
                    {name: 'Id',
                     atrributes: {
                        'data-field': 'id'   
                     }},
    
                    {name: 'Total',
                     atrributes: {
                        'data-field': 'total'   
                     }},
    
                     {name: 'Almacen',
                     atrributes: {
                        'data-field': 'almacen'   
                     }},
    
                     {name: 'Papel',
                     atrributes: {
                        'data-field': 'papel'   
                     }},
                 ],
        search: true,
        pagination: {
            limit: 10,
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
    }).render(document.getElementById("gridReport"));
}