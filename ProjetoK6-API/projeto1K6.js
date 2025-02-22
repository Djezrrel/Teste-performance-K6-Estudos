/*
Public API

Criterio: Smoke test
1 user por 30s

Limites:
requisição com sucesso > 99%

*/

import http from 'k6/http';
import { check } from 'k6';

//importando relatorio
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


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

//gerando relatorio HTML
// export function handleSummary(data) {
//     return {
//       "teste_k6.html": htmlReport(data),
//     };
//   }

  //gerando DashBorad terminal
  // $ K6_WEB_DASHBOARD=true nome do arqv || K6_WEB_DASHBOARD=true  K6_WEB_DASHBOARD_EXPORT=Relatorio.HTML k6 run projeto1K6.js
  // http://localhost:5665