import dns from 'dns/promises';

/**
 * ドメインがメールを受信可能かDNSで検証する（サーバーサイド専用）
 * @param domain 検証するドメイン名
 * @returns {Promise<{isValid: boolean, error?: string}>}
 */
export async function validateDomainForEmail(domain: string): Promise<{ isValid: boolean }> {
  if (!domain) {
    return { isValid: false };
  }

  try {
    const mxRecords = await dns.resolveMx(domain);
    if (mxRecords && mxRecords.length > 0) {
      return { isValid: true };
    }
  } catch {
    try {
      const addresses = await dns.lookup(domain);
      if (addresses) {
        return { isValid: true };
      }
    } catch {
      return { isValid: false };
    }
  }

  return { isValid: false };
}