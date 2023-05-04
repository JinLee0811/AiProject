import { atom } from 'jotai';

// File atom
export const fileAtom = atom(null);

// Result atom
export const resultAtom = atom({
  title: '',
  items: [],
});
