const puppeteer = require('puppeteer');
const request_client = require('request-promise-native');
const fs = require('fs');

void (async () => {

    try {
        const browser = await puppeteer.launch(
            {
                headless: true
                // , slowMo: 50
            }
        )

        // Primeira Página
        var searchSelector = '#ctl00_cphContent_frmBuscaSimples_txtPalavraChave';
        var buscaSelector = '#ctl00_cphContent_frmBuscaSimples_pnlBuscaSimples > table > tbody > tr > td.item02 > input[type=submit]'

        const page = await browser.newPage();

        await page.setRequestInterception(true);

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
                    let filename = './pdfs/jucesp.pdf';
                    fs.writeFileSync(filename, buffer); //Save file
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

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/jucesp/index.html');

        await page.waitForSelector(searchSelector);

        await page.type(searchSelector, 'Teste');

        await page.click(buscaSelector);

        // Captcha

        var captchaSelector = '#formBuscaAvancada > table > tbody > tr:nth-child(1) > td > div > div:nth-child(2) > label > input';
        var botaoContinuar = '#formBuscaAvancada > table > tbody > tr:nth-child(2) > td > input';

        await page.waitForSelector(captchaSelector);

        await page.type(captchaSelector, 'blablabla');

        await page.click(botaoContinuar);

        // Lista Pesquisa

        var resultSelector = '#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lbtSelecionar';

        await page.waitForSelector(resultSelector);

        await page.click(resultSelector);

        // Dados Empresa

        await page.waitForSelector('#ctl00_cphContent_frmPreVisualiza_lblEmpresa');

        var dados = await page.evaluate(() => {
            var functionCNPJ = function (cnpj) {
                return cnpj.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');
            }

            var data = {
                nomeEmpresa: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblEmpresa').innerHTML,
                tipoEmpresa: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblDetalhes').innerHTML,
                dataConstituicao: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblConstituicao').innerHTML,
                dtIniAtiv: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblAtividade').innerHTML,
                cnpj: functionCNPJ(document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblCnpj').innerHTML),
                ie: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblInscricao').innerHTML,
                objeto: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblObjeto').innerHTML,
                capital: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblCapital').innerHTML,
                endereco: {
                    logradouro: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblLogradouro').innerHTML,
                    numero: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblNumero').innerHTML,
                    complemento: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblComplemento').innerHTML,
                    bairro: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblBairro').innerHTML,
                    municipio: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblMunicipio').innerHTML,
                    cep: functionCNPJ(document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblCep').innerHTML),
                    uf: document.querySelector('#ctl00_cphContent_frmPreVisualiza_lblUf').innerHTML
                }
            }

            return data;

        });

        console.log(dados);

        await page.click('#ctl00_cphContent_frmPreVisualiza_UpdatePanel2 > input');

        await browser.close();

    } catch (error) {
        console.log(error)
    }
})()