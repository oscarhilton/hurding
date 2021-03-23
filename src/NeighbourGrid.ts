export interface NeighbourGridResult {
  layerAboveNeighbours: NeighbourGrid | null,
  layerCurrentNeighbours: NeighbourGrid | null,
  layerBelowNeighbours: NeighbourGrid | null,
}

export default class NeighbourGrid {
  TL: string | null;
  TM: string | null;
  TR: string | null;
  ML: string | null;
  MM: string | null;
  MR: string | null;
  BL: string | null;
  BM: string | null;
  BR: string | null;
  constructor(
    TL: string | null,
    TM: string | null,
    TR: string | null,
    ML: string | null,
    MM: string | null,
    MR: string | null,
    BL: string | null,
    BM: string | null,
    BR: string | null,
  ) {
    this.TL = TL;
    this.TM = TM;
    this.TR = TR;
    this.ML = ML;
    this.MM = MM;
    this.MR = MR;
    this.BL = BL;
    this.BM = BM;
    this.BR = BR;
  }
}