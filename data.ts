// This file is usable on its own without deno.json imports
// deno-lint-ignore no-import-prefix
import * as yaml from "jsr:@std/yaml@1";

export type IsoDate = `${number}-${number}-${number}`;

export const DEVICES = [
  "iPhoneSE",
  "iPhone6",
  "iPhone6S",
  "iPhone7",
  "iPhone7+",
  "iPhone8",
  "iPhone8+",
  "iPhoneX",
  "iPhoneXR",
  "iPhoneXS",
  "iPhoneXSMax",
  "iPhoneSE2",
  "iPhone11",
  "iPhone11Pro",
  "iPhone11ProMax",
  "iPhone12",
  "iPhone12mini",
  "iPhone12Pro",
  "iPhone12ProMax",
  "iPhoneSE3",
  "iPhone13",
  "iPhone13mini",
  "iPhone13Pro",
  "iPhone13ProMax",
  "iPhone14",
  "iPhone14Plus",
  "iPhone14Pro",
  "iPhone14ProMax",
  "iPhone15",
  "iPhone15Plus",
  "iPhone15Pro",
  "iPhone15ProMax",
  "iPhone16",
  "iPhone16Plus",
  "iPhone16Pro",
  "iPhone16ProMax",
  "iPhone16e",
  "iPhone17",
  "iPhoneAir",
  "iPhone17Pro",
  "iPhone17ProMax",
  "iPadPro11M4",
  "iPadPro13M4",
  "iPadAir11M2",
  "iPadAir13M2",
  "iPad10",
  "iPadMiniA17",
  "watch3big",
  "watch3small",
  "watch4big",
  "watch4small",
  "watch5big",
  "watch5small",
  "watchSE1big",
  "watchSE1small",
  "watch6big",
  "watch6small",
  "watch7big",
  "watch7small",
  "watch8big",
  "watch8small",
  "watchUltra",
  "watch9big",
  "watch9small",
  "watchUltra2",
  "watch10big",
  "watch10small",
  "watchSE2big",
  "watchSE2small",
  "watchUltra3",
  "watch11big",
  "watch11small",
  "watchSE3big",
  "watchSE3small",
] as const;
export type Device = typeof DEVICES[number];

export type BatteryEntry = {
  readonly owner: string;
  readonly device: Device;
  readonly age: IsoDate;
  warningSince?: IsoDate;
  health: Record<IsoDate, number>;
  cycles?: Record<IsoDate, number>;
};

type FileData = { readonly batteries: BatteryEntry[] };

export async function load(path: string): Promise<BatteryEntry[]> {
  const content = await Deno.readTextFile(path);
  return (yaml.parse(content) as FileData).batteries;
}

export async function save(path: string, content: FileData): Promise<void> {
  await Deno.writeTextFile(path, yaml.stringify(content));
}
