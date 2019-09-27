const puppeteer = require('puppeteer');
const request_client = require('request-promise-native');
const fs = require('fs');

void (async () => {

    try {
        const browser = await puppeteer.launch(
            {
                headless: false,
                ignoreHTTPSErrors: true
                // , slowMo: 50
            }
        )

        const page = await browser.newPage();

        await page.setRequestInterception(true);

        var cont = 0;

        page.on('request', request => {
            if (request.url().endsWith('.pdf')) {
                request_client({
                    uri: request.url(),
                    encoding: null,
                    headers: {
                        'Content-type': 'applcation/pdf',
                    },
                }).then(response => {
                    var buffer = response;
                    let filename = `./pdfs/arisp-${cont}.pdf`;
                    fs.writeFileSync(filename, buffer); //Save file
                    cont++;
                    request.abort();
                });
            } else {
                request.continue();
            }
        });

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/login');

        await page.click('#username');

        await page.type('#username', 'fiap');

        await page.click('#password');

        await page.type('#password', 'mpsp');

        await page.click('body > div > form > button');
        // Página Inicial ARISP

        var entrarSelector = '#btn-certificacao-digital';
        var autenticarSelector = '#btnAutenticar';

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/arisp/login.html')

        await page.waitForSelector(entrarSelector);

        await page.click(entrarSelector);

        await page.waitForSelector(autenticarSelector);

        await page.click(autenticarSelector);

        // Home depois de autenticado

        var menuSelector = '#liInstituicoes';
        var soliSelector = '#liInstituicoes > div > ul > li:nth-child(3)';

        await page.waitForSelector(menuSelector);
        await page.hover(menuSelector);

        await page.waitForSelector(soliSelector, { visible: true });
        await page.click(soliSelector);

        // Página para selecionar o tipo de pessoa

        var continuarSelector = '#Prosseguir';

        await page.waitForSelector(continuarSelector);
        await page.click(continuarSelector);

        // Página para Selecionar os Municípios

        var selectTodos = '#main > div.form-default > div.contentEditor.consulta-bdlight-holder.grid-12 > div.list-wrap > div > div.selectorAll > div > input[type=checkbox]';
        var cienteSelector = '#chkHabilitar';
        var prosseguirSelector = '#Prosseguir';

        await page.waitForSelector(selectTodos);
        await page.click(selectTodos);

        await page.waitForSelector(cienteSelector);

        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight)
        })

        await page.click(cienteSelector);

        await page.click(prosseguirSelector);

        // Consulta CPF/CNPJ

        var inputCPFCNPJ = '#filterDocumento';
        var pesquisaBotao = '#btnPesquisar';

        await page.waitForSelector(pesquisaBotao);

        await page.type(inputCPFCNPJ, '123123123');
        await page.click(pesquisaBotao);

        // Cartórios

        var todosBotao = '#btnSelecionarTudo';
        var prosseguirBotao = '#btnProsseguir';

        await page.waitForSelector(todosBotao);

        await page.click(todosBotao);
        await page.click(prosseguirBotao);

        await page.waitForSelector('#panelMatriculas');

        var dados = await page.evaluate(() => {
            var tableRows = document.querySelectorAll('#panelMatriculas > tr');
            var array = [];
            tableRows.forEach(tableRow => {
                var cidade = tableRow.querySelector('td:nth-child(1)').innerHTML;
                var cartorio = tableRow.querySelector('td:nth-child(2)').innerHTML;
                var matricula = tableRow.querySelector('td:nth-child(3)').innerHTML;
                array.push({
                    'cidade': cidade,
                    'cartorio': cartorio,
                    'matricula': matricula
                });

                tableRow.querySelector('td:nth-child(4) > a').click();

            })
            return array;
        })

        json = { dados: dados };


        // Agora precicso tratar todas as abas que abriram após clicar em visualizar

        await page.waitFor(2000);

        let pages = await browser.pages();

        var oldLength = await pages.length;

        for (let i = 0; i < pages.length; i++) {

            const page = await pages[i];

            if (i > 1) {

                page.waitForSelector('body > a');
                page.click('body > a');

            }
        }

        // await browser.close();

    } catch (error) {
        console.log(error)
    }
})()