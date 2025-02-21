import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
  sleep(0.5);
}


/*
Como funciona constant-vus?
executor: 'constant-vus' → Mantém 10 usuários virtuais (VUs) ativos durante todo o teste.
vus: 10 → 10 usuários rodando simultaneamente.
duration: '30s' → O teste será executado por 30 segundos.

Use constant-vus quando:

Você quer manter uma carga estável de usuários simultâneos.
Precisa medir o comportamento do sistema sob carga constante.
Quer avaliar taxas de erro, tempos de resposta e estabilidade sob tráfego contínuo.

Como esse teste se comporta?
Como temos 10 VUs rodando ao mesmo tempo, e cada um faz uma requisição a cada 0.5 segundos, podemos estimar a quantidade de requisições:
Cálculo das requisições
📌 Cada VU faz aproximadamente 2 requisições por segundo (1 requisição + 0.5s de espera).
📌 Com 10 VUs, teremos 10 × 2 = 20 requisições por segundo.
📌 Em 30 segundos, teremos 20 × 30 = 600 requisições no total.

*/