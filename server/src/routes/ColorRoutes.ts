import { Router } from 'express';
import * as ColorController from '@controllers/ColorController';

const colorRouter = Router();

colorRouter.get('/:name', ColorController.getColorByName);
colorRouter.post('/:name', ColorController.updateColorByName);
colorRouter.put('/:name', ColorController.createColor);
colorRouter.delete('/:name', ColorController.removeColorByName);
colorRouter.get('/', ColorController.getAllColors);

export default colorRouter;
