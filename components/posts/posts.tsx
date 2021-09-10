import { sentence, paragraph } from "txtgen"
import { PostState } from "./postsSlice"

export const posts: PostState[] = [
  {
    date: "July 17, 2021",
    editedDate: null,
    image: "/images/cover_1.jpg",
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
      `
  },
  {
    date: "July 15, 2021",
    editedDate: null,
    image: "/images/cover_2.jpg",
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
      `
  },
  {
    date: "June 15, 2021",
    editedDate: null,
    image: "/images/cover_3.jpg",
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
      `
  },
  {
    date: "December 20, 2020",
    editedDate: null,
    image: "/images/cover_4.jpg",
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <p>${paragraph()}${paragraph()}</p>
      `
  },
  {
    date: "December 17, 2020",
    editedDate: null,
    image: "/images/cover_5.jpg",
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
      `
  },
  {
    date: "November 15, 2020",
    editedDate: null,
    image: "/images/cover_6.jpg",
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ol>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ol>
      `
  },
  {
    date: "November 15, 2020",
    editedDate: null,
    image: "/images/cover_1.jpg",
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
      `
  },
  {
    date: "November 13, 2020",
    editedDate: null,
    image: "/images/cover_2.jpg",
    title: sentence(),
    content: `
        <p>${paragraph()}${paragraph()}</p>
        <p><br /></p>
        <ol>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
          <li>${sentence()}</li>
        </ol>
      `
  },
]
