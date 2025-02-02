import { format, formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

import { Avatar } from "./Avatar"
import { Comment } from "./Comment"

import styles from "./Post.module.css"
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"


// const comments = [
//   1,
//   2, 
// ];

// estado = variáveis que quero que o componente monitore

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  typeof: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  // Ver a mudança do estado e imutabilidade com setComments
  const [comments, setComments] = useState([
    'pOST BACANUDO'
  ])

  const [newCommentText, setNewCommentText] = useState('')

console.log(newCommentText)

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  )
  
  
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })
  
    //handle = ação do usuário
    function handleCreateNewComment(event: FormEvent) {
      event.preventDefault()
      // const newCommentText = event.target.comment.value

      //  console.log(event.target.comment.value)

      setComments([...comments, newCommentText])
      setNewCommentText("")
      // console.log(comments)

      // event.target.comment.value = "";
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity("") // Resetar o custom value
      setNewCommentText(event.target.value)
      // console.log(event.target.value)
      // console.log("teeeeeeeeeeeeeevwsmfe")
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
      // console.log("Invalido é ",event)
      event.target.setCustomValidity("Esse campo é obrigatório!")
    }

    function deleteComment(commentToDelete: string) {
      // console.log("ss", comment)

      // Imutabilidade = as variáveis não sofrem mutação, nos criamos um novo valor (espaço na memória)

      const commentsWithoutDeletedOne = comments.filter(comment => {
        return comment != commentToDelete;
      })

      setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment" 
          placeholder="Deixe um comentário" 
          value={newCommentText} 
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}

          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment}
              />
            )
        }
        ) 
        }
      </div>
    </article>
  )
}
