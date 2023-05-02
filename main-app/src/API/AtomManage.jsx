import { atom } from 'jotai';

export const postsAtom = atom([]); //게시글 목록 표시 상태
export const selectedPostAtom = atom(null); // 클릭한 게시글의 정보를 저장해둘 상태
export const commentsAtom = atom([]);
