import TILES from "./tiles";

export class Segment {
  rows: string[][];

  constructor(map: string) {
    this.rows = map.split(',').map(row => {
       return row.split('').filter(character => Object.values(TILES).includes(character));
    }).filter(array => array.length > 0).reverse();
  }
}

export default class Level {
  segmentsZ: Segment[];

  constructor(segments: Segment[]) {
    this.segmentsZ = segments;
  }
}