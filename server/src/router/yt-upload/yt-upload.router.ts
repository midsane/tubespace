import { Router } from 'express'
import { authMiddleware } from '../../middleware/authMiddleware'

import { upload } from '../../middleware/multer'
import { authorize, updateMetaDataYoutube } from '../../controllers/yt-upload/yt-authorize&update'
import { getAccessToken, startSession } from '../../controllers/yt-upload/yt-startSession'


const router = Router()

router.use(authMiddleware)

router.patch('/update-meta-data', upload.single("thumbnail"), updateMetaDataYoutube)
router.get('/authorize', authorize)
router.post('/get-accessToken', getAccessToken)

export { router }