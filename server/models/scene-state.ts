import * as mongoose from "mongoose";

interface ISceneState {
  cameraPosition: string;
  userId: string;
}

interface SceneStateDoc extends mongoose.Document {
  cameraPosition: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface sceneStateModelInterface extends mongoose.Model<SceneStateDoc> {
  build(attr: ISceneState): SceneStateDoc;
}

const sceneStateSchema = new mongoose.Schema(
  {
    cameraPosition: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SceneState = mongoose.model<SceneStateDoc, sceneStateModelInterface>(
  "SceneState",
  sceneStateSchema
);

sceneStateSchema.statics.build = (attr: ISceneState) => {
  return new SceneState(attr);
};

export { SceneState };
