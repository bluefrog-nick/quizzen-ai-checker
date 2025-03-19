
const COOKIE_NAME = 'ai-readiness-cookie';

/**
 * Generates a unique user ID
 */
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Gets the AI readiness cookie if it exists
 */
export const getAiReadinessCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${COOKIE_NAME}=`)) {
      return cookie.substring(COOKIE_NAME.length + 1);
    }
  }
  return null;
};

/**
 * Sets the AI readiness cookie if it doesn't exist yet
 */
export const setAiReadinessCookieIfNeeded = (): string => {
  let userId = getAiReadinessCookie();
  
  if (!userId) {
    userId = generateUniqueId();
    // Set cookie to expire in 1 year
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    document.cookie = `${COOKIE_NAME}=${userId};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
  }
  
  return userId;
};
