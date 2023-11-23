import {
  useLoaderData,
  Form,
} from 'react-router-dom';
import { getPost, formatDate } from '../posts';

export async function loader({ params }) {
  try{
    const id = params.id;
    const post = await getPost(`${process.env.REACT_APP_URL}${id}`);

    if (!post.post) {
      throw new Error('Not Found');
    }

    return post;
  } catch(err) {
    console.log('error')
    throw new Error(err)
  }
}

export default function Post() {
  const { post } = useLoaderData();

  return (
    <> 
      {post ? (
      <div className='post_revew'>
        <article>
          <div className='info'>
            <div className='avatar avatar_review'>
              <img src={post.avatar} alt={'avatar'} className='avatar_img' />
            </div>
            <div>
              <div className='name'>
                {post.name}
              </div>
              <div>
                <span>{post.status}</span>
                <time className='time'>
                  {formatDate(post.created)}
                </time>
              </div>
            </div>
          </div>
          <div className='content'>
            {post.content}
          </div>
        </article>
        <div className='buttons'>
          <Form action='edit'>
            <button className='button' type='submit'>Редактировать</button>
          </Form>
          <Form
            method='post'
            action='destroy'
            onSubmit={(event) => {
              // для отображения по центру ↓
              if (!window.confirm('                     Точно удалить??? 100% ???')) {
                event.preventDefault();
              }
            }}
          >
            <button className='button delete_btn' type='submit'>Удалить</button>
          </Form>
        </div>
      </div>
      ) : (<p> Нет такого поста :(</p>)}
    </>
  );
}
