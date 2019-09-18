const puppeteer = require('puppeteer')

void (async () => {

    try {
        const browser = await puppeteer.launch(
            {
                headless: true,
                ignoreHTTPSErrors: true
                // , slowMo: 50
            }
        )

        // Primeira Página
        var entrarSelector = '#ctl00_conteudoPaginaPlaceHolder_loginControl_loginButton';
        var consultasSelector = '#ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperiorn1 > table > tbody > tr > td > a'
        var cadastrosSelector = '#ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperiorn8 > td > table > tbody > tr > td > a'

        const page = await browser.newPage();

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/login');

        await page.click('#username');

        await page.type('#username', 'fiap');

        await page.click('#password');

        await page.type('#password', 'mpsp');

        await page.goto('http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/cadesp/login.html')

        await page.waitForSelector(entrarSelector);

        await page.type('#ctl00_conteudoPaginaPlaceHolder_loginControl_UserName', 'fiap');

        await page.type('#ctl00_conteudoPaginaPlaceHolder_loginControl_Password', 'mpsp');

        await page.click(entrarSelector);

        await page.waitForSelector(consultasSelector);

        await page.hover(consultasSelector);

        await page.click(cadastrosSelector);

        // Consulta Cadastros
        var selectCnpjSelector = '#ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_lstIdentificacao';
        var inputCnpj = '#ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_txtIdentificacao';
        var botaoConsultaSelector = '#ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_btnConsultarEstabelecimento';

        await page.waitForSelector(selectCnpjSelector);

        await page.select(selectCnpjSelector, '2');

        await page.type(inputCnpj, '12312312312');

        await page.waitForSelector(botaoConsultaSelector);

        await page.click(botaoConsultaSelector);

        await page.waitForSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)');

        var data = await page.evaluate(() => {
            var functionCNPJ = function (cnpj) {
                return cnpj.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');
            }

            var replaceEspaco = function (string) {
                return string.replace(/\t/g, '').replace(/\n/g, '');
            }

            var docSelector = function (seletor) {
                return document.querySelector(seletor).innerHTML;
            }

            seletorSpanSit = '#ctl00_conteudoPaginaPlaceHolder_dlCabecalho_ctl00_Label161';
            seletorSpanData = '#ctl00_conteudoPaginaPlaceHolder_dlCabecalho_ctl00_Label162';
            seletorSpanRegime = '#ctl00_conteudoPaginaPlaceHolder_dlCabecalho_ctl00_Label163';
            seletorSpanPosto = '#ctl00_conteudoPaginaPlaceHolder_dlCabecalho_ctl00_Label2'
            var deleteSpan = function (selector) {
                document.querySelector(selector).parentNode.removeChild(document.querySelector(selector));
            }

            deleteSpan(seletorSpanData);
            deleteSpan(seletorSpanPosto);
            deleteSpan(seletorSpanRegime);
            deleteSpan(seletorSpanSit);

            var dados = {
                cabecalho: {
                    nomeEmpresa: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)')),
                    cnpj: replaceEspaco(functionCNPJ(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2)'))),
                    ie: replaceEspaco(functionCNPJ(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)'))),
                    drt: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(2)')),
                    situacao: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(3)')).replace('&nbsp;', ''),
                    dataInscricao: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(3)')).replace('&nbsp;', ''),
                    regime: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3)')).replace('&nbsp;', ''),
                    posto: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(3)')).replace('&nbsp;', '')
                },
                geral: {
                    nomeFantasia: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.dadoDetalhe')),
                    cnpj: replaceEspaco(functionCNPJ(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)'))),
                    ie: replaceEspaco(functionCNPJ(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(2)'))),
                    nire: replaceEspaco(functionCNPJ(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral_ctl01_lnkNire'))),
                    sitCadastral: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(7) > td:nth-child(2)')),
                    ocorrenciaFiscal: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8) > td:nth-child(2)')),
                    tipoUnidade: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(10) > td:nth-child(2)')),
                    dtInscricaoEstado: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(4)')),
                    dtInicioIE: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(4)')),
                    dtInicioSituacao: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(7) > td:nth-child(4)')),
                    formasAtuacao: replaceEspaco(docSelector('#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral_ctl01_dlEstabelecimentoFormasAtuacao > tbody > tr > td > table > tbody > tr > td'))
                }
            }

            return dados;
        });

        await browser.close();

    } catch (error) {
        console.log(error)
    }
})()