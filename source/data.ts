export interface Battery {
  readonly age: string;
  readonly device: string;
  readonly health: Record<string, number>;
  warningSince?: string;
}

export interface Person {
  readonly _name: string;
  readonly batteries: Battery[];
}

export interface BatteryWithPerson extends Battery {
  readonly person: string;
}

export function allBatteries(persons: readonly Person[]): BatteryWithPerson[] {
  const result: BatteryWithPerson[] = []

  for (const p of persons) {
    const name = p._name
    const bat = p.batteries.map((b): BatteryWithPerson => ({
      ...b,
      person: name,
    }))

    result.push(...bat)
  }

  return result
}
