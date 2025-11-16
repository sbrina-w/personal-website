import { Color } from 'three';

interface ConfigType {
  width: number;
  height: number;
  halfWidth: number;
  halfHeight: number;
  sceneWidth: number;
  sceneHeight: number;
  dpr: number;
  aspectRatio: number;
  backColor: Color;
  params: {
    param1: number;
    param2: number;
    param3: number;
  };
}

const Config: ConfigType = {
  width: 100,
  height: 100,
  halfWidth: 50,
  halfHeight: 50,
  sceneWidth: 2,
  sceneHeight: 2,
  dpr: 1,
  aspectRatio: 1,
  backColor: new Color(0.96, 0.95, 0.91), // Light background matching #f5f1e8
  params: {
    param1: 0.5,
    param2: 0.003,
    param3: 0.6,
  },
};

export default Config;
