import chalk from "chalk";

const log = console.log
const dir = console.dir
const deb = console.debug

let passed = 0
let failed = 0

export const showTestsResults = ({suites, simple, config}) => {
    log(`
${chalk.yellow('EasyTest Process...')}
--------------------------------
Include: ${chalk.magenta(typeof config.include === "string" ? config.include : "["+config.include.join(', ')+"]")}
Exclude: ${chalk.gray(typeof config.exclude === "string" ? config.exclude : config.exclude.join(', '))}
--------------------------------    
    `)

    let testComplete = true
    for (let index = 0; index < suites.length; index++) {
        const desc = suites[index]
        for (let it of desc.it) {
            for (let expect of it.expects) {
                if (!expect.result) {
                    testComplete = false
                    break
                }
            }
        }
    }
    if (testComplete) for (let index = 0; index < simple.length; index++) {
        const desc = simple[index]
        for (let it of desc.it) {
            for (let expect of it.expects) {
                if (!expect.result) {
                    testComplete = false
                    break
                }
            }
        }
    }


    const logTitleSuites = !testComplete ? chalk.bgRed : chalk.bgGreen
    log(logTitleSuites(!testComplete ? 'Test chain incomplete' : 'Test chain complete'))

    log(chalk.blue.bold(`\nTest Suites`))

    for (let index = 0; index < suites.length; index++) {
        const desc = suites[index]
        log(chalk.bold(desc.name), `[${desc.duration}ms]`)

        for (let it of desc.it) {
            for (let expect of it.expects) {
                if (expect.result) {
                    passed++
                    log(chalk.green(`[✓] ${it.name} [${it.duration}ms]`))
                } else {
                    failed++
                    log(chalk.red(`[✗] ${it.name} (${expect.name})`))
                    log(chalk.gray(`Expected:`))
                    dir(expect.expected)
                    log(chalk.gray(`Received:`))
                    dir(expect.actual)
                }
            }
        }
    }


    if (simple.length) log(chalk.blue.bold(`Simple Tests`))
    for (let index = 0; index < simple.length; index++) {
        const desc = simple[index]

        for (let it of desc.it) {
            for (let expect of it.expects) {
                if (expect.result) {
                    passed++
                    log(chalk.green(`[✓] ${it.name} [${it.duration}ms]`))
                } else {
                    failed++
                    log(chalk.red(`[✗] ${it.name} ${expect.name}`))
                }
            }
        }
    }

    log(`
--------------------------------
Total Test: ${passed + failed}
Passed: ${chalk.green.bold(passed)}, Failed: ${chalk.red.bold(failed)}
--------------------------------    
    `)
}
