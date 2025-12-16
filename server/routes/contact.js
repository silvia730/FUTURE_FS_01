const express = require('express');
const router = express.Router();
const { sendContactEmail, getContactMessages } = require('../controllers/contactController');

router.post('/', sendContactEmail);
router.get('/', getContactMessages);
router.delete('/:id', require('../controllers/contactController').deleteContactMessage);

module.exports = router;
