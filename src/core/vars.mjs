const viteEnv = typeof import.meta !== "undefined" ? import.meta.env : undefined;
const nodeEnv = typeof process !== "undefined" ? process.env : undefined;

const env = viteEnv ?? nodeEnv ?? {};

export const phone = env.VITE_PHONE ?? "0";
export const url = env.VITE_SITE_URL ?? "";
export const time = env.VITE_ICON_RESET_DELAY_MS ?? 0;