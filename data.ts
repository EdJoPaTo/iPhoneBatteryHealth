import * as yaml from "https://deno.land/std@0.155.0/encoding/yaml.ts";

export type BatteryEntry = {
  readonly owner: string;
  readonly device: string;
  readonly age: string;
  readonly warningSince?: string;
  readonly health: Record<string, number>;
};

type FileData = { readonly batteries: BatteryEntry[] };

export async function load(): Promise<BatteryEntry[]> {
  const content = await Deno.readTextFile("data.yaml");
  return (yaml.parse(content) as FileData).batteries;
}
