import { React, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
// import BoardForm from './BoardForm';
import * as S from './BoardList.style';
import axios from 'axios';

const postAtom = atom([]);
function BoardList() {
  let navigate = useNavigate();
  const [posts, setPosts] = useAtom(postAtom);
  useEffect(() => {
    axios
      .get('/BoardList.json')
      .then((response) => {
        setPosts(response.data); //가져온 data가 비어있던 postAtom에 업데이트 됨
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPosts]); //두번째 매개변수로 setPosts 박아둠으로써 상태가 업데이트될 때마다 데이터를 가져오고 컴포넌트를 업데이트

  function detailClick(id) {
    const post = posts.find((post) => post.id === id);
    navigate('/BoardDetail', {
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
  }
  function formClick() {
    navigate('/BoardForm');
  }
  function shortenContent(content) {
    //5글자 이상인 경우 뒤는 ... 으로 요약처리!
    if (content.length > 3) {
      return content.slice(0, 5) + '...';
    }
    return content;
  }
  function filterTime(time) {
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
  }
  return (
    <>
      <S.Container>
        <img className='banner' src='/bannerImage.jpg' alt='Example' />
        <button className='write' onClick={formClick}>
          글쓰기
        </button>
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
}
export default BoardList;
