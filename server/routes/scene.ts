import * as express from 'express';
import { Request, Response } from 'express';
import { SceneState } from '../models/scene-state';

const router = express.Router();

router.get('/api/scene/:id', [], async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  console.log('get api/scene ', userId);
  try {
    const scene = await SceneState.findOne({ userId });
    return res.json(scene);
  } catch (error: any) {
    return res.status(404).send(`Can't find scene with this id: ${userId}`);
  }
});

router.post('/api/scene', async (req: Request, res: Response) => {
  console.log('post api/scene ');
  try {
    const { cameraPosition, userId } = req.body;
    console.log('req', req.body);
    let sceneState;
    const scene = await SceneState.findOne({ userId: userId });
    if (scene) {
      sceneState = await SceneState.findByIdAndUpdate(scene._id, {
        cameraPosition,
      });
    } else {
      sceneState = SceneState.build({ cameraPosition, userId });
      await sceneState.save();
    }

    return res.json(sceneState);
  } catch (error: any) {
    return res.status(500).send(error?.message);
  }
});

export { router as sceneRouter };
