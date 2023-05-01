export async function run(
  script: string,
  paramenters: string[] = [],
): Promise<void> {
  const command: string[] = ["gnuplot"];

  if (paramenters.length > 0) {
    command.push("-e", paramenters.join(";"));
  }

  command.push(script);

  const p = new Deno.Command("nice", { args: command }).spawn();
  await p.status;
}
