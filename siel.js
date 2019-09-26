const puppeteer = require('puppeteer')

void (async () => {

    try {
        const browser = await puppeteer.launch(
            {
                headless: false,
                ignoreHTTPSErrors: true
                // , slowMo: 50
            }
        )

        // Primeira Página
        var searchSelector = '#ctl00_cphContent_frmBuscaSimples_txtPalavraChave';
        var buscaSelector = '#ctl00_cphContent_frmBuscaSimples_pnlBuscaSimples > table > tbody > tr > td.item02 > input[type=submit]'

        const page = await browser.newPage();

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/login');

        await page.click('#username');

        await page.type('#username', 'fiap');

        await page.click('#password');

        await page.type('#password', 'mpsp');

        await page.click('body > div > form > button');

        await page.waitForSelector('body > div > table > tbody > tr:nth-child(10) > td:nth-child(1) > a');

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/siel/login.html');

        // Primeira Página

        var loginInput = 'body > div.canvas > div.conteudo > div.mioloInterna.apps > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]';
        var senhaInput = 'body > div.canvas > div.conteudo > div.mioloInterna.apps > form > table > tbody > tr:nth-child(2) > td:nth-child(2)';
        var btEnviar = 'body > div.canvas > div.conteudo > div.mioloInterna.apps > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type=submit]';

        await page.waitForSelector(btEnviar);

        await page.type(loginInput, 'teste');
        await page.type(senhaInput, 'teste');

        await page.click(btEnviar);

        // Pós Login

        var nomeSelector = 'body > div.canvas > div.conteudo > div.mioloInterna.apps > form.formulario > fieldset:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]';
        var inqueritoSelector = '#num_processo';
        var fecharSelector = '#fechar';
        var buscarSelector = 'body > div.canvas > div.conteudo > div.mioloInterna.apps > form.formulario > table > tbody > tr > td:nth-child(2) > input';

        await page.waitForSelector(buscarSelector);

        await page.type(nomeSelector, 'teste');

        await page.click(inqueritoSelector);

        await page.waitForSelector(fecharSelector);

        await page.click(fecharSelector);

        await page.type(inqueritoSelector, '13123123');

        await page.click(buscarSelector);

        // await browser.close();

    } catch (error) {
        console.log(error)
    }
})()