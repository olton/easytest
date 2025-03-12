import fs, {existsSync, writeFileSync} from "fs";
import chalk from "chalk";

export const defaultConfig = {
    verbose: false,
    dom: false,
    coverage: false,
    skipPassed: false,
    parallel: false,
    watch: false,
    debug: false,
    include: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.js", "**/*.spec.jsx", "**/*.test.js", "**/*.test.jsx"],
    exclude: ["node_modules/**"],
    skip: "",
    test: "",
    reportType: "console",
    reportDir: "coverage",
    reportFile: "",
    maxWorkers: 4,
}

export const updateConfig = (args) => {
    global.config = Object.assign({}, defaultConfig)

    const configFileName = args.config ?? ("easytest.json" || "easytest.config.json")

    console.log(chalk.gray(`🔍 Searching for a config file...`))
    if (fs.existsSync(configFileName)) {
        console.log(chalk.gray(`✅ Config file found!`))
        console.log(chalk.gray(`   └── We use ${chalk.cyanBright(configFileName)} to configure EasyTest`))
        const userConfig = JSON.parse(fs.readFileSync(configFileName, 'utf-8'))
        Object.assign(config, userConfig)
    } else {
        console.log(chalk.gray(`✖️ Config file not found! Using default config!`))
        console.log(chalk.gray(`   └── You can create ${chalk.cyanBright(configFileName)} to configure EasyTest`))
    }

    if (args.dom) { config.dom = true; }
    if (args.coverage) { config.coverage = true; }
    if (args.verbose) { config.verbose = true; }
    if (args.skipPassed) { config.skipPassed = true; }
    if (args.watch) { config.watch = true; }
    if (args.debug) { config.debug = true; }
    if (args.parallel) { config.parallel = true; }

    if (args.test) { config.test = args.test.split(','); }
    if (args.include) { config.include = args.include.split(','); }
    if (args.exclude) { config.exclude = args.exclude.split(','); }
    if (args.skip) { config.skip = args.skip.split(','); }
    if (args.reportType) { config.reportType = args.reportType; }
    if (args.reportDir) { config.reportDir = args.reportDir; }
    if (args.reportFile) { config.reportDir = args.reportFile; }
    if (args.maxWorkers) { config.maxWorkers = args.maxWorkers; }

    if (config.reportType && !['console', 'lcov', 'html', 'junit'].includes(config.reportType)) {
        console.warn(`Unknown type of report: ${config.reportType}. Console will be used.`);
        config.reportType = 'console';
    }
}

export const createConfigFile = (configFileName = "easytest.json") => {
    // Проверка существования файла
    if (existsSync(configFileName)) {
        console.log(chalk.yellow(`⚠️ Config file ${chalk.cyanBright(configFileName)} already exists.`));
        console.log(  chalk.gray(`   └── If you want to create a new file, delete the existing one.`));
        console.log(`\n`)
        return false;
    }

    // Создание файла с настройками по умолчанию
    try {
        writeFileSync(configFileName, JSON.stringify(defaultConfig, null, 2), 'utf-8');
        console.log(chalk.green(`✅ Config file ${chalk.cyanBright(configFileName)} created successfully!`));
        console.log( chalk.gray(`   └── Now you can change the settings in this file.`));
        console.log(`\n`)
        return true;
    } catch (error) {
        console.error(chalk.red(`❌ Failed to create a configuration file: ${error.message}`));
        console.log(`\n`)
        return false;
    }
}