import chalk from 'chalk'
import { stringify} from "./helpers/json.js";
import matchInArray from "./helpers/match-in-array.js";
import {getFileHash} from "./helpers/hasher.js";
import {realpathSync} from "fs";

const log = console.log

const logExpect = (name, {result, message, expected, received}, duration = 0) => {
    log(`      ${result ? chalk.green('[√] ' + name + ` 🕑 ${chalk.whiteBright(`${duration} ms`)}`) : chalk.red('💀 ' + name + ' (' + message + ')')}`)
    if (!result) {
        log(`        ${chalk.magentaBright('Expected:')} ${chalk.magentaBright.bold(stringify(expected))}`)
        log(`        ${chalk.cyanBright('Received:')} ${chalk.cyanBright.bold(stringify(received))}`)
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

export const runner = async (queue) => {
    const {verbose, test: spec, skip} = global.config
    const startTime = process.hrtime()
    let passedTests = 0
    let failedTests = 0
    let totalTests = 0

    for (const [file, jobs] of queue) {
        const fileHash = await getFileHash(realpathSync(file))
        if (config.skipPassed && global.passed[fileHash]) {
            console.log(chalk.gray(`[-] ${file}`))
            continue
        }

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

                for (const test of describe.it) {
                    let expect = {}

                    if (spec && spec.length) {
                        if (matchInArray (test.name, spec) === false) {
                            continue
                        }
                    }
                    if (skip && skip.length) {
                        if (matchInArray(test.name, skip) === true) {
                            continue
                        }
                    }

                    await setupAndTeardown(test.beforeEach, 'beforeEach')

                    // Execute test function
                    const startTestTime = process.hrtime()

                    try {
                        await test.fn()
                        expect.result = true
                    } catch (error) {
                        expect = {
                            result: false,
                            message: error.message,
                            expected: error.expected,
                            received: error.received,
                        }
                    }

                    const [seconds, nanoseconds] = process.hrtime(startTestTime);
                    const testDuration = (seconds * 1e9 + nanoseconds) / 1e6;

                    if (verbose) {
                        logExpect(test.name, expect, testDuration)
                    }

                    await setupAndTeardown(test.afterEach, 'afterEach')

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

                if (spec && spec.length) {
                    if (matchInArray(test.name, spec ) === false) {
                        continue
                    }
                }
                if (skip && skip.length) {
                    if (matchInArray(test.name, skip ) === true) {
                        continue
                    }
                }

                await setupAndTeardown(test.beforeEach, 'beforeEach')

                try {
                    await test.fn()
                    expect.result = true
                } catch (error) {
                    expect = {
                        result: false,
                        message: error.message,
                        expected: error.expected,
                        received: error.received,
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
            const fileStatus = testFileStatus ? chalk.green('[√] ') : chalk.red('💀 ')
            const testsStatus = `[${chalk.green.bold(testFilePassed)} of ${chalk.red.cyanBright(testFilePassed+testFileFailed)}]`
            const fileName = testFileStatus ? chalk.green(file) : chalk.red(file)
            log(`${fileStatus} ${fileName}... ${testsStatus} 🕑 ${chalk.whiteBright(`${fileDuration} ms`)}`)
        }
        
        if (testFileStatus) {
            global.passed[await getFileHash(file)] = {
                file,
                tests: testFilePassed,
                duration: fileDuration,
            }
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

    return failedTests
}