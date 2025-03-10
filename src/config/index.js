import fs from "fs";
import chalk from "chalk";
import { merge } from "../helpers/merge.js"

export const defaultConfig = {
    include: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.js", "**/*.spec.jsx", "**/*.test.js", "**/*.test.jsx"],
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
    watch: false,
}

export const updateConfig = (args) => {
    global.config = Object.assign({}, defaultConfig)

    const configFileName = args.config ?? ("easytest.json" || "easytest.config.json")

    console.log(chalk.gray(`🔍 Searching for a config file...`))
    if (fs.existsSync(configFileName)) {
        console.log(chalk.gray(`🔍 Config file found!`))
        const userConfig = JSON.parse(fs.readFileSync(configFileName, 'utf-8'))
        Object.assign(config, userConfig)
    } else {
        console.log(chalk.gray(`🔍 Config file not found! Using default config!`))
        console.log(chalk.gray(`   └── You can create ${chalk.cyanBright(configFileName)} to configure EasyTest`))
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
    if (args.watch) { config.watch = args.watch; }

    if (config.reportType && !['lcov', 'html', 'junit'].includes(config.reportType)) {
        console.warn(`Unknown type of report: ${config.reportType}. LCOV will be used.`);
        config.reportType = 'lcov';
    }
}
