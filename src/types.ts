export type VennState = {
  title: string;
  conclusion: string;
  entries: VennEntry[];
};

export type VennEntry = {
  title: string;
};

export type VennSegment = {
  title: string;
  strokeColor: string;
  fillColor: string;
  cx: number;
  cy: number;
  textX: number;
  textY: number;
  rx: number;
  ry: number;
  rotateAngle: number;
  transform: string;
};
