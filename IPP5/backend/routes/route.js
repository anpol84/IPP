let express = require('express');
let conctactController = require('../src/contact/contactController');
const router = express.Router();
router.route('/contacts').get(conctactController.getDataControllerfn);
router.route('/contacts/new').post(conctactController.createContactControllerfn);
router.route('/contacts/:id').put(conctactController.updateContactController);
router.route('/contacts/:id').delete(conctactController.deleteContactController);
module.exports = router;