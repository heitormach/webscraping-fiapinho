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

        var nascSelector = '#n';
        var procSelector = '#principal > div > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]';
        var varaSelector = '#vara_juiz_id';
        var buscaSelector = '#wrapper > ul > li.item3 > ul > li:nth-child(1) > a';
        var entrarSelector = '#main > div.container > div:nth-child(2) > div:nth-child(2) > div > a';
        var crcSelector = '#wrapper > ul > li.item3 > a';
        var pesqSelector = '#btn_pesquisar';
        const page = await browser.newPage()

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/login');

        await page.click('#username');

        await page.type('#username', 'fiap');

        await page.click('#password');

        await page.type('#password', 'mpsp');

        await page.click('body > div > form > button');

        await page.waitForSelector('body > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a');

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/arpensp/login.html')

        await page.waitForSelector(entrarSelector);

        await page.click(entrarSelector);

        await page.waitForSelector(crcSelector);

        await page.click(crcSelector);

        setTimeout(() => {
            page.click(buscaSelector);
        }, 1000);

        await page.waitForSelector(nascSelector);

        await page.click(nascSelector);

        await page.click(procSelector);

        await page.type(procSelector, '1234567890');

        await page.select(varaSelector, '297');

        await page.click(pesqSelector);

        var cartorioSelector = '#principal > div > form > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2) > b'

        await page.waitForSelector(cartorioSelector)

        var dados = await page.evaluate(() => {

            const dados = {
                cartorio: document.querySelector('#principal > div > form > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2) > b').innerHTML,
                cns: document.querySelector('#principal > div > form > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2) > b').innerHTML,
                conjuge1: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(2) > td:nth-child(2)').innerHTML,
                conjuge1Casamento: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(3) > td:nth-child(2)').innerHTML,
                conjuge2: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(4) > td:nth-child(2)').innerHTML,
                conjuge2Casamento: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(5) > td:nth-child(2)').innerHTML,
                dataCasamento: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(6) > td:nth-child(2)').innerHTML,
                dadosCasamento: {
                    matricula: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(8) > td:nth-child(2) > b').innerHTML,
                    dataEntrada: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(9) > td:nth-child(2) > b').innerHTML,
                    dataRegistro: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(10) > td:nth-child(2)').innerHTML,
                    acervo: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(10) > td:nth-child(2)').innerHTML,
                    numLivro: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(12) > td:nth-child(2)').innerHTML,
                    numFolha: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(13) > td:nth-child(2)').innerHTML,
                    numRegistro: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(14) > td:nth-child(2)').innerHTML,
                    tipoLivro: document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(15) > td:nth-child(2) > b').innerHTML
                },
            }

            return dados;

        })

        console.log(dados);

        await browser.close()

    } catch (error) {
        console.log(error)
    }
})()