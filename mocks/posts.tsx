import { paragraph, sentence } from 'txtgen'

import { PostState } from '~/services/postApi'

export const posts: PostState[] = [
  {
    date: '2021-09-14',
    updatedDate: null,
    image: '/images/cover_1.jpg',
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ul>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ul>
      `,
  },
  {
    date: '2021-08-24',
    updatedDate: null,
    image: '/images/cover_2.jpg',
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ol>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ol>
      `,
  },
  {
    date: '2021-08-20',
    updatedDate: null,
    image: '/images/cover_3.jpg',
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ol>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ol>
      `,
  },
  {
    date: '2021-08-13',
    updatedDate: null,
    image: '/images/cover_4.jpg',
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <p>${paragraph()}${paragraph()}</p>
      `,
  },
  {
    date: '2021-07-18',
    updatedDate: null,
    image: '/images/cover_5.jpg',
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ol>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ol>
      `,
  },
  {
    date: '2020-09-25',
    updatedDate: null,
    image: '/images/cover_6.jpg',
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ol>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ol>
      `,
  },
  {
    date: '2020-09-23',
    updatedDate: null,
    image: '/images/cover_1.jpg',
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ol>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ol>
      `,
  },
  {
    date: '2020-08-11',
    updatedDate: null,
    image: '/images/cover_2.jpg',
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ol>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ol>
      `,
  },
]
