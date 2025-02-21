import http from 'k6/http';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 30,
      timeUnit: '1s',
      preAllocatedVUs: 50,
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}

/*
Como funciona constant-arrival-rate?
Esse executor controla a taxa de chegada de requisições, em vez de limitar o número de usuários ativos.

executor: 'constant-arrival-rate' → Mantém uma taxa fixa de requisições, sem depender do número de VUs.
duration: '30s' → O teste dura 30 segundos.
rate: 30 → O k6 gera 30 novas requisições por segundo.
timeUnit: '1s' → A taxa de 30 requisições por segundo é mantida durante todo o teste.
preAllocatedVUs: 50 → Reserva até 50 usuários virtuais para processar as requisições.

Como esse teste se comporta?
O k6 gera 30 requisições por segundo, independentemente do tempo de resposta do servidor.
Como o teste dura 30 segundos, o total de requisições será:

uando usar constant-arrival-rate?
✅ Use constant-arrival-rate quando:

Você precisa simular um tráfego constante em um site ou API, semelhante ao de um sistema real.
Quer garantir que o servidor aguente um número exato de requisições por segundo.
Está testando limites de taxa (rate limiting) ou sistemas de escalabilidade.
➡️ Esse é o melhor executor para simular cargas previsíveis, como picos de acesso em um site.

📌 Cálculo das requisições:
30 req/s × 30s = 900 requisições no total

O k6 usará até 50 VUs para garantir essa taxa. Se 50 VUs forem insuficientes, pode ser necessário aumentar esse número.

*/