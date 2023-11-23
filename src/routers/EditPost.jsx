import {
  Form,
  useLoaderData,
  redirect,
  Link,
} from 'react-router-dom';
import { formatDate, updatePost } from '../posts';

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  await updatePost(process.env.REACT_APP_URL, params.id, data.content);
  return redirect(`/posts/${params.id}`);
}

export default function EditPost() {
  const { post } = useLoaderData();

  return (
    <div className='edit_post'>
      <div className='edit_header'>
        <Link to='/'>
          <div className='close'></div>
        </Link>
      </div>
      <div className='edit_content'>
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
        <Form method='post' className='edit_post_form'>
          <textarea 
            className='edit_text'
            type='text'
            name='content'
            defaultValue={post.content}
          >
          </textarea>
          <div className='edit_footer'>
            <button className='submit_btn' type='submit'>Сохранить</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
