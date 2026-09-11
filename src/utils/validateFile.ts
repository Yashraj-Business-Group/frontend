export interface FileValidationRules {
  allowedTypes: string[];
  maxSizeMB: number;
}

export const validateFile = (file: File, rules: FileValidationRules): string | null => {
  if (!rules.allowedTypes.includes(file.type)) {
    return `Unsupported file type. Allowed: ${rules.allowedTypes.join(', ')}`;
  }
  if (file.size > rules.maxSizeMB * 1024 * 1024) {
    return `File is too large. Maximum size is ${rules.maxSizeMB}MB.`;
  }
  return null;
};

export const IMAGE_UPLOAD_RULES: FileValidationRules = {
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  maxSizeMB: 5,
};

export const RESUME_UPLOAD_RULES: FileValidationRules = {
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  maxSizeMB: 5,
};
