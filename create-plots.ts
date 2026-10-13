#!/usr/bin/env -S deno run --allow-read=. --allow-write=tmp --allow-run=gnuplot --allow-env

import { mkdir } from "node:fs/promises";

import { batteryAge } from "./battery-age.ts";
import { batteryDate } from "./battery-date.ts";
import * as data from "./data.ts";

await mkdir("tmp", { recursive: true });

const batteries = await data.loadAll("data");

console.log("create battery-age");
await batteryAge(batteries);
console.log("create battery-date");
await batteryDate(batteries);
