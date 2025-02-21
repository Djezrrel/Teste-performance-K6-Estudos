
//importando modulo nativo da ferramenta
import http from 'k6/http'

//importando modulo remoto que seja Otmizado,evita modulos NPM 

//import {AWSConfig,S3Client} from 'https://jslib.k6.io/aws/0.4.0/s3.js'

//Modulos locais

//import runTest from '../teste.js'


//verificação de status
import { check, group } from 'k6'

//metricas personalizadas
import {Counter,Gauge,Rate,Trend} from 'k6/metrics'

//contador
const chamadas = new Counter('QTdchamadas')
//medidor
const Medicao = new Gauge('TempBlock')
//taxa
const Req = new Rate("TaxaReq") //quantas Req tiveram status..
//tendendica
const Tendencia = new Trend("TaxaEspr")

//precisa criar uma constante p/metricas




export const options = {

      //tags => Rotula codigos
      tags:{
        tipo: "meu codigo"
    },

    //carga de 1 user por 3s
    vus: 1,
    duration: '3s',

    //thresholds || criterios  de aprovação ou reprovação
    thressolds:{     
        http_req_failed:['rate < 0.01'], //definiçao de limite sobre as req com falhas,quero q seja inferior a:
        http_req_duration:[{threshold: 'p(95) < 200', abortOnFail: true,delayAbortEval: '10'}],//duracao da req|  95% das req tem que estar abaixo de 200,se nao atingir e abortado
        checks: ['rate > 0.99'], //taxa de verificao bem sucedida tem que ser > 90%

        //metrica personalizada com base no seu grupo
        //limite determinado para um grupo
        'http_req_duration{group:::Verificacao de metricas}': ['p(95) < 500'],

        //limite que avalia somente a tag
        'http_req_duration{tipo:Status}': ['p(95) < 100'],
    
    } 

}



//funçao para realizar testes
export default function(){

       //consultando a requisição
       const res = http.get('http://test.k6.io')

    //groups organização de Scripts || identifcador,destinguir metodos
    group('verificação de status',function(){

        //tags => Rotula codigos
        tags:{
            tipo: "Status"
        }

        //checando status code
    check(res,{
        'status code é 200': (r) => r.status === 200
        //verifica se retornou certo
    })
  })
 
  group("Verificao de metricas", function() {

       //metricas
       chamadas.add(1)
       Medicao.add(res.timings.blocked) //acessando a requisição || e acessando TIMINGS que tem sobre o temp de bloqueio
       Req.add(res.status === 200) //Quantas requisições tiveram status ===
       Tendencia.add(res.timings.waiting) //quanto tempo a Req ficou esperando p/ser realizada

   });

}