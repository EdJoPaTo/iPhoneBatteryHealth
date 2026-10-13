import childProcess from "node:child_process";
import util from "node:util";

const execFile = util.promisify(childProcess.execFile);

export async function run(
  script: string,
  paramenters: string[] = [],
): Promise<void> {
  const args: string[] = [];

  if (paramenters.length > 0) {
    args.push("-e", paramenters.join(";"));
  }

  args.push(script);

  await execFile("gnuplot", args);
}
