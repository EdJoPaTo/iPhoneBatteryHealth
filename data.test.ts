import Ajv from "https://esm.sh/ajv@8.11.0";
import * as data from "./data.ts";

const ISO_DAY_PATTERN = "^\\d{4}-\\d{2}-\\d{2}$";

const batterySchema = {
  type: "object",
  properties: {
    owner: { type: "string" },
    device: {
      enum: [
        "SE",
        "SE2",
        "6",
        "6S",
        "7",
        "8",
        "8+",
        "X",
        "XR",
        "XS",
        "11",
        "11Pro",
        "12",
        "12mini",
        "12ProMax",
        "13",
        "13ProMax",
        "14",
        "14Pro",
        "watch3big",
        "watch3small",
        "watch4big",
        "watch4small",
        "watch5big",
        "watch5small",
        "watch6big",
        "watch6small",
        "watch7big",
        "watch7small",
        "watch8big",
        "watch8small",
        "watchSEbig",
        "watchSEsmall",
      ],
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

Deno.test("data.yaml", async () => {
  const batteries = await data.load();
  for (const battery of batteries) {
    if (!validate(battery)) {
      console.error(battery, validate.errors);
      throw new Error("does not comply to schema");
    }
  }
});
