import config from 'config'
import mongoose from 'mongoose'
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri =
  'mongodb+srv://2381794917:AION6TtkDO7trP9E@lllowcode.qn6vuw5.mongodb.net/?retryWrites=true&w=majority'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   }
// })
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect()
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 })
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     )
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }

// export default function () {
//   run().catch(console.dir)
// }

export default function () {
  const db = config.get<string>('db')
  mongoose.connect(db).then(() => console.log(`Connected to ${db}...`))
}
