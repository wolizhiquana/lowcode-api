import { Schema, Types, model } from 'mongoose'
import { User, userSchema } from './user'

interface IPage {
  title: string
  description: string
  isPublished: boolean
  pageData: { pageJson: ComponentSchemaJson; nextUId: number }
  user: any
}

export interface ComponentSchemaJson {
  path: number[]
  type: string
  props: Record<string, any>
  formData: Record<string, any>
  children?: Record<string, ComponentSchemaJson>
  childrenOrder?: number[]
}

export const pageSchema = new Schema<IPage>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isPublished: { type: Boolean, required: true },
  pageData: { type: Object, required: true },
  user: { type: new Schema({ name: { type: String, required: true } }) }
})

export const Page = model<IPage>('pages', pageSchema)
