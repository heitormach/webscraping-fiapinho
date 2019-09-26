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

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/sivec/login.html');


        // Primeira Página

        var userSelector = '#nomeusuario';
        var senhaSelector = '#senhausuario';
        var entrarSelector = '#Acessar';

        await page.waitForSelector(entrarSelector);

        await page.type(userSelector, 'teste');
        await page.type(senhaSelector, 'teste');

        await page.click(entrarSelector);

        // Pós Login

        var menuPesqSelector = '#navbar-collapse-1 > ul > li:nth-child(4) > a';
        var pesqReuSelector = '#navbar-collapse-1 > ul > li.dropdown.open > ul > li.dropdown-submenu';
        var porNomeSelector = '#navbar-collapse-1 > ul > li.dropdown.open > ul > li.dropdown-submenu.open > ul > li:nth-child(2) > a';

        await page.waitForSelector(menuPesqSelector);

        await page.click(menuPesqSelector);

        await page.waitForSelector(pesqReuSelector);

        await page.click(pesqReuSelector);

        await page.waitForSelector(porNomeSelector);

        await page.click(porNomeSelector);

        //Pesquisa por Nome

        var nomeFieldSelector = '#idNomePesq';
        var botaoPesqSelector = '#procura';

        await page.waitForSelector(botaoPesqSelector);

        await page.type(nomeFieldSelector, 'teste');

        await page.click(botaoPesqSelector);

        // Tabela Dados

        var rgSelector = '#tabelaPesquisa > tbody > tr:nth-child(1) > td.textotab1.text-center.sorting_1 > a';

        await page.waitForSelector(rgSelector);

        await page.click(rgSelector);

        // await browser.close();

    } catch (error) {
        console.log(error)
    }
})()