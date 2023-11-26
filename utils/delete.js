import inquirer from "inquirer";
import fs from "fs";
import check from "./check.js";

export default async function remove(info) {
    check()

    try {
        const answers = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "ID:",
            }
        ])

        let remnant = info.filter((todo) => todo.id !== answers.id);

        await fs.writeFile("E:/Sam/Documents/todo-cli/db.json", JSON.stringify(remnant), function (err) {
            if (err) {
                console.log(err);
            }
            console.log("TODO removed!");
        });
    } catch (error) {
        console.log("Something went wrong!", error);
    }
}