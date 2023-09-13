import { Post, PostType } from "./components/Post"
import { Sidebar } from "./components/Sidebar"
import { Header } from "./components/Header"

import styles from './App.module.css'
import './global.css'


const posts:PostType[] = [
  {
    id: 1,
    
    author:{
      avatarUrl: 'https://github.com/pecboll.png',
      name: 'Igor Azevedo',
      role: 'Web Developer'
    },
    content:
    [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'acabei de subir mais um super projeto incrivel. E um projeto sobre uma nova rede social, se quiser da uma olhada passa no meu github 🚀'},
      {type: 'link', content:'github.com/pecboll'}
    ],
    date: new Date('01-02-2003 01:00:00')
  },
  {
    id: 2,
    author:{
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Web Developer'
    },
    content:
    [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'acabei de subir mais um super projeto incrivel. E um projeto sobre uma nova rede social, se quiser da uma olhada passa no meu github 🚀'},
      {type: 'link', content: '<a href=""> github.com/pecboll </a>'}
    ],
    date: new Date('01-02-2003 01:00:00')
  },
]
console.log(posts)
export function App() {
  return (
    <div>
      <Header />
    <div className={styles.wrapper} >
      <Sidebar />

      <main>
        {
          posts.map(posts => {
            return (
            <Post 
            key={posts.id}
            post={posts}
            />
            )
          })
        }
      </main>

    </div>
    </div>
  )
}
