import { faker } from '@faker-js/faker';
import moment from 'moment';

export function formatDate(date) {
  const prettyDate = (
    moment().diff(date, 'year') > 0
    ? moment().diff(date, 'year') + ' years ago'
    : moment().diff(date, 'month') > 0
    ? moment().diff(date, 'month') + ' month ago'
    : moment().diff(date, 'days') > 0
    ? moment().diff(date, 'days') + ' days ago'
    : moment().diff(date, 'hours') > 0
    ? moment().diff(date, 'hours') + ' hours ago'
    : moment().diff(date,'minutes') + ' minutes ago'
  );

  return prettyDate;
};


export async function getPosts(url) {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    return posts.sort((a, b) => a.created > b.created);
  } catch(err) {
    new Error(err);
  }
}

async function getAva() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = response.json();

    return data;
  } catch(err) {
    new Error(err);
  }
}

export async function createPost(url, content) {
  const src = await getAva();
  const name = faker.person.fullName();
  try {
    await fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        content,
        avatar: src[0].url,
        status: 'online',
      }),
    });

    return null;
  } catch(err) {
    new Error(err);
  }
}

export async function getPost(url) {
  try {
    const response = await fetch(url);
    const post = await response.json();

    return post;
  } catch(err) {
    new Error(err);
  }
}

export async function updatePost(url, id, content) {
  try {
    await fetch (`${url}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        content,
      }),
    });

    return null;
  } catch(err) {
    new Error(err)
  }
}

export async function deletePost(url) {
  try {
    await fetch (url, {
      method: 'DELETE',
      });

    return null;
  } catch(err) {
    new Error(err)
  }
  return null;
}
