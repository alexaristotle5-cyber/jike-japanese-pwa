type FixedAccount = {
  id: string;
  label: string;
  email: string;
};

const fixedAccounts: FixedAccount[] = [
  {
    id: "123456",
    label: "账号1",
    email: "jike-account-123456@jike-japanese.local",
  },
  {
    id: "1234567",
    label: "账号2",
    email: "jike-account-1234567@jike-japanese.local",
  },
];

export function resolveFixedAccount(accountId: string): FixedAccount | null {
  const normalized = accountId.trim();
  return fixedAccounts.find((account) => account.id === normalized) ?? null;
}

export function getDisplayNameForEmail(email?: string): string | undefined {
  if (!email) {
    return undefined;
  }

  return fixedAccounts.find((account) => account.email === email)?.label ?? email;
}
