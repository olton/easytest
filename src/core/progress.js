// src/core/progress.js
import chalk from 'chalk';

export class ProgressBar {
    constructor(total, width = 30) {
        this.total = total;
        this.completed = 0;
        this.width = width;
        this.start = Date.now();
        this.render();
    }

    increment() {
        this.completed++;
        this.render();
    }

    render() {
        const percent = Math.round((this.completed / this.total) * 100);
        const filledWidth = Math.round((this.completed / this.total) * this.width);
        const emptyWidth = this.width - filledWidth;

        const elapsed = ((Date.now() - this.start) / 1000).toFixed(1);
        const rate = this.completed > 0 ? (elapsed / this.completed).toFixed(2) : '0.00';

        process.stdout.write('\r');
        process.stdout.write(chalk.cyan(`[${chalk.green('█'.repeat(filledWidth))}${' '.repeat(emptyWidth > 0 ? emptyWidth : 0)}] ${percent}% `));
        process.stdout.write(chalk.yellow(`(${this.completed}/${this.total}) `));
        process.stdout.write(chalk.gray(`${elapsed}s elapsed, ${rate}s/test`));
    }

    complete() {
        const elapsed = ((Date.now() - this.start) / 1000).toFixed(2);
        process.stdout.write('\n');
        process.stdout.write(chalk.green(`Completed ${this.total} tests in ${elapsed}s\n`));
    }
}