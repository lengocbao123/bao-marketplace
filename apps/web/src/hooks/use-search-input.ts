import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export const useSearchInput = () => {
  const [inputKey, setInputKey] = useState('');
  const searchKey = useDebounce<string>(inputKey, 500);

  return {
    searchKey,
    inputKey,
    setInputKey,
  };
};
