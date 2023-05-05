import { atom } from 'jotai';

export const boardsAtom = atom([]); //게시글 목록 표시 상태
export const selectedBoardAtom = atom(null); // 클릭한 게시글의 정보를 저장해둘 상태
export const commentsAtom = atom([]);
export const nutritionsAtom = atom([]);
export const selectedNutritionAtom = atom(null);
