import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '30s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
  sleep(0.5);
}

/*
Diferença principal: executor: 'per-vu-iterations'

Use per-vu-iterations quando:

Você quer que cada usuário virtual execute um número exato de iterações.
Você quer garantir um comportamento mais previsível por usuário.

Esse executor define que cada VU (usuário virtual) executa um número fixo de iterações.
vus: 10 → O teste usará 10 usuários virtuais simultaneamente.
iterations: 20 → Cada usuário executará exatamente 20 iterações.
Como há 10 usuários, o total de requisições será 10 × 20 = 200.
maxDuration: '30s' → O teste pode durar até 30 segundos, mas se todas as iterações forem concluídas antes, ele finaliza mais cedo.
*/