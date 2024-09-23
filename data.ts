import * as yaml from "jsr:@std/yaml@1";

export type IsoDate = `${number}-${number}-${number}`;

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
  "16",
  "16Plus",
  "16Pro",
  "16ProMax",
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
  "watch10big",
  "watch10small",
  "watchSE1big",
  "watchSE1small",
  "watchSE2big",
  "watchSE2small",
  "watchUltra",
  "watchUltra2",
] as const;
export type Device = typeof DEVICES[number];

export type BatteryEntry = {
  readonly owner: string;
  readonly device: Device;
  readonly age: IsoDate;
  warningSince?: IsoDate;
  health: Record<IsoDate, number>;
};

type FileData = { readonly batteries: BatteryEntry[] };

export async function load(path: string): Promise<BatteryEntry[]> {
  const content = await Deno.readTextFile(path);
  return (yaml.parse(content) as FileData).batteries;
}

export async function save(path: string, content: FileData): Promise<void> {
  await Deno.writeTextFile(path, yaml.stringify(content));
}
