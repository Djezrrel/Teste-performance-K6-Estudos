import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 200,
      maxDuration: '30s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
  sleep(0.5);
}

/*
scenarios: Define como o teste será executado.
contacts: Nome do cenário de teste.
executor: 'shared-iterations': Indica que o número total de iterações será distribuído entre os usuários virtuais (VUs).
vus: 10: Define que haverá 10 usuários virtuais (VUs) simulando acessos simultâneos.
iterations: 200: O total de requisições HTTP que será feito (200 requisições no total).
maxDuration: '30s': Define um tempo máximo de execução de 30 segundos.

Quando usar cada um?
✅ Use shared-iterations quando:

Você quer garantir um número total de requisições, independentemente de quantos usuários estão ativos.
O tempo de execução pode ser flexível.


Resumo
Simula 10 usuários virtuais acessando o site.
Executa um total de 200 requisições distribuídas entre os usuários.
Aguarda 0.5s entre cada requisição para simular um comportamento mais realista.
O teste roda por até 30 segundos, mas pode terminar antes se atingir as 200 iterações.
Aguarda 0.5 segundos antes da próxima iteração para simular um usuário real.
*/
