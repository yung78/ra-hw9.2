import {
  Outlet,
  Link,
  Form,
  useLoaderData,
  redirect,
} from 'react-router-dom';
import { getPosts, formatDate} from '../posts';

export async function loader() {
  const posts = await getPosts(process.env.REACT_APP_URL)
  return (posts);
}

export async function action() {
  return redirect('/posts/new');
}

export default function Root() {
  const posts = useLoaderData('root');

  return (
    <div className='container'>
      <div className='container_content'>
        <header className="header">
          <button 
            className='btn'
            type='button'
          >
            <Link to='/'>
              На главную
            </Link>
          </button>
          <Form method='post'>
            <button className='btn' type='submit'>Создать пост</button>
          </Form>
        </header>
        <div className='underheader'></div>
        <div className='outlet'>
          <Outlet />
        </div>
        <>
          {posts.length ? (
            <div className='posts'>
              {posts.map((post) => (
                <Link 
                  className='post'
                  to={`posts/${post.id}`}
                  key={post.id}
                >
                  <article>
                    <div className='info'>
                      <div className='avatar'>
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
                </Link>
              ))}
            </div>
          ) : (
            <p>
              <i>Нет постов</i>
            </p>
          )}
        </>
      </div>
    </div>
  );
}
