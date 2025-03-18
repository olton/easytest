import chalk from "chalk";
import pkg from "../../package.json" with { type: "json" };

export const banner = () => {
    console.log(chalk.gray(`-----------------------------------------------------------------`))
    console.log(`${chalk.bold("Latte")} ${chalk.bold.cyanBright(`v${pkg.version}`)}. ${chalk.gray("Copyright (c) 2024-2025 by")} ${chalk.bold.whiteBright("Serhii Pimenov")}.💙💛 `)
    console.log(`${chalk.gray("Support Latte by PayPal to")} ${chalk.bold.cyan("serhii@pimenov.com.ua")}. ${chalk.gray('Thank you!')}`)
    console.log(chalk.gray(`-----------------------------------------------------------------`))
};