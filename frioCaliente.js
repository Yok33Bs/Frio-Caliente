//----------Funciones-------//
//numero al azar
const azar = dimension => Math.floor(Math.random() * dimension); 

const createTamano = () => ({
    x: azar($('#mapa')[0].width),
    y: azar($('#mapa')[0].height)
});

let _tesoro = createTamano() ;

//Calcula distancia con teorema de Pitagoras
const distancia = (event, tesoro) => {
    
    const difX = event.offsetX - tesoro.x;
    const difY = event.offsetY - tesoro.y;
    
    return Math.sqrt((difX * difX) + (difY * difY));
};

//reiniciar
const refresh = () =>{
    clicks = 0;
    _tesoro = createTamano() ;
    $('#distancia').text('');
    $('#clicks').text('');
    
}

//Apoyo
const guia = (distancia)=>{
    if(distancia < 25) return 'Quemado';
    if(distancia < 80) return 'Muy caliente';
    if(distancia < 170) return 'Caliente';
    if(distancia < 250) return 'Tibio';
    if(distancia < 320) return 'Frio';
    if(distancia < 500) return 'Muy frio';
    if(distancia < 600) return 'Congelado';
};

//traer y almacenar puntajes
const getStorage = key => JSON.parse( localStorage.getItem(key) ) ;
const setStorage = (key, value) => localStorage.setItem(key,JSON.stringify(value)) ;

let records = getStorage('records') ||[];
const addRecordsStorage = player => { 
    records.push(player);
    setStorage('records' , records);
};

//Puntuaciones Altas
const showRecords = () =>{
    let tr ='';
    records.sort((a,b)=> a.clicks-b.clicks)
    for(let i = 0; i < 5; i++){
        const {nombre,clicks} = records[i];
        tr +=`
            <tr>
                <td>${i+1}</td>
                <td>${nombre}</td>
                <td>${clicks}</td>
            </tr>`;
    };
    $('#Bester').html(tr)
}
//----------Variables----------//
let clicks = 0;

//----------DOM----------/
$('#mapa').click((event) => {

    clicks++;
    const diferencia = distancia(event,_tesoro)
    const ayuda = guia(diferencia)

    $('#distancia').text(ayuda)
    $('#clicks').text(clicks)
            
    if(diferencia <= 20){

        alert(`Eres muy habíl, lo encontraste en tan solo ${clicks} clicks`)
        const nombre = prompt('¿Cual es tu nombre?')
        addRecordsStorage({nombre,clicks})
        
    };
});

$('#tablaRecords').change(showRecords());