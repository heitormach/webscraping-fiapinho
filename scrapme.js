// Carregando Puppeteer
const puppeteer = require('puppeteer')

// Esta parte significa "Execute imediatamente este código"
void (async () => {
    // Wrapper para pegar erros
    try {
        // Cria uma instância de browser
        const browser = await puppeteer.launch(
            {
                headless: false,
                slowMo: 250 // slow down by 250ms
            }
        )

        // Cria uma página dentro do browser
        const page = await browser.newPage()

        // Navegando até o website
        await page.goto('https://scrapethissite.com/pages/forms/')

        // Tira uma screenshot da página e salva
        // em /screenshots/page1.png
        await page.screenshot({
            path: './screenshots/page1.png'
        })

        // Gera um PDF da da página e salva em
        // /pdfs/page1.pdf
        // await page.pdf({ path: './pdfs/page1.pdf' })

        // Pega informações de time
        const teams = await page.evaluate(() => {
            // Uma função para reutilização de código
            // Pega o TD, o texto e remove espaços em branco remanescentes
            const grabFromRow = (row, classname) => row
                .querySelector(`td.${classname}`)
                .innerText
                .trim()

            // Nossos seletores
            const TEAM_ROW_SELECTOR = 'tr.team'

            // Armazenaremos nossos dados em um array de objetos
            const data = []

            // Pega todas as linhas de times
            const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR)

            // Faz um loop para cada linha de time, criando objetos
            for (const tr of teamRows) {
                data.push({
                    name: grabFromRow(tr, 'name'),
                    year: grabFromRow(tr, 'year'),
                    wins: grabFromRow(tr, 'wins'),
                    losses: grabFromRow(tr, 'losses')
                })
            }

            // Manda os dados de volta para a variável de times
            return data
        })

        // Log no console para testar
        // console.log(JSON.stringify(teams, null, 2))

        // Agora quero salvar as informações em JSON
        const fs = require('fs')

        fs.writeFile(
            './json/teams.json',
            JSON.stringify(teams, null, 2), // Opcional, para deixar formatado
            (err) => err ? console.log('Dados não gravados!', err) : console.log('Dados gravados')
        )

        // Tudo certo, feche o browser
        await browser.close()

    } catch (error) {
        // Se alguma coisa der errado
        // exibe a mensagem de erro no console
        console.log(error)
    }
})()