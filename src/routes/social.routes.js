import express from 'express';
import socialController from '../controllers/socialAccountController.js';

const router = express.Router();

router.get('/', socialController.list);
router.get('/:id', socialController.getById);
router.post('/', socialController.create);
router.put('/:id', socialController.update);
router.delete('/:id', socialController.delete);

export default router;
