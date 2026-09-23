/**
 * Anti-Spam Pattern Filter for Yashraj Business Group
 * Rejects machine-generated random alphanumeric strings, mixed-case gibberish names,
 * and bot submission patterns (e.g. "bhNaZkAxHOUgHiyFnBEYxK", "Fwtjtmgwst LLC", "x.o.p.hn.d.g.xzux3.16@gmail.com").
 */

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

/**
 * Checks if an individual token/word looks like machine-generated random string or gibberish.
 */
export const isGibberishWord = (word: string): boolean => {
  const clean = word.trim().replace(/[^a-zA-Z]/g, '');
  if (clean.length < 4) return false;

  // 1. Lowercase immediately followed by uppercase 2 or more times (e.g. "bhNaZkAx", "tBplccWo")
  // Real names like "McDonald" or "MacDonald" have at most 1 transition.
  const lowerToUpper = clean.match(/[a-z][A-Z]/g) || [];
  if (lowerToUpper.length >= 2) {
    return true;
  }

  // 2. Count total casing switches (Upper->Lower or Lower->Upper)
  // "Amit" = 1 switch. "McCallum" = 3 switches. Random string like "bhNaZkAx..." has 10+ switches.
  let caseSwitches = 0;
  for (let i = 0; i < clean.length - 1; i++) {
    const isCurUpper = clean[i] >= 'A' && clean[i] <= 'Z';
    const isNextUpper = clean[i + 1] >= 'A' && clean[i + 1] <= 'Z';
    if (isCurUpper !== isNextUpper) {
      caseSwitches++;
    }
  }
  if (caseSwitches >= 4 && clean.length >= 6) {
    return true;
  }

  // 3. Four or more consecutive consonants at the start of a word (e.g. "Klgpylulo", "Fwtjtmgwst")
  if (/^[^aeiouy]{4,}/i.test(clean)) {
    return true;
  }

  // 4. Unnatural starting consonant clusters impossible in human names (e.g. "Dfemsarx", "VxXNenolg", "Vbnrm")
  if (/^(df|vx|vb|zk|qg|hx|kx|wj|tq|fn|zqc|klg|fwt)[a-z]/i.test(clean)) {
    return true;
  }

  // 5. Five or more consecutive consonants anywhere (e.g. "krlrrTv", "hlcsf", "twzgw")
  if (/[^aeiouy\d\s\-_.,'/]{5,}/i.test(clean)) {
    return true;
  }

  // 6. Word of 5 or more characters with zero vowels (e.g. "Vbnrm")
  if (clean.length >= 5 && !/[aeiouy]/i.test(clean)) {
    return true;
  }

  return false;
};

/**
 * Evaluates full name for gibberish patterns.
 */
export const isGibberishName = (fullName: string): boolean => {
  if (!fullName || typeof fullName !== 'string') return true;
  const trimmed = fullName.trim();
  if (trimmed.length < 2) return true;

  // Single word of 14+ characters with mixed case or high entropy
  if (!trimmed.includes(' ') && trimmed.length >= 14 && isGibberishWord(trimmed)) {
    return true;
  }

  const words = trimmed.split(/\s+/);
  for (const word of words) {
    if (isGibberishWord(word)) {
      return true;
    }
  }

  return false;
};

/**
 * Evaluates company name for bot patterns (e.g. "Fwtjtmgwst LLC", "Nfzoqch LLC").
 */
export const isGibberishCompany = (company: string): boolean => {
  if (!company || typeof company !== 'string') return false;
  const trimmed = company.trim();
  if (!trimmed) return false;

  const words = trimmed.split(/\s+/);
  for (const word of words) {
    // Skip common corporate abbreviations
    if (['LLC', 'LTD', 'INC', 'PVT', 'CORP', 'CO'].includes(word.toUpperCase())) {
      continue;
    }
    if (isGibberishWord(word)) {
      return true;
    }
  }

  return false;
};

/**
 * Evaluates email for bot patterns (e.g. dotted gmail aliases like "x.o.p.hn.d.g.xzux3.16@gmail.com").
 */
export const isBotEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return true;
  const trimmed = email.trim();
  const [localPart] = trimmed.split('@');
  if (!localPart) return true;

  // 4 or more dots in local part before the @ symbol is a classic bot bypass pattern
  const dots = (localPart.match(/\./g) || []).length;
  if (dots >= 4) {
    return true;
  }

  // Local part contains gibberish token
  const tokens = localPart.split(/[._\-+]/);
  for (const token of tokens) {
    if (token.length >= 8 && isGibberishWord(token)) {
      return true;
    }
  }

  return false;
};

/**
 * Checks a complete form submission payload for spam characteristics.
 */
export const isSpamSubmission = (payload: {
  fullName?: string;
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  additionalReqs?: string;
  serviceRequired?: string;
  [key: string]: any;
}): SpamCheckResult => {
  // Check full name
  if (payload.fullName && isGibberishName(payload.fullName)) {
    return {
      isSpam: true,
      reason: 'Name contains machine-generated or random mixed-case characters.'
    };
  }

  // Check company name
  if (payload.companyName && isGibberishCompany(payload.companyName)) {
    return {
      isSpam: true,
      reason: 'Company name contains invalid random strings.'
    };
  }

  // Check email pattern
  if (payload.email && isBotEmail(payload.email)) {
    return {
      isSpam: true,
      reason: 'Email address matched automated bot generation pattern.'
    };
  }

  // Check message / requirements (single 15+ letter random token)
  if (payload.additionalReqs) {
    const trimmed = payload.additionalReqs.trim();
    const words = trimmed.split(/\s+/);
    if (words.length === 1 && words[0].length >= 15 && isGibberishWord(words[0])) {
      return {
        isSpam: true,
        reason: 'Message contains machine-generated random alphanumeric strings.'
      };
    }
  }

  return { isSpam: false };
};
