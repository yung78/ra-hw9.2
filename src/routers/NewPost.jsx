import {
  Form,
  redirect,
  Link,
} from 'react-router-dom';
import { createPost } from '../posts';

export async function action({ request }) {
  const formData = await request.formData();
  const content = Object.fromEntries(formData).content;
  await createPost(process.env.REACT_APP_URL, content);
  return redirect('/');
}

export default function NewPost() {
  return (
    <div className='new_post'>
      <div className='new_header'>
        <Link to='/'>
          <div className='close'></div>
        </Link>
      </div>
      <div className='new_content'>
        <div className='avatar'></div>
        <Form method='post' className='new_post_form'>
          <textarea 
            className='new_text'
            type='text'
            name='content'
            ></textarea>
          <div className='new_footer'>
            <button className='submit_btn' type='submit'>Опубликовать</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
