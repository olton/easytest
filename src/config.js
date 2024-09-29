import fs from "fs";
import chalk from "chalk";

let configFileName = 'easytest.json'

const defaultConfig = {
    include: ["**/*.spec.{t,j}s", "**/*.spec.{t,j}sx", "**/*.test.{t,j}s", "**/*.test.{t,j}sx"],
    exclude: ["node_modules/**"],
    coverage: false,
    verbose: false,
}

export const updateConfig = (config, args) => {
    Object.assign(config, defaultConfig)

    if (args.config) {
        configFileName = args.config
        if (fs.existsSync(configFileName)) {
            const userConfig = JSON.parse(fs.readFileSync(configFileName, 'utf-8'))
            Object.assign(config, userConfig)
        } else {
            console.log(chalk.red(`💀 Config file ${configFileName} not found!`))
        }
    }
    if (args.coverage) { config.coverage = true; }
    if (args.verbose) { config.verbose = true; }
    if (args.test) { config.test = args.test; }
    if (args.include) { config.include = args.include.split(','); }
    if (args.exclude) { config.exclude = args.exclude.split(','); }
}
