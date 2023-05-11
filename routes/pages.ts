import { Request, Router } from 'express'
import { Page } from '../models/page'
import validateObjectId from '../middleware/validateObjectId'
import { log } from 'console'
import auth from '../middleware/auth'

const pages = Router()

pages.get('/', auth, async (req, res) => {
  const pages = await Page.find()
  const { userId } = req.query

  const resPages = userId
    ? pages.filter((page) => page.user._id.toString() === userId)
    : !req.user?.isAdmin
    ? pages.filter((page) => page.isPublished)
    : pages

  return res.send(resPages)
})

pages.get('/:id', auth, validateObjectId, async (req, res) => {
  const page = await Page.findById(req.params.id)

  if (!page) return res.status(404).send('给定id的页面不存在')

  if (
    !req.user?.isAdmin &&
    page.user._id.toString() !== req.user?._id &&
    !page.isPublished
  )
    res.status(403).send('无权访问此页面')

  res.send(page)
})

pages.post('/', auth, async (req, res) => {
  const page = new Page({
    ...req.body,
    isPublished: false,
    pageData: { componentSchemaJson: { type: 'page', path: [] }, nextUId: 1 },
    user: { _id: req.user?._id, name: req.user?.name }
  })

  await page.save()

  return res.send(page)
})

pages.patch('/:id', auth, async (req, res) => {
  const page = await Page.findById(req.params.id)
  if (!page) return res.status(400).send('给定id的页面不存在')

  if (req.user?._id !== page?.user._id.toString() && !req.user?.isAdmin)
    return res.status(403).send('无权访问此页面')

  const { _id, title, description, isPublished, pageData, user } = req.body

  page.set({
    _id: _id || page._id,
    title: title || page.title,
    description: description || page.description,
    isPublished: isPublished !== undefined ? isPublished : page.isPublished,
    pageData: pageData || page.pageData,
    user: user || page.user
  })

  await page.save()
  res.send(page)
})

pages.delete('/:id', async (req, res) => {
  const page = await Page.findByIdAndRemove(req.params.id)
  if (!page) return res.status(400).send('给定Id的页面不存在')

  res.send(page)
})

export default pages
