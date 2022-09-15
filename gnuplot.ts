export async function run(
  script: string,
  paramenters: string[] = [],
): Promise<void> {
  const command: string[] = [
    "nice",
    "gnuplot",
  ];

  if (paramenters.length > 0) {
    command.push("-e", paramenters.join(";"));
  }

  command.push(script);

  const p = Deno.run({ cmd: command });
  await p.status();
}
