import * as csv from "jsr:@std/csv@1";
import type { BatteryEntry } from "./data.ts";
import * as gnuplot from "./gnuplot.ts";

const MONTH_IN_SECONDS = 60 * 60 * 24 * 30;

async function generateBatteryCsvFile(
  battery: Readonly<BatteryEntry>,
  filename: string,
) {
  const columns: csv.ColumnDetails[] = [
    { header: "Age", prop: 0 },
    {
      header: `(${battery.owner}) ${battery.device} ${battery.age.slice(0, 7)}`,
      prop: 1,
    },
  ];

  const ageTimestamp = Date.parse(battery.age);
  const lines = Object.entries(battery.health).map(([key, value]) => {
    const timestamp = Date.parse(key);
    const ageInSeconds = (timestamp - ageTimestamp) / 1000;
    const ageInMonths = ageInSeconds / MONTH_IN_SECONDS;
    return [String(ageInMonths), String(value)];
  });

  const content = csv.stringify(lines, { columns });
  await Deno.writeTextFile(filename, content);
}

export async function batteryAge(
  batteries: ReadonlyArray<Readonly<BatteryEntry>>,
): Promise<void> {
  const sortedBatteries = [...batteries]
    // Newest Battery first
    .sort((a, b) => Date.parse(b.age) - Date.parse(a.age));

  await Promise.all(
    sortedBatteries.map((o, i) =>
      generateBatteryCsvFile(o, `tmp/age-${i + 1}.csv`)
    ),
  );
  await gnuplot.run("battery-age.gnuplot", [
    `lines=${sortedBatteries.length}`,
  ]);
}
