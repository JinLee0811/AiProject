// import React from 'react';
// import * as S from './BoardDetail.style';
// import { useAtom } from 'jotai';
// import { useDeleteBoard } from '../../API/BoardAPi';
// import { useCreateLike, useDeleteLike } from '../../API/LikeAPi';
// import { selectedBoardAtom } from '../../Atoms/BoardAtom'; // 현재는 selectedPostAtom에 해당 id의 게시글 정보가 들어간상태
// import { useNavigate } from 'react-router-dom';
// import { BOARD_FORM_PATH } from '../common/path';
// import { useAuth } from '../../API/authApi';
// import BoardComment from './BoardComment';

// const BoardDetail = () => {
//   const [selectedBoard, setSelectedBoard] = useAtom(selectedBoardAtom); // useAtomValue를 사용하면 저장된 selectedPost 상태값을 바로가져옴
//   const navigate = useNavigate();
//   const handleBoardUpdate = () => {
//     alert('게시글을 수정하시겠습니까?');
//     navigate(BOARD_FORM_PATH);
//   };

// //   //게시글 삭제
// //   const { mutateAsync: deleteBoard } = useDeleteBoard();

//   const handleBoardDelete = async (id) => {
//     try {
//       await deleteBoard(id);
//       setSelectedBoard((prevBoards) =>
//         prevBoards.map((board) => {
//           if (board.id === id) {
//             return {
//               ...board,
//               deleteAt: new Date(),
//             };
//           }
//           return board;
//         })
//       );
//       alert('삭제되었습니다!');
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   //@@@@@@@@@@@@@@좋아요@@@@@@@@@@@@@@@

// //   const { mutateAsync: createLike } = useCreateLike(selectedBoard.id);
// //   const { mutateAsync: deleteLike } = useDeleteLike(selectedBoard.id);
// //   const { currentUser } = useAuth();

//   const handleLike = async () => {
//     try {
//       if (selectedBoard.user === currentUser.id) {
//         // 이미 좋아요를 누른 경우, 삭제
//         await deleteLike(currentUser.id);
//         setSelectedBoard((prev) => ({
//           ...prev,
//           user: null,
//           isLiked: false,
//         }));
//       } else {
//         // 좋아요를 누르지 않은 경우, 생성
//         await createLike(currentUser.id);
//         setSelectedBoard((prev) => ({
//           //현재 setSelectedBoard 객체 가져와서 거기다 추가
//           ...prev,
//           user: currentUser.id,
//           isLiked: true,
//         }));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

// //   function filterTime(time) {
// //     const filter = Date.now() - new Date(time);
// //     const filterSeconds = Math.floor(filter / 1000);
// //     const filterMinutes = Math.floor(filter / 60000);
// //     const filterHours = Math.floor(filter / 3600000);
// //     const filterDays = Math.floor(filter / 86400000);

//     if (filterSeconds < 60) {
//       return `${filterSeconds}초 전`;
//     } else if (filterMinutes < 60) {
//       return `${filterMinutes}분 전`;
//     } else if (filterHours < 24) {
//       return `${filterHours}시간 전`;
//     } else {
//       return `${filterDays}일 전`;
//     }
//   }

//   return (
//     <S.Container>
//       <S.FormContainer>
//         <div className='buttons'>
//           <button onClick={() => handleBoardUpdate(selectedBoard)}>수정</button>
//           <button onClick={() => handleBoardDelete(selectedBoard.id)}>
//             삭제
//           </button>
//         </div>
//         <h1 className='title'>{selectedBoard.title}</h1>
//         <div className='information'>
//           <span className='material-symbols-outlined'>emoji_nature</span>
//           <p className='nickname'>{selectedBoard.nickname}</p>
//           <p className='time'>{filterTime(selectedBoard.created_at)}</p>
//         </div>
//         <h2 className='content'>{selectedBoard.content}</h2>
//         <S.DetailImage src={selectedBoard.image} alt={selectedBoard.title} />
//         <p className='comment'>
//           조회 {selectedBoard.views} • 댓글 • 관심
//           {''}
//           {/* <S.HeartIcon isLiked={selectedBoard.isLiked} onClick={handleLike} /> */}
//           {/* <span onClick={handleLike}>
//             {selectedBoard.isLiked ? (
//               <S.RedHeartIcon /> // isLiked가 true => 빨간하트
//             ) : (
//               <S.EmptyHeartIcon /> // isLiked가 false => 빈하트
//             )}
//             {selectedBoard.likes}
//           </span> */}
//         </p>
//         <BoardComment />
//       </S.FormContainer>
//     </S.Container>
//   );
// };

// export default BoardDetail;
