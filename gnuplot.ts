export async function run(
  script: string,
  paramenters: string[] = [],
): Promise<void> {
  const args: string[] = [];

  if (paramenters.length > 0) {
    args.push("-e", paramenters.join(";"));
  }

  args.push(script);

  const p = new Deno.Command("gnuplot", { args }).spawn();
  await p.status;
}
