const router = require('express').Router();
router.use('/', require('./article'));
router.use('/', require('./users'));

module.exports = router;
