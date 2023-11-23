import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routers/Root';
import ErrorPage from './error-page';
import NewPost, { action as newPostAction} from './routers/NewPost';
import Post, { loader as postLoader } from './routers/Post';
import EditPost, { action as editAction } from './routers/EditPost';
import { action as destroyAction } from './routers/Destroy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    id: 'root',
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {errorElement: <ErrorPage />,
        children: [
          {
            path: '/posts/new',
            element: <NewPost />,
            action: newPostAction,
          },
          {
            path: '/posts/:id',
            element: <Post />,
            loader: postLoader,
          },
          {
            path: '/posts/:id/edit',
            element: <EditPost />,
            loader: postLoader,
            action: editAction,
          },
          {
            path: '/posts/:id/destroy',
            action: destroyAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
