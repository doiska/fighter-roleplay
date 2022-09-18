export type Source = number;
export type ValidIdentifiers = "discord" | "steam" | "license" | "xbl" | "ip" | "live";
export type Identifier = `${ValidIdentifiers}:${string}`;

