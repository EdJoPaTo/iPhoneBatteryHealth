import { batteryAge } from "./battery-age.ts";
import { batteryDate } from "./battery-date.ts";
import * as data from "./data.ts";

await Deno.mkdir("tmp", { recursive: true });

const batteries = await data.load("data.yaml");

console.log("create battery-age");
await batteryAge(batteries);
console.log("create battery-date");
await batteryDate(batteries);
