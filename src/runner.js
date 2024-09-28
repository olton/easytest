import chalk from 'chalk'

const log = console.log

export const runner = async (queue, {verbose = false} = {}) => {
    const startTime = process.hrtime()
    let passedTests = 0
    let failedTests = 0
    let totalTests = 0

    log(`${chalk.bold("EasyTest Runner")}`)
    log(`------------------------------------`)
    log(`Copyright (c) 2024 by Serhii Pimenov <serhii@pimenov.com.ua>`)
    log(`You can support EasyTest by PayPal to serhii@pimenov.com.ua`)
    log(`------------------------------------`)

    for (const [file, jobs] of queue) {
        let testFileStatus = true
        let testFilePassed = 0
        let testFileFailed = 0

        if (verbose) log(`${chalk.gray("Test spec:")} ${chalk.bold.yellow(file)}...`)

        if (jobs.describes.length) {
            if (verbose) log(`  Tests  Suites ${jobs.describes.length}:`)
            for (const describe of jobs.describes) {
                if (verbose) log(`    ${chalk.blue(describe.name)} (${describe.it.length} tests):`)

                for (const fn of describe.beforeAll) {
                    await fn()
                }

                for (const it of describe.it) {

                    for (const fn of it.beforeEach) {
                        await fn()
                    }

                    const expect = await it.fn()

                    for (const fn of it.afterEach) {
                        await fn()
                    }

                    if (expect.result) {
                        passedTests++
                        testFilePassed++
                    } else {
                        failedTests++
                        testFileFailed++
                        testFileStatus = false
                    }

                    if (verbose) {
                        log(`      ${expect.result ? chalk.green('✅  ' + it.name) : chalk.red('💀 ' + it.name + ' (' + expect.message + ')')}`)
                        if (!expect.result) {
                            log(`        ${chalk.magentaBright('Expected:')} ${chalk.magentaBright.bold(JSON.stringify(expect.expected))}`)
                            log(`        ${chalk.cyanBright('Received:')} ${chalk.cyanBright.bold(JSON.stringify(expect.actual))}`)
                        }
                    }
                    totalTests++
                }

                for (const fn of describe.afterAll) {
                    await fn()
                }
            }
        }

        if (jobs.tests.length) {
            if (verbose) log(`  Simple tests ${jobs.tests.length}:`)
            for (const test of jobs.tests) {
                const expect = await test.fn()

                if (expect.result) {
                    passedTests++
                    testFilePassed++
                } else {
                    failedTests++
                    testFileFailed++
                    testFileStatus = false
                }

                if (verbose) {
                    log(`    ${expect.result ? chalk.green('✅  ' + test.name) : chalk.red('💀 ' + test.name + ' (' + expect.message + ')')}`)
                    if (!expect.result) {
                        log(`      ${chalk.magentaBright('Expected:')} ${chalk.magentaBright.bold(JSON.stringify(expect.expected))}`)
                        log(`      ${chalk.cyanBright('Received:')} ${chalk.cyanBright.bold(JSON.stringify(expect.actual))}`)
                    }
                }
                totalTests++
            }
        }

        if (!verbose) {
            const fileStatus = testFileStatus ? chalk.green('✅  ') : chalk.red('💀 ')
            const testsStatus = `[${chalk.green.bold(testFilePassed)} of ${chalk.red.cyanBright(testFilePassed+testFileFailed)}]`
            const fileName = testFileStatus ? chalk.green(file) : chalk.red(file)
            log(`${fileStatus} ${fileName}... ${testsStatus}`)
        }
    }

    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = (seconds * 1e9 + nanoseconds) / 1e6;

    log(`------------------------------------`)
    log(`Tests completed in ${chalk.blueBright.bold(duration)}ms`)
    log(`------------------------------------`)
    log(`Total: ${chalk.blue.bold(totalTests)}, Passed: ${chalk.green.bold(passedTests)}, Failed: ${chalk.red.bold(failedTests)}`)
    log(`------------------------------------`)

    if (failedTests > 0) {
        log(chalk.bgRed.bold('💀 Tests chain failed!'))
    } else {
        log(chalk.bgGreen.bold('✅ Tests chain passed! Congrats!'))
    }

    return failedTests > 0 ? 1 : 0
}