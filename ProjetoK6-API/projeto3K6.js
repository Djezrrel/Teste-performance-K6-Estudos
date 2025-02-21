/*

//realizar registro de um novo user

Criterio: Performace teste
Carga : 10 UV por 10s

Limites:
Requisição com falha inferior a 1%
Duração da requisição p(95% das req) < 500
Requisição com suscesso superior a 95%
*/

import http from 'k6/http'
import { check,sleep } from 'k6'

export const options ={
    stages: [{duration: '10s',target:10}],
    //limites
    thresholds:{
        checks:['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration:['p(95) < 500']
    }
};

export default function(){
    const BASE_URL = 'https://test-api.k6.io';

    //gerando email randomico
    const USER = `${Math.random()}@mail.com`
    const Pass = 'user123'

    const res = http.post(`${BASE_URL}/user/register`,{

        username: USER,
        first_name: "Crocodilo",
        last_name: "DINO",
        email: USER,
        password: Pass

    



    })
    console.log('User gerado' + USER + Pass)

    check(res,{
        'Sucesso ao registrar': (r) => r.status === 201
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

