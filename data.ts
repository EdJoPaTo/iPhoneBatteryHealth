import * as yaml from "https://deno.land/std@0.167.0/encoding/yaml.ts";

type ISO_DATE = `${number}-${number}-${number}`;

export const DEVICES = [
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
  "13mini",
  "13Pro",
  "13ProMax",
  "14",
  "14Pro",
  "15",
  "15Plus",
  "15Pro",
  "15ProMax",
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
  "watch9big",
  "watch9small",
  "watchSE1big",
  "watchSE1small",
  "watchSE2big",
  "watchSE2small",
  "watchUltra",
  "watchUltra2",
] as const;

export type BatteryEntry = {
  readonly owner: string;
  readonly device: typeof DEVICES[number];
  readonly age: ISO_DATE;
  readonly warningSince?: ISO_DATE;
  readonly health: Record<ISO_DATE, number>;
};

type FileData = { readonly batteries: BatteryEntry[] };

export async function load(): Promise<BatteryEntry[]> {
  const content = await Deno.readTextFile("data.yaml");
  return (yaml.parse(content) as FileData).batteries;
}
