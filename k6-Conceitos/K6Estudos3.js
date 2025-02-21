import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    //tags => Rotula codigos
    tags:{
      tipo: "meu codigo"
  },

  vus: 5,
  duration: '10s',
}



export default function(){
    //variavel de ambiente
    //const BASE_URL = ('http://test.k6.io')


    const BASE_URL = __ENV.URL;
    const res = http.get(BASE_URL)

    //definir variavel de ambiente pelo console
    // k6 run -e URL='http://test.k6.io' nome do script ex: K6Estudos3.js

    sleep(1);
}
