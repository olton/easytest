import chalk from 'chalk'

const log = console.log

export const runner = async (queue) => {
    const startTime = process.hrtime()
    let passedTests = 0
    let failedTests = 0
    let totalTests = 0

    for (const [file, jobs] of queue) {
        log(`${chalk.gray("Test spec:")} ${chalk.bold.yellow(file)}...`)

        if (jobs.describes.length) {
            log(`  Tests  Suites ${jobs.describes.length}:`)
            for (const describe of jobs.describes) {
                log(`    ${chalk.blue(describe.name)} (${describe.it.length} tests):`)
                for (const it of describe.it) {

                    const expect = await it.fn()

                    if (expect.result) {
                        passedTests++
                    } else {
                        failedTests++
                    }

                    log(`      ${expect.result ? chalk.green('[√] '+it.name) : chalk.red('[✗] '+it.name + ' (' + expect.name + ')')}`)
                    if (!expect.result) {
                        log(`        ${chalk.magentaBright('Expected:')} ${chalk.magentaBright.bold(JSON.stringify(expect.expected))}`)
                        log(`        ${chalk.cyanBright('Received:')} ${chalk.cyanBright.bold(JSON.stringify(expect.actual))}`)
                    }
                    totalTests++
                }
            }
        }

        if (jobs.tests.length) {
            log(`  Simple tests ${jobs.tests.length}:`)

        }
    }

    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = (seconds * 1e9 + nanoseconds) / 1e6;

    log(`------------------------------------`)
    log(`Tests completed in ${duration}ms`)
    log(`------------------------------------`)
    log(`Total: ${chalk.blue.bold(totalTests)}, Passed: ${chalk.green.bold(passedTests)}, Failed: ${chalk.red.bold(failedTests)}`)
    log(`------------------------------------`)
}