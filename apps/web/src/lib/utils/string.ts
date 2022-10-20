// Get an avatar letter by words
export const getAvatarLetter = (words?: string): string => {
  if (!words) {
    return '';
  }

  const letters = words.split(' ').map((letter) => letter[0]);

  return letters.join('').toUpperCase();
};

// Get username from email
export const getUsernameFromEmail = (email?: string | null): string => {
  if (!email) {
    return '';
  }

  const [username] = email.split('@');

  return username;
};

// Shorthand wallet address
export const getShortAddress = (address?: string): string => {
  if (!address) {
    return '';
  }

  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
};

// Shorthand card number
export const getShortCardNumber = (cardNumber?: string): string => {
  if (!cardNumber) {
    return '';
  }

  return `${cardNumber.substring(0, 4)}****${cardNumber.substring(cardNumber.length - 4)}`;
};
