import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import exec from 'k6/execution';

export let options = {
    scenarios: {
        list_crocodiles: {
            executor: 'constant-arrival-rate',
            rate: 200, // 200 requests por segundo
            timeUnit: '1s',
            duration: '30s',
            preAllocatedVUs: 50,
        },
        search_by_id: {
            executor: 'per-vu-iterations',
            vus: 50, // 50 users
            iterations: 20, // 20 requests por/s
            maxDuration: '1m',
        }
    }
};

const BASE_URL = 'https://test-api.k6.io/public/crocodiles';

export function listCrocodiles() {
    let res = http.get(BASE_URL);
    check(res, {
        'status was 200': (r) => r.status === 200,
    });
    sleep(1);
}

export function searchById() {
    let userId = __VU;
    let crocodileId = userId % 2 === 0 ? 2 : 1;
    let res = http.get(`${BASE_URL}/${crocodileId}`);
    check(res, {
        'status was 200': (r) => r.status === 200,
    });
    sleep(1);
}

export default function () {
    if (exec.scenario.name === 'list_crocodiles') {
        listCrocodiles();
    } else if (exec.scenario.name === 'search_by_id') {
        searchById();
    }
}

/*

Esse código é um teste de carga usando K6 para avaliar o desempenho da API de crocodilos.
Ele executa dois cenários simultaneamente:

Consulta à listagem de crocodilos

Simula 200 requisições por segundo durante 30 segundos.
Usa o executor 'constant-arrival-rate' para manter um fluxo contínuo de requisições.
50 usuários virtuais (VUs) são alocados para essa carga.
Busca por ID de crocodilos

Simula 50 usuários, onde cada um faz até 20 requisições em até 1 minuto.
Usuários pares buscam o crocodilo com ID 2.
Usuários ímpares buscam o crocodilo com ID 1.
Usa o executor 'per-vu-iterations', garantindo que cada usuário execute um número fixo de iterações.
Explicação do código
options: Define os cenários e a estratégia de execução.
listCrocodiles(): Faz uma requisição GET para listar os crocodilos e verifica se o status da resposta é 200.
searchById(): Cada usuário determina se busca pelo ID 1 ou 2, faz a requisição e valida o status da resposta.
default function (): Verifica qual cenário está rodando (exec.scenario.name) e executa a função correspondente.
Como executar

*/