import inquirer from "inquirer";
import fs from "fs";
import check from "file://E:/Sam/Documents/todo-cli/utils/check.js";

export default async function update(info) {
    check()

    try {
        const answers = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "ID:",
            }
        ])
        let current;

        info.forEach((todo) => {
            if (todo.id === answers.id) {
                current = todo;
                markAsDone(current, info);
            }
        });
    } catch (error) {
        console.log("Something went wrong!", error);
    }
}

async function markAsDone(current, info) {
    current.completed = !current.completed;
    await fs.writeFile("E:/Sam/Documents/todo-cli/db.json", JSON.stringify(info), function (err) {
        if (err) {
            console.log(err);
        }
        console.log("TODO status updated!");
    });
}