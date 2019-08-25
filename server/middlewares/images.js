const Storage = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.GCLOUD_BUCKET

const storage = new Storage.Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_FILEPATH,
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const deleteBucket = (filename) => {
  filename = filename.split(`https://storage.googleapis.com/${CLOUD_BUCKET}/`)[1]
  return storage.bucket(CLOUD_BUCKET).file(filename).delete()
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    res.status(400).json({message: 'Your content must be included with 1 image'})
  }
  if (!req.file.mimetype.includes('image')){
    res.status(400).json({message: 'Only image allowed'})
  }

  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        },
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer,
  deleteBucket
}