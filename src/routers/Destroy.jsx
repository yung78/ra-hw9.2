import { redirect } from 'react-router-dom';
import { deletePost } from '../posts';

export async function action({ params }) {
  await deletePost(`${process.env.REACT_APP_URL}${params.id}`);
  return redirect('/');
}
