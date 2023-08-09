import { Avatar } from './Avatar';
import { Comment } from './Comment';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './Post.module.css'
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
  }
interface Content {
  type: 'link' | 'paragraph';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  date: Date;
  content: Content[];
}

interface PostProps {
  post: PostType
}

export function Post({post }:PostProps) {
  const [comment, setComment] = useState([
    'Este poste ta incrivel!',
  ])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(post.date,"d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBR
  })
  const publishedDateRelativeToNow = formatDistanceToNow(post.date,{
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent ) {
event.preventDefault()

    setComment([...comment, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentText(event: ChangeEvent<HTMLTextAreaElement>){
event.target.setCustomValidity('')
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatorio')
  }

  function deleteComment(contentToDelete:string) {
    const commentWithoutDelete = comment.filter(comment => {
      return comment !== contentToDelete;
    })
    setComment(commentWithoutDelete)
  }

const isNewCommentEmpty = newCommentText == '';
  return(
    <article className={styles.post} >
      <header>
        <div className={styles.author} >
          <Avatar 
          src={post.author.avatarUrl} 
          />
          <div className={styles.authorInfo} >
          <strong>{post.author.name}</strong>
          <span>{post.author.role} </span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={post.date.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if(line.type === 'paragraph') {
            return (<p key={line.content}>{line.content}</p>)
          }
           else if(line.type === 'link') {
            return (<p key={line.content}><a href="">{line.content}</a></p>)
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
      <strong>Deixe seu feedback</strong>

      <textarea 
        name='inputComment'
        placeholder='Deixe um comentario'
        value={newCommentText}
        onChange={handleNewCommentText}
        onInvalid={handleNewCommentInvalid}
        required
      />
      <footer>
        <button
        disabled={isNewCommentEmpty}
        type='submit'
        >Publicar</button>
      </footer>
      
      </form>
      <div className={styles.CommentList}>
        {comment.map(comment => {
          return (
          <Comment key={comment} 
          content={comment}
           onDeleteComment={deleteComment}
           /> )
        })}
      </div>
    </article>
  );
}