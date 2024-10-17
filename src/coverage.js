import {basename, isAbsolute, normalize} from "node:path";
import {fileURLToPath} from "url";
import fs from "node:fs";
import chalk from "chalk";
import {table} from "table";

const log = console.log

export function coverageFilter (coverage) {
    const {root} = global.config
    return coverage.result.filter(({url}) => {
        const finalUrl = url.replace('file:///', '')
        return isAbsolute(finalUrl)
            && !finalUrl.includes('node_modules')
            && !finalUrl.includes('.test.js')
            && !finalUrl.includes('.test.ts')
            && normalize(finalUrl).replaceAll("%20", " ").includes(normalize(root).replaceAll("%20", " "))
    }).sort((a, b) => {
        return a.url.localeCompare(b.url)
    })
}

export const generateReport = (filename, sourceCode, functions) => {
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
    const _coveredLinesPercent = (coveredLines * 100 / totalLines).toFixed(2)
    const complete = ""+_coveredLinesPercent === "100.00"

    return [
        _fileName,
        complete ? chalk.green(_baseName) : chalk.red(_baseName),
        (complete ? chalk.green(_coveredLinesPercent) : chalk.red(_coveredLinesPercent)),
        totalLines,
        coveredLines,
        uncoveredLines
    ]
}

export function displayReport (coverage) {
    const {root} = global.config
    const data = []

    let totalLines = 0
    let coveredLines = 0
    let totalFiles = 0

    data.push(["#", "File Path", "File Name", "Lines", "Covered", '%'])

    coverage.map(({url, functions}) => {
        const fileName = fileURLToPath(url)
        const sourceCode = fs.readFileSync(fileName, 'utf-8')

        const [_path, _name, _percent, _total, _covered] = generateReport(fileName.replace(root, ''), sourceCode, functions)

        totalLines += _total
        coveredLines += _covered
        totalFiles++

        data.push([totalFiles, _path, _name, _total, _covered, _percent + ' %'])
    })

    if (data.length === 1) {
        return
    }

    const tableConfig = {
        columns: [
            {alignment: 'left'},
            {alignment: 'left'},
            {alignment: 'left'},
            {alignment: 'right'},
            {alignment: 'right'},
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
        },
        drawHorizontalLine: (lineIndex, rowCount) => {
            return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
        }
    };

    log(`\nCoverage report for:`)
    log(chalk.yellow.bold(root))
    log(`------------------------------------`)
    log(`Files:          ${chalk.magenta.bold(totalFiles)}`)
    log(`Lines of code:  ${chalk.blue.bold(totalLines)}`)
    log(`Covered Lines:  ${chalk.green.bold(coveredLines)}`)
    let totalProgress = Math.round(coveredLines * 100 / totalLines)
    log(`Total coverage: ${totalProgress < 50 ? chalk.red.bold(totalProgress) : totalProgress < 80 ? chalk.yellow.bold(totalProgress) : chalk.green.bold(totalProgress) } %`)
    log(`------------------------------------`)
    log(table(data, tableConfig))
}