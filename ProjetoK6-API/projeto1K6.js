/*
Public API

Criterio: Smoke test
1 user por 30s

Limites:
requisição com sucesso > 99%

*/

import http from 'k6/http';
import { check } from 'k6';

export const options ={

    vus: 1,
    duration: '30s',
    thresholds:{
        checks: ['rate > 0.99']
    }
}

export default function(){
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';

    //requisão get
    const res = http.get(BASE_URL);

    check(res,{
        'status code 200':(r) => r.status === 200
});
}