const BLOCKED_EMAIL_DOMAINS: ReadonlyArray<string> =
  process.env.BLOCKED_EMAIL_DOMAINS?.split(",").map((d) => d.trim().toLowerCase()) ?? [];

export const sanitizeInput = (input: string): string =>
  input.trim().replace(/<[^>]*>/g, "");

export const sanitizeNumber = (input: string): string =>
  input.trim().replace(/[^0-9]/g, "");

export const isBlockedEmail = (email: string): boolean => {
  const domain = email.split("@")[1];
  return domain ? BLOCKED_EMAIL_DOMAINS.includes(domain.toLowerCase()) : false;
};