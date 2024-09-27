import {isAbsolute, basename, normalize} from "node:path";
import {fileURLToPath} from "url";
import fs from "node:fs";
import chalk from "chalk";
import {table} from "table";
import os from "node:os";

const log = console.log

export function coverageFilter (coverage, root) {
    return coverage.result.filter(({url}) => {
        const finalUrl = url.replace('file://', '')
        return isAbsolute(finalUrl)
            && !finalUrl.includes('node_modules')
            && !finalUrl.includes('.test.js')
            && !finalUrl.includes('.test.ts')
            && normalize(finalUrl).includes(normalize(root))
    }).sort((a, b) => {
        return a.url.localeCompare(b.url)
    })
}

const generateReport = (filename, sourceCode, functions) => {
    const uncoveredLines = []

    for (const cov of functions) {
        for (const range of cov.ranges) {
            if (range.count !== 0) continue
            const startLine = sourceCode.substring(0, range.startOffset).split('\n').length
            const endLine = sourceCode.substring(0, range.endOffset).split('\n').length
            for(let charIndex = startLine; charIndex <= endLine; charIndex++) {
                uncoveredLines.push(charIndex)
            }
        }
    }

    const totalLines = sourceCode.split('\n').length
    const coveredLines = totalLines - uncoveredLines.length

    const _baseName = basename(filename)
    const _fileName = chalk.gray(filename.replace(_baseName, ''))
    const _coveredLinesPercent = Math.round(coveredLines * 100 / totalLines)
    const complete = _coveredLinesPercent === 100

    return [
        _fileName,
        complete ? chalk.green(_baseName) : chalk.red(_baseName),
        (complete ? chalk.green(_coveredLinesPercent) : chalk.red(_coveredLinesPercent)) + " %"
    ]
}

export function createReport (coverage, root) {
    const data = []

    coverageFilter(coverage, root).map(({url, functions}) => {
        const fileName = fileURLToPath(url)
        const sourceCode = fs.readFileSync(fileName, 'utf-8')

        data.push(generateReport(fileName.replace(root, ''), sourceCode, functions))
    })

    const config = {
        singleLine: true,
        columns: [
            {alignment: 'left'},
            {alignment: 'left'},
            {alignment: 'right', width: 10},
        ],
        border: {
            topBody: `─`,
            topJoin: `┬`,
            topLeft: `┌`,
            topRight: `┐`,

            bottomBody: `─`,
            bottomJoin: `┴`,
            bottomLeft: `└`,
            bottomRight: `┘`,

            bodyLeft: `│`,
            bodyRight: `│`,
            bodyJoin: `│`,

            joinBody: `─`,
            joinLeft: `├`,
            joinRight: `┤`,
            joinJoin: `┼`
        }
    };

    log(`\nCoverage report for:`)
    log(chalk.yellow.bold(root))
    log(table(data, config))
}