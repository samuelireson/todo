import fs from "fs";
import { exit } from "process";

export default function check() {
    if (!fs.existsSync("E:/Sam/Documents/todo-cli/db.json")) {
        console.log("No TODOs found. Please add a TODO first.");
        exit(1);
    }
}