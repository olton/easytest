import chalk from "chalk";

const log = console.log
const dir = console.dir
const deb = console.debug

export const showTestsResults = ({passed, failed, suites, simple, config}) => {
    log(`
${chalk.yellow('EasyTest Process...')}
--------------------------------
Include: ${chalk.magenta(typeof config.include === "string" ? config.include : "["+config.include.join(', ')+"]")}
Exclude: ${chalk.gray(typeof config.exclude === "string" ? config.exclude : config.exclude.join(', '))}
--------------------------------    
Total Test: ${passed + failed}
Passed: ${chalk.green.bold(passed)}, Failed: ${chalk.red.bold(failed)}
    `)

    const logTitleSuites = failed > 0 ? chalk.bgRed : chalk.bgGreen
    log(logTitleSuites(failed > 0 ? 'Test chain incomplete' : 'Test chain complete'))

    log(chalk.blue.bold(`\nTest Suites`))

    for (let index = 0; index < suites.length; index++) {
        const desc = suites[index]
        log(chalk.bold(desc.name), `[${desc.duration}ms]`)

        for (let it of desc.it) {
            for (let expect of it.expects) {
                if (expect.result) {
                    log(chalk.green(`  [✓] ${it.name} [${it.duration}ms]`))
                } else {
                    log(chalk.red(`  [✗] ${it.name} (${expect.name})`))
                    log(chalk.gray(`Expected`))
                    deb(expect.expected)
                    log(chalk.gray(`Actual`))
                    deb(expect.actual)
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
                    log(chalk.green(`  [✓] ${it.name} [${it.duration}ms]`))
                } else {
                    log(chalk.red(`  [✗] ${it.name} ${expect.name}`))
                }
            }
        }
    }

}