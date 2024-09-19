import { assert, assertEquals } from "jsr:@std/assert@1";
import { Ajv } from "npm:ajv@8";
import * as data from "./data.ts";

const ISO_DAY_PATTERN = "^\\d{4}-\\d{2}-\\d{2}$";

const batterySchema = {
  type: "object",
  properties: {
    owner: { type: "string" },
    device: {
      enum: data.DEVICES,
    },
    age: { type: "string", pattern: ISO_DAY_PATTERN },
    warningSince: { type: "string", pattern: ISO_DAY_PATTERN },
    health: {
      type: "object",
      additionalProperties: false,
      patternProperties: {
        "^\\d{4}-\\d{2}-\\d{2}$": { type: "integer", minimum: 1, maximum: 100 },
      },
    },
  },
  required: ["owner", "device", "age", "health"],
  additionalProperties: false,
};

const ajv = new Ajv();
const validate = ajv.compile(batterySchema);

const batteries = await data.load("data.yaml");
for (const battery of batteries) {
  Deno.test(`${battery.owner} ${battery.device} ${battery.age}`, () => {
    if (!validate(battery)) {
      console.error(battery, validate.errors);
      throw new Error("does not comply to schema");
    }

    const dates = Object.keys(battery.health);
    const sorted = [...dates].sort();
    assertEquals(dates, sorted, "health dates are unsorted");

    const dateTimestamps = dates.map((o) => Date.parse(o));
    const minHealthTimestamp = dateTimestamps.reduce((a, b) => Math.min(a, b));
    const ageTimestamp = Date.parse(battery.age);

    assert(minHealthTimestamp >= ageTimestamp, "health is older than age");
  });
}
