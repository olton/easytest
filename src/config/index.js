import fs, {existsSync, writeFileSync} from "fs";
import chalk from "chalk";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

const defaultInclude = [
    "**/*.spec.ts", 
    "**/*.spec.tsx", 
    "**/*.test.ts", 
    "**/*.test.tsx", 
    "**/*.spec.js", 
    "**/*.spec.jsx", 
    "**/*.test.js", 
    "**/*.test.jsx"
]
const defaultExclude = [
    "node_modules/**"
]

export const defaultConfig = {
    verbose: false,
    dom: false,
    react: false,
    coverage: false,
    skipPassed: false,
    parallel: false,
    watch: false,
    debug: false,
    include: defaultInclude,
    exclude: defaultExclude,
    skip: "",
    test: "",
    reportType: "console",
    reportDir: "coverage",
    reportFile: "",
    maxWorkers: 4,
}

export const updateConfig = (args) => {
    global.config = Object.assign({}, defaultConfig)

    const configFileName = args.config ?? ("latte.json" || "latte.config.json")

    console.log(chalk.gray(`🔍 Searching for a config file...`))
    if (fs.existsSync(configFileName)) {
        console.log(chalk.gray(`✅ Config file found!`))
        console.log(chalk.gray(`   └── We use ${chalk.cyanBright(configFileName)} to configure Latte`))
        const userConfig = JSON.parse(fs.readFileSync(configFileName, 'utf-8'))
        Object.assign(config, userConfig)
    } else {
        console.log(chalk.gray(`🥤 Config file not found! We use default settings and CLI arguments!`))
        console.log(chalk.gray(`   └── You can create ${chalk.cyanBright(configFileName)} to configure Latte`))
    }

    if (args.react && !args.dom) {
        console.log(chalk.yellow('⚠️ Option --react requires --dom. Enabling DOM emulation automatically.'));
        args.dom = true;
    }

    if (args.dom) { config.dom = true; }
    if (args.react) { config.dom = true; config.react = true; }
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

export const createConfigFile = (configFileName = "latte.json") => {
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

export const processArgv = () => {
    return yargs(hideBin(process.argv))
        .option('watch', {
            alias: 'w',
            type: 'boolean',
            description: 'Run in observation mode'
        })
        .option('parallel', {
            alias: 'p',
            type: 'boolean',
            description: 'Run in parallel mode'
        })
        .option('dom', {
            alias: 'd',
            type: 'boolean',
            description: 'Enable DOM emulation'
        })
        .option('react', {
            alias: 'r',
            type: 'boolean',
            description: 'Enable React testing support (requires --dom)'
        })
        .option('debug', {
            alias: 'g',
            type: 'boolean',
            description: 'Run tests in debug mode'
        })
        .option('verbose', {
            alias: 'b',
            type: 'boolean',
            description: 'Detailed report'
        })
        .option('coverage', {
            alias: 'c',
            type: 'boolean',
            description: 'Code coverage report'
        })
        .option('loader', {
            alias: 'l',
            type: 'boolean',
            description: 'Use experimental resolver for imports'
        })
        .option('max-workers', {
            type: 'string',
            description: 'Maximum number of parallel workers'
        })
        .option('include', {
            type: 'string',
            description: 'Test files switching templates'
        })
        .option('exclude', {
            type: 'string',
            description: 'Test file excluding templates'
        })
        .option('report-type', {
            type: 'string',
            description: 'Report Type [\'console\', \'lcov\', \'html\', \'junit\']'
        })
        .option('report-dir', {
            type: 'string',
            description: 'Reports Directory'
        })
        .option('report-file', {
            type: 'string',
            description: 'Report File Name'
        })
        .option('init', {
            type: 'boolean',
            description: 'Create a configuration file'
        })
        .help()
        .argv;
}