const LEAVE_EMAIL_DOMAIN: ReadonlyArray<string> =
  process.env.LEAVE_EMAIL_DOMAIN?.split(",").map((domain) => domain.trim().toLowerCase()) ?? [];

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<[^>]*>/g, "");
};

export const isLeaveEmail = (email: string): boolean => {
  const emailDomain = email.split("@")[1];

  if (!emailDomain) {
    return false;
  }

  return LEAVE_EMAIL_DOMAIN.includes(emailDomain);
};

export const sanitizeNumber = (input: string): string => {
  return input.trim().replace(/[^0-9]/g, "-");
};