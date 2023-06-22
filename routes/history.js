var express = require('express');
var router = express.Router();
const histories = require("../controllers/history.controller");
const upload = require("../upload");


router.post('/',
            upload.fields([
                { name: 'analyzeImage', maxCount: 1 },
                { name: 'resultImage', maxCount: 1 }
            ]), 
            histories.create);

router.patch('/:id',
            upload.fields([
            { name: 'analyzeImage', maxCount: 1 },
            { name: 'resultImage', maxCount: 1 }
            ]), 
            histories.updating);

router.delete('/', histories.delete);
router.get('/', histories.getAll);
router.get('/:id', histories.get);

module.exports = router;