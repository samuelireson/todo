import fs from "fs";
import chalk from "chalk";
import Table from "cli-table3";

export default async function query(externalFunction) {
    try {
        let info = [];

        if (fs.existsSync("E:/Sam/Documents/todo-cli/db.json")) {
            await fs.readFile("E:/Sam/Documents/todo-cli/db.json", function (err, data) {
                info = JSON.parse(data.toString());

                let table = new Table({
                    head: [
                        { content: chalk.blue("ID"), hAlign: 'center' },
                        { content: chalk.blue("TODO"), hAlign: 'center' },
                        { content: chalk.blue("COMPLETED"), hAlign: 'center' }
                    ],
                    colWidths: [10, 60, 15],
                    wordWrap: true,
                })
                info.forEach((todo) => {
                    table.push([
                        { content: todo.id, hAlign: 'center', vAlign: 'center' },
                        { content: todo.todo, hAlign: 'left', vAlign: 'center' },
                        { content: todo.completed ? chalk.bgGreen(todo.completed) : chalk.bgRed(todo.completed), hAlign: 'center', vAlign: 'center' }
                    ]);
                });
                console.log(table.toString());

                if (err) {
                    console.log(err);
                    return;
                }

                if (externalFunction && !err) {
                    externalFunction(info);
                    return;
                }
            });
        } else {
            externalFunction(info);
            return;
        }
    } catch (error) {
        console.error(`Something Happened: ${error.message}`);
    }
}