import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atom을 사용하여 토큰 상태 관리
export const accessTokenAtom = atomWithStorage(null);
export const refreshTokenAtom = atomWithStorage(null);

//user정보를 담는 Atom
export const userAtom = atom(null);

//로그인 확인 유무 Atom
export const isLoggedInAtom = atom(false);
export const isAdminAtom = atom(false);
export const isErrorAtom = atom(false);
