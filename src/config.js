import fs from "fs";
import chalk from "chalk";

const log = console.log

export const defaultConfig = {
    include: ["**/*.spec.{t,j}s", "**/*.spec.{t,j}sx", "**/*.test.{t,j}s", "**/*.test.{t,j}sx"],
    exclude: ["node_modules/**"],
    skip: "",
    test: "",
    coverage: false,
    verbose: false,
    dom: false,
    report: {
        type: "lcov",
        dir: "coverage",
    },
}

export const updateConfig = (config, args) => {
    Object.assign(config, defaultConfig)

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
}
