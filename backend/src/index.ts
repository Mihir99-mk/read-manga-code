import express, { Application, Request, Response } from 'express'
import { MANGA } from '@consumet/extensions'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Application = express()

const PORT: number = 4000 || process.env.PORT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}))

app.get('/', (_req: Request, res: Response) => {
  res.json('Welcome to our manga api')
})

app.post('/search', async (_req: Request, res: Response) => {
  const searchdata: string = _req.body.name

  const manga = new MANGA.MangaDex()
  const result = (await manga.search(searchdata))
  res.json(result)
  if (!result) {
    throw new Error('something occurs!!')
  }
})

app.post('/info', async (_req: Request, res: Response) => {
  const id: string = _req.body.id
  const manga = new MANGA.MangaDex()
  const result = (await manga.fetchMangaInfo(id))
  res.json(result)

  if (!result) {
    throw new Error('something occurs!!')
  }
})

app.post('/manga', async (_req: Request, res: Response) => {
  const chapterId: string = _req.body.chapterId

  const manga = new MANGA.MangaDex()
  const result = (await manga.fetchChapterPages(chapterId))

  res.json(result)

  if (!result) {
    throw new Error('something occurs!!')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
