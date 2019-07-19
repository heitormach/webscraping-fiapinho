const puppeteer = require('puppeteer')
const fs = require('fs')

void (async () => {
    try {
        const browser = await puppeteer.launch(
            {
                headless: false
                // , slowMo: 100
            }
        )

        const page = await browser.newPage()

        await page.goto('file:///E:/Users/heitor.machado/Desktop/Beliz%C3%A1rio/fiap-mpsp-master/arisp/login.html')

        const LOGIN_SELECTOR = '#btnCallLogin'

        const AUTENTICAR_SELECTOR = '#btnAutenticar'

        await page.click(LOGIN_SELECTOR)

        await page.click(AUTENTICAR_SELECTOR)

        await page.waitForSelector('#liInstituicoes > div > ul > li > a')

        const pesquisa = await page.evaluate(() => {
            data = []
            pesquisinha = document.querySelectorAll('#liInstituicoes > div > ul > li > a')

            for (const pesq of pesquisinha) {
                data.push({
                    nome: pesq.innerText,
                    link: pesq.href
                })
            }

            return data
        })

        for (const link of pesquisa) {
            if (link.nome === 'Solicitações') {
                page.goto(link.link)
            }
        }

        await page.waitForSelector('#Prosseguir')

        await page.click('#Prosseguir')

        await page.waitForSelector('#chkHabilitar')

        await page.click('#main > div.form-default > div.contentEditor.consulta-bdlight-holder.grid-12 > div.list-wrap > div > div.selectorAll > div > input[type=checkbox]')

        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight)
        })

        await page.click('#chkHabilitar')

        await page.click('#Prosseguir')

        await page.waitForSelector('#filterDocumento')

        await page.type('#filterDocumento', '21455308005')

        await page.click('#btnPesquisar')

        await page.waitForSelector('#btnSelecionarTudo')

        await page.click('#btnSelecionarTudo')

        await page.click('#btnProsseguir')

        await page.waitForSelector('#panelMatriculas')

        await page.evaluate(() => {
            let data = []
            const seletor = document.querySelectorAll('#panelMatriculas > tr')

            seletor.forEach(selector => {
                const td = selector.querySelectorAll('td')

                for (let index = 0; index < td.length; index++) {
                    const element = td[index];
                    if (element.querySelector('a') !== null) {
                        element.querySelector('a').click()
                    }
                }

            });

            return data
        })

        await page.waitFor(2000)

        let pages = await browser.pages()

        await page.waitFor(1000)

        let source = []
        let viewSource = []

        for (let i = 0; i < await pages.length; i++) {

            if (i > 1) {

                source.push(
                    await pages[i].evaluate(() => {
                        return document.querySelector('body > a > img').src
                    })
                )

            }
        }

        for (let j = 0; j < source.length; j++) {
            viewSource.push(await pages[j].goto(source[j]))
        }

        for (let k = 0; k < await viewSource.length; k++) {
            fs.writeFile(`./screenshots/pic${k}.png`, await viewSource[k].buffer(), (error) => {
                if (error) {
                    console.log(error)
                }
            })
        }

        await browser.close()

    } catch (error) {
        console.log(error)
    }
})()