import chalk from 'chalk'

const log = console.log

export const runner = async (queue, {verbose = false, test: specifiedTest} = {}) => {
    const startTime = process.hrtime()
    let passedTests = 0
    let failedTests = 0
    let totalTests = 0

    for (const [file, jobs] of queue) {
        let testFileStatus = true
        let testFilePassed = 0
        let testFileFailed = 0

        if (verbose) log(`📜 ${chalk.gray("Test spec:")} ${chalk.bold.yellow(file)}...`)

        if (jobs.describes.length) {
            if (verbose) log(`  Tests  Suites ${jobs.describes.length}:`)
            for (const describe of jobs.describes) {
                if (verbose) log(`    ${chalk.blue(describe.name)} (${describe.it.length} tests):`)

                for (const fn of describe.beforeAll) {
                    try {
                        await fn()
                    } catch (error) {
                        log(` The beforeAll function throw error with message: ${chalk.red('💀 ' + error.message)}`)
                    }
                }

                for (const it of describe.it) {
                    let expect = {}

                    if (specifiedTest) {
                        if (it.name.match (specifiedTest) === null) {
                            continue
                        }
                    }

                    for (const fn of it.beforeEach) {
                        try {
                            await fn()
                        } catch (error) {
                            log(` The beforeEach function throw error with message: ${chalk.red('💀 ' + error.message)}`)
                        }
                    }

                    try {
                        expect = await it.fn()
                    } catch (error) {
                        expect = {
                            result: false,
                            message: error.message,
                            expected: null,
                            actual: null,
                        }
                        log(` The it() function throw error with message: ${chalk.red('💀 ' + error.message)}`)
                    }

                    if (verbose) {
                        log(`      ${expect.result ? chalk.green('✅  ' + it.name) : chalk.red('💀 ' + it.name + ' (' + expect.message + ')')}`)
                        if (!expect.result) {
                            log(`        ${chalk.magentaBright('Expected:')} ${chalk.magentaBright.bold(JSON.stringify(expect.expected))}`)
                            log(`        ${chalk.cyanBright('Received:')} ${chalk.cyanBright.bold(JSON.stringify(expect.actual))}`)
                        }
                    }

                    for (const fn of it.afterEach) {
                        try {
                            await fn()
                        } catch (error) {
                            log(` The afterEach function throw error with message: ${chalk.red('💀 ' + error.message)}`)
                        }
                    }

                    if (expect.result) {
                        passedTests++
                        testFilePassed++
                    } else {
                        failedTests++
                        testFileFailed++
                        testFileStatus = false
                    }

                    totalTests++
                }

                for (const fn of describe.afterAll) {
                    try {
                        await fn()
                    } catch (error) {
                        log(` The afterAll function throw error with message: ${chalk.red('💀 ' + error.message)}`)
                    }
                }
            }
        }

        if (jobs.tests.length) {
            if (verbose) log(`  Simple tests ${jobs.tests.length}:`)
            for (const test of jobs.tests) {
                let expect = {}

                if (specifiedTest) {
                    if (test.name.match( specifiedTest ) === null) {
                        continue
                    }
                }

                try {
                    expect = await test.fn()
                } catch (error) {
                    expect = {
                        result: false,
                        message: error.message,
                        expected: null,
                        actual: null,
                    }
                    log(` The test function throw error with message: ${chalk.red('💀 ' + error.message)}`)
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
        log(chalk.bgRed.bold('Tests chain failed!'))
    } else {
        log(chalk.bgGreen.bold('Tests chain passed! Congrats!'))
    }

    return failedTests > 0 ? 1 : 0
}