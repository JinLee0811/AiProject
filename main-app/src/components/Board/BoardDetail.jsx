// import React, { useEffect, useState } from 'react';
// import * as S from './BoardDetail.style';
// import { useGetBoardDetail } from '../../API/BoardAPi';
// import { useParams } from 'react-router-dom';
// const BoardDetail = () => {
//   const { boardId } = useParams();
//   const [detailBoard, setDetailBoard] = useState(null);
//   console.log(boardId);

//   const { data: fetchedBoardDetail } = useGetBoardDetail(boardId, {
//     onError: (error) => console.log(error.message),
//   });

//   useEffect(() => {
//     if (fetchedBoardDetail) {
//       setDetailBoard(fetchedBoardDetail);
//       console.log(fetchedBoardDetail);
//     }
//   }, [fetchedBoardDetail, setDetailBoard]);

//   //   const filterTime = (time) => {
//   //     // 서버에서 보내주는 시간 값을 Date 객체로 바꿈
//   //     const serverTime = new Date(time);
//   //     // 클라이언트의 로컬 시간대에 맞추어 변환
//   //     const localTime = new Date( //현재 시간에서 뺌
//   //       serverTime.getTime() - serverTime.getTimezoneOffset() * 60 * 1000
//   //     );
//   //     const filter = Date.now() - localTime.getTime();
//   //     const filterSeconds = Math.floor(filter / 1000);
//   //     const filterMinutes = Math.floor(filter / 60000);
//   //     const filterHours = Math.floor(filter / 3600000);
//   //     const filterDays = Math.floor(filter / 86400000);

//   //     if (filterSeconds < 60) {
//   //       return `${filterSeconds}초 전`;
//   //     } else if (filterMinutes < 60) {
//   //       return `${filterMinutes}분 전`;
//   //     } else if (filterHours < 24) {
//   //       return `${filterHours}시간 전`;
//   //     } else {
//   //       return `${filterDays}일 전`;
//   //     }
//   //   };
//   if (isLoading || !detailBoard) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <S.Container>
//       <S.FormContainer>
//         {/* <div className='buttons'> */}
//         {/* <button onClick={() => handleBoardUpdate(detailBoard)}>수정</button>
//           <button onClick={() => handleBoardDelete(detailBoard.id)}>
//             삭제
//           </button>
//         </div>
//         <h1 className='title'>{detailBoard.title}</h1>
//         <div className='information'>
//           <span className='material-symbols-outlined'>emoji_nature</span>
//           <p className='nickname'>{detailBoard.user.nickname}</p>
//           <p className='time'>{filterTime(detailBoard.created_at)}</p>
//         </div>
//         <h2 className='content'>{detailBoard.content}</h2>
//         <S.DetailImage src={detailBoard.image} />
//         <p className='comment'> */}
//         조회 {detailBoard.views} • 댓글 • 관심
//         {/* <S.HeartIcon isLiked={selectedBoard.isLiked} onClick={handleLike} /> */}
//         {/* <span onClick={handleLike}>
// //             {selectedBoard.isLiked ? (
// //               <S.RedHeartIcon /> // isLiked가 true => 빨간하트
// //             ) : (
// //               <S.EmptyHeartIcon /> // isLiked가 false => 빈하트
// //             )}
// //             {selectedBoard.likes}
// //           </span> */}
//         {/* </p> */}
//         asd
//       </S.FormContainer>
//     </S.Container>
//   );
// };

// export default BoardDetail;
