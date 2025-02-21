
/*
Criterios:
performance Test
Subida de carga RAMP Up: 10 UV em 10s
Carga 10 VU por 10s
Descida de carga RAMP down: 0 VU em 10s

Limites:
Requisição com sucesso > 95%
Tempo de requisição p(95) < 200

*/

import http from 'k6/http';
import { check,sleep } from 'k6';

//ler dados em json e transoforma em ARRAY
import {SharedArray} from 'k6/data';

export const options ={

    stages:[
        {duration: '10s',target: 10},
        {duration: '10s',target: 10},
        {duration: '10s',target: 0}
    ],
    thresholds:{
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    }
}

//lendo dados json
const data = new SharedArray('Leitura do JSON: ',function(){
    return JSON.parse(open('/LerDadosJson.json')).crocodiles
});


export default function(){

    //pegando valor aleatorios
    const crocodiles = data[Math.floor(Math.random() *  data.length)].id
    
    //vendo id => 
    console.log(crocodiles)

    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodiles}`;

    //requisão get
    const res = http.get(BASE_URL);

    check(res,{
        'status code 200':(r) => r.status === 200
});

    sleep(1)
}