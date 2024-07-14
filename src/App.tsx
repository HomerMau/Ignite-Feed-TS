import { Header } from './components/Header';
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';

import './global.css';

// o que vai ter
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'http://github.com/HomerMau.png',
      name: 'Tiago Lucas',
      role: 'Programmer'
    },
    content: [

      //BACKEND NÃO RETORNA HTML
             { type: 'paragraph', content: 'Fala galeraa 👋' },
             { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
             { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2024-05-03 20:00:00'),
  },

 {
    id: 2,
    author: {
      avatarUrl: 'http://github.com/diego3g.png',
      name: 'Diego',
      role: 'RocketSeat',
    },
    content: [

      //BACKEND NÃO RETORNA HTML
             { type: 'paragraph', content: 'Fala galeraa 👋' },
             { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portfólio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
             { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2024-05-03 20:00:00'),
  }

]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>


    {posts.map(post => {
    return(
      <Post 
      key={post.id}
      author={post.author}
      content={post.content}
      publishedAt={post.publishedAt}
      />
    )
    })}





          {/* <Post
            author="Diego Fernandes"
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque quas corporis beatae veritatis, reprehenderit asperiores vitae quod possimus qui dignissimos unde deleniti consequatur quae, repellat debitis sunt, est rerum!"
          />
          <Post
            author="Gabriel Buzzi"
            content="Um novo post muito legal"
          /> */}
        </main>
      </div>
    </div>
  )
}
