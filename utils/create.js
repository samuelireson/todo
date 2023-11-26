import inquirer from "inquirer";
import fs from "fs";

export default async function create(info) {
    try {
        const maxId = info.reduce((max, todo) => (todo.id > max ? todo.id : max), 0);
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "todo",
                message: "TODO:",
            },
        ]);

        const data = {
            id: maxId + 1,
            todo: answers.todo,
            completed: false,
        };
        info.push(data);

        if (fs.existsSync("E:/Sam/Documents/todo-cli/db.json")) {
            createTODO(info);
        } else {
            fs.appendFile("E:/Sam/Documents/todo-cli/db.json", "[]", (err) => {
                if (err) {
                    console.log("Could not create db.json", err);
                    return;
                }
                createTODO(info);
            });
        }
    } catch (error) {
        console.log("Something went wrong!", error);
    }
}

async function createTODO(info) {
    await fs.writeFile("E:/Sam/Documents/todo-cli/db.json", JSON.stringify(info), function (err) {
        if (err) {
            console.log(err);
        }
        console.log("TODO added!");
    });
}