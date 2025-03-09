import fs from "fs";
import chalk from "chalk";
import { merge } from "../helpers/merge.js"

const log = console.log

export const defaultConfig = {
    include: ["**/*.spec.{t,j}s", "**/*.spec.{t,j}sx", "**/*.test.{t,j}s", "**/*.test.{t,j}sx"],
    exclude: ["node_modules/**"],
    skip: "",
    test: "",
    verbose: false,
    dom: false,
    coverage: false,
    skipPassed: false,
    reportType: "lcov",
    reportDir: "coverage",
    reportFile: "",
    parallel: false,
    maxWorkers: 4,
}

export const updateConfig = (args) => {
    global.config = merge({}, defaultConfig, global.config)

    const configFileName = args.config ?? "easytest.json"

    if (fs.existsSync(configFileName)) {
        const userConfig = JSON.parse(fs.readFileSync(configFileName, 'utf-8'))
        Object.assign(config, userConfig)
    } else {
        log(chalk.gray(`🔍 Config file not found! Using default config!`))
        log(chalk.gray(`   └── You can create ${chalk.cyanBright(configFileName)} to configure EasyTest`))
    }

    if (args.dom) { config.dom = true; }
    if (args.coverage) { config.coverage = true; }
    if (args.verbose) { config.verbose = true; }
    if (args.test) { config.test = args.test.split(','); }
    if (args.include) { config.include = args.include.split(','); }
    if (args.exclude) { config.exclude = args.exclude.split(','); }
    if (args.skip) { config.skip = args.skip.split(','); }
    if (args.skipPassed) { config.skipPassed = JSON.parse(args.skipPassed); }
    if (args.reportType) { config.reportType = args.reportType; }
    if (args.reportDir) { config.reportDir = args.reportDir; }
    if (args.reportFile) { config.reportDir = args.reportFile; }
    if (args.parallel) { config.parallel = args.parallel; }
    if (args.maxWorkers) { config.maxWorkers = args.maxWorkers; }

    if (config.reportType && !['lcov', 'html'].includes(config.reportType)) {
        console.warn(`Unknown type of report: ${config.reportType}. LCOV will be used.`);
        config.reportType = 'lcov';
    }
}
