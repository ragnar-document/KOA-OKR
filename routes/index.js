const router = require('koa-router')({
    prefix:'/api'
})

const testController = require('./../controllers/test.js');
const userController = require('./../controllers/user.js');
const historyController = require('./../controllers/history.js');
const projectController = require('./../controllers/project.js');
const relevanceController = require('./../controllers/relevance.js');

router.get('/test', testController.test);
router.post('/login', userController.login);
router.post('/project/created', projectController.insert);
router.put('/project/edit/:id', projectController.updata);
router.get('/project/details/:id', projectController.details);
router.post('/project/delete/:id', projectController.delItem);
router.get('/project/list/:id', projectController.all);
router.delete('/project/list/:id', projectController.homeDelItem);
router.get('/project/list/item/:id', projectController.singleItem);
router.post('/relevance', relevanceController.insert);
router.get('/relevance/:id', relevanceController.all);
router.delete('/relevance/:id', relevanceController.delItem);
router.put('/relevance/details/:id', relevanceController.updata);
router.get('/project/history/:id', historyController.all);

module.exports = router