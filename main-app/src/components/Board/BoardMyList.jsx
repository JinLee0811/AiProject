import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './BoardList.style';
import useMyBoardListQuery from '../../API/BoardApi';

const BoardMyList = () => {
  const navigate = useNavigate();
  //   useQuery 이용한 로직
  const { data: posts, isLoading, isError } = useMyBoardListQuery();
  // 여기 data: posts 구문의 의미가 useBoardListQuery에서 반환된 데이터를 posts라는 이름으로 자동 할당 즉,
  // const [posts, setPosts] = useAtom(postAtom) 위와 같은 정의가 필요가 없단 소리임 ㅇㅇ
  // 정리해보자면.. useQuery훅을 사용해서 데이터 가져오면.. useAtom 훅은 쓸 일이 없어진다는거네..? (맞는지 물어볼것)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {isError.message}</div>; // 서버에서 반환된 에러메세지 보여줌
  }

  const detailClick = (id) => {
    const post = posts.find((post) => post.id === id);
    navigate('/board/Detail', {
      state: {
        title: post.title,
        content: post.content,
        like: post.like,
        nickname: post.nickname,
        image: post.image,
        views: post.views,
        commentCount: post.commentCount,
        time: post.time,
      },
    });
  };
  const boardClick = () => {
    navigate('/board');
  };
  const myBoardClick = () => {
    navigate('/board/My');
  };
  const formClick = () => {
    navigate('/BoardForm');
  };
  const shortenContent = (content) => {
    //5글자 이상인 경우 뒤는 ... 으로 요약처리!
    if (content.length > 3) {
      return content.slice(0, 5) + '...';
    }
    return content;
  };
  const filterTime = (time) => {
    const filter = Date.now() - new Date(time);
    const filterSeconds = Math.floor(filter / 1000);
    const filterMinutes = Math.floor(filter / 60000);
    const filterHours = Math.floor(filter / 3600000);
    const filterDays = Math.floor(filter / 86400000);

    if (filterSeconds < 60) {
      return `${filterSeconds}초 전`;
    } else if (filterMinutes < 60) {
      return `${filterMinutes}분 전`;
    } else if (filterHours < 24) {
      return `${filterHours}시간 전`;
    } else {
      return `${filterDays}일 전`;
    }
  };
  return (
    <>
      <S.Container>
        <img className='banner' src='/bannerImage.jpg' alt='Example' />
        <div className='buttons'>
          <button onClick={boardClick}>전체보기</button>
          <button onClick={myBoardClick}>내 게시글 보기</button>
          <button onClick={formClick}>글쓰기</button>
        </div>
        <S.FormContainer>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <p className='time'>{filterTime(post.time)}</p>{' '}
                {/* 등록날짜 표시 */}
                <h2>{post.title}</h2>
                <p>{shortenContent(post.content)}</p>
                {/* content는 미리보기식으로 첫줄만 보이고 이후엔 ... 표기 */}
                <p className='image'>{post.image}</p>
                <S.Infor>
                  <span className='material-symbols-outlined'>
                    emoji_nature
                  </span>
                  <p className='nickname'>{post.nickname}</p>
                </S.Infor>
                <p className='comment'>
                  조회 {post.views} • 댓글 {post.commentCount} • 관심{' '}
                  {post.like}
                </p>
                <button className='Detail' onClick={() => detailClick(post.id)}>
                  구경하기
                </button>
              </li>
            ))}
          </ul>
        </S.FormContainer>
      </S.Container>
    </>
  );
};

export default BoardMyList;
