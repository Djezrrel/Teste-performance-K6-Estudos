import { browser } from 'k6/browser';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'constant-vus',
      vus: 3,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
    browser_web_vital_fid: ["p(75) <= 100"],
    browser_web_vital_lcp: ["p(75) <= 2500"],
  },
  summaryTrendStats: ["min","med","avg","max","p(75)","p(95)","p(99)"],
};


export default async function () {
    const page = await  browser.newPage();
    //browser.newPage() abre uma nova aba no navegador simulado
  
    try {
      await page.goto('https://test.k6.io/my_messages.php');
        //O script acessa a URL da página de login.
  
      page.locator('input[name="login"]').type('admin');
      page.locator('input[name="password"]').type('123');
  
      const submitButton = page.locator('input[type="submit"]');
  
      await Promise.all([submitButton.click(), page.waitForNavigation()]);
      //Clica no botão de envio (submit) e espera a página carregar após o login.
  
      check(page, {
          header: (p) => p.locator('h2').textContent() == 'Welcome, admin!',
      });

      //Confere se a página carregada contém o texto "Welcome, admin!" no cabeçalho (h2), o que indica que o login foi bem-sucedido.
  
      sleep(1)
    } finally {
      page.close();
    }
  }

  /*


Resumo do que esse script faz:
Abre um navegador (Chromium) e acessa a página de login.
Preenche o formulário de login com usuário admin e senha 123.
Envia o formulário e aguarda o carregamento da página seguinte.
Verifica se o login foi bem-sucedido verificando se aparece "Welcome, admin!" na página.
Simula um tempo de espera e fecha a aba.

*/