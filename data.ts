import * as yaml from "jsr:@std/yaml@1";

export type IsoDate = `${number}-${number}-${number}`;

export const DEVICES = [
  "iPhoneSE",
  "iPhoneSE2",
  "iPhone6",
  "iPhone6S",
  "iPhone7",
  "iPhone8",
  "iPhone8+",
  "iPhoneX",
  "iPhoneXR",
  "iPhoneXS",
  "iPhone11",
  "iPhone11Pro",
  "iPhone12",
  "iPhone12mini",
  "iPhone12ProMax",
  "iPhone13",
  "iPhone13mini",
  "iPhone13Pro",
  "iPhone13ProMax",
  "iPhone14",
  "iPhone14Pro",
  "iPhone15",
  "iPhone15Plus",
  "iPhone15Pro",
  "iPhone15ProMax",
  "iPhone16",
  "iPhone16Plus",
  "iPhone16Pro",
  "iPhone16ProMax",
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
