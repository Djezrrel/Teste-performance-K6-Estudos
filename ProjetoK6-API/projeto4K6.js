/*

Realizar login com novo user

Criterios: stress test
Ramp up 5UV em 5s
Carga 5UV por 5s
Ramp up 50UV em 2s
Carga de 50 VU em 2s
Ramp down 0 VU em 5s

Limites:
Requisição com falha inferior a 1%

*/

import http, { head } from 'k6/http'
import { check,sleep } from 'k6'
import { SharedArray } from 'k6/data';
//leitor arquivo CSV
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

export const options ={
    stages: [
        {duration: '5s',target:5},
        {duration: '5s',target:5},
        {duration: '2s',target:50},
        {duration: '2s',target:50},
        {duration: '5s',target:0},
    ],
    //limites
    thresholds:{
        http_req_failed: ['rate < 0.01'],
    }
};

//ler dados CSV
const csvData = new SharedArray('Ler dados ',function(){
    return papaparse.parse(open('\UsuariosPegos.csv'),{header: true}).data
})

export default function(){
    const BASE_URL = 'https://test-api.k6.io';

    //gerando email randomico
    const USER = csvData[Math.floor(Math.random() * csvData.length)].email
    const Pass = 'user123'

    const res = http.post(`${BASE_URL}/auth/token/login/`,{

        username: USER,
    
        password: Pass

    



    })
    //mostrando os user que foi gerado
    console.log('User gerado' + USER + Pass)

    check(res,{
        'Sucesso ao Login': (r) => r.status === 200,
        'Token gerado': (r) => r.json('acess') !== '' //vai ser retornado um conteudo no json
    })

    sleep(1)

    }

    //caminho => user/register

    /*
    {
    "username": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": ""
    }

    */

