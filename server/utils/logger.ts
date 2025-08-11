export const log = (...args: any[]) => {
  const lvl = process.env.LOG_LEVEL || "info";
  console.log(
    JSON.stringify({ level: lvl, ts: new Date().toISOString(), msg: args.join(" ") })
  );
};
