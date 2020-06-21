const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const thingController = require('../controllers/things');

router.get('/' + '', auth, thingController.listAllThings);
router.post('/', auth, multer, thingController.createThing);
router.get('/:id', auth, thingController.readThing);
router.put('/:id', auth, multer, thingController.updateThing);
router.delete('/:id', auth, thingController.deleteThing);

module.exports = router;