import { atom } from 'jotai';

// Atom을 사용하여 토큰 상태 관리
export const accessTokenAtom = atom(null);
export const refreshTokenAtom = atom(null);

//user정보를 담는 Atom
export const userAtom = atom(null);
