import chalk from 'chalk'
import { stringify} from "./helpers/json.js";

const log = console.log

const logExpect = (name, {result, message, expected, actual}, duration = 0) => {
    log(`      ${result ? chalk.green('✅  ' + name + ` 🕑 ${chalk.whiteBright(`${duration} ms`)}`) : chalk.red('💀 ' + name + ' (' + message + ')')}`)
    if (!result) {
        log(`        ${chalk.magentaBright('Expected:')} ${chalk.magentaBright.bold(stringify(expected))}`)
        log(`        ${chalk.cyanBright('Received:')} ${chalk.cyanBright.bold(stringify(actual))}`)
    }
}

const setupAndTeardown = async (funcs, type) => {
    if (funcs && funcs.length) for (const fn of funcs) {
        try {
            await fn()
        } catch (error) {
            log(` The ${type} function throw error with message: ${chalk.red('💀 ' + error.message)}`)
        }
    }
}

export const runner = async (queue, {verbose = false, test: specifiedTest} = {}) => {
    const startTime = process.hrtime()
    let passedTests = 0
    let failedTests = 0
    let totalTests = 0

    for (const [file, jobs] of queue) {
        let startFileTime = process.hrtime()
        let testFileStatus = true
        let testFilePassed = 0
        let testFileFailed = 0

        if (verbose) log(`📜 ${chalk.gray("Test file:")} ${chalk.bold.yellow(file)}...`)

        if (jobs.describes.length) {
            if (verbose) log(`  Tests  Suites ${jobs.describes.length}:`)
            for (const describe of jobs.describes) {
                if (verbose) log(`    ${chalk.blue(describe.name)} (${describe.it.length} tests):`)

                await setupAndTeardown(describe.beforeAll, 'beforeAll')

                for (const it of describe.it) {
                    let expect = {}

                    if (specifiedTest) {
                        if (it.name.match (specifiedTest) === null) {
                            continue
                        }
                    }

                    await setupAndTeardown(it.beforeEach, 'beforeEach')

                    // Execute test function
                    const startTestTime = process.hrtime()

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

                    const [seconds, nanoseconds] = process.hrtime(startTestTime);
                    const testDuration = (seconds * 1e9 + nanoseconds) / 1e6;

                    if (verbose) {
                        logExpect(it.name, expect, testDuration)
                    }

                    await setupAndTeardown(it.afterEach, 'afterEach')

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

                await setupAndTeardown(describe.afterAll, 'afterAll')
            }
        }

        if (jobs.tests.length) {
            if (verbose) log(`  Simple tests ${jobs.tests.length}:`)

            for (const test of jobs.tests) {
                // console.log(test)
                let expect = {}

                if (specifiedTest) {
                    if (test.name.match( specifiedTest ) === null) {
                        continue
                    }
                }

                await setupAndTeardown(test.beforeEach, 'beforeEach')

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
                    logExpect(test.name, expect)
                }

                await setupAndTeardown(test.afterEach, 'afterEach')

                totalTests++
            }
        }

        const [seconds, nanoseconds] = process.hrtime(startFileTime);
        const fileDuration = (seconds * 1e9 + nanoseconds) / 1e6;

        if (!verbose) {
            const fileStatus = testFileStatus ? chalk.green('✅  ') : chalk.red('💀 ')
            const testsStatus = `[${chalk.green.bold(testFilePassed)} of ${chalk.red.cyanBright(testFilePassed+testFileFailed)}]`
            const fileName = testFileStatus ? chalk.green(file) : chalk.red(file)
            log(`${fileStatus} ${fileName}... ${testsStatus} 🕑 ${chalk.whiteBright(`${fileDuration} ms`)}`)
        }
    }

    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = (seconds * 1e9 + nanoseconds) / 1e6;

    log(`------------------------------------`)
    log(`Tests completed in ${chalk.whiteBright.bold(duration)} ms`)
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