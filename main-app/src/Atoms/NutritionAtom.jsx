import { atom } from 'jotai';

export const nutritionAtom = atom([]); //영양제 초기값
export const selectedNutritionAtom = atom(); // 가져온 영양제 값

//useAtomValue 읽기모드
