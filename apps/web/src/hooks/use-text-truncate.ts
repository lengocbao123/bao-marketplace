import { useEffect, useState } from 'react';

export const useTextTruncate = (text: string, maxLength = 200) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [truncatedText, setTruncatedText] = useState(text);
  const hasTruncated = text.length > maxLength;
  const toggleTruncated = () => setIsTruncated(!isTruncated);

  useEffect(() => {
    if (text.length > maxLength) {
      setIsTruncated(true);
      setTruncatedText(`${text.substring(0, maxLength)}...`);
    } else {
      setIsTruncated(false);
      setTruncatedText(text);
    }
  }, [text, maxLength]);

  return { isTruncated, truncatedText, hasTruncated, toggleTruncated };
};
