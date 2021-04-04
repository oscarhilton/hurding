import TILES from "./tiles";
import Water from "./Tiles/Water";
import Floor from "./Tiles/Floor";
import Rock from "./Tiles/Rock";
import Bridge from "./Tiles/Bridge";
import Distraction from "./Tiles/Distraction";
import NeighbourGrid, { NeighbourGridResult } from "./NeighbourGrid";
import Duck from "./Duck";
import Tile, { SIZE as TILE_SIZE }  from "./Tiles/Tile";
import DistractionRadius from "./DistractionRadius";
import Flock from "./Flock";
import ThreeInstance from "./ThreeInstance";
import { World } from "cannon";
import { Scene } from "three";
import Player from "./Player";
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
  levelTiles: Tile[];
  distractions: DistractionRadius[];
  flock: Flock | null;
  player: Player | null;

  constructor(segments: Segment[]) {
    this.segmentsZ = segments;
    this.levelTiles = [];
    this.distractions = [];
    this.flock = null;
    this.player = null;
  }

  returnNeighbouringTiles(xPosition: number, yPosition: number, zPosition: number, currentLevelTiles: Level): NeighbourGridResult {
    // For Z, Z + 1 & Z - 1:
    // [x - 1 & y + 1] [ x & y + 1 ] [+ x + 1 & y + 1]
    // [x - 1 & y    ] [   TILE!   ] [+ x + 1 & y    ]
    // [x - 1 & y - 1] [ x & y - 1 ] [+ x + 1 & y - 1]

    const zA = currentLevelTiles.segmentsZ[zPosition + 1] || null;
    const zC = currentLevelTiles.segmentsZ[zPosition] || null;
    const zB = currentLevelTiles.segmentsZ[zPosition - 1] || null;

    const findNeighbours = (zLevel: Segment) => 
    new NeighbourGrid(
      zLevel.rows[yPosition - 1]?.[xPosition + 1] || null, // TL
      zLevel.rows[yPosition]?.[xPosition + 1] || null, // TM
      zLevel.rows[yPosition + 1]?.[xPosition + 1] || null, // TR
      zLevel.rows[yPosition - 1]?.[xPosition] || null, // ML
      zLevel.rows[yPosition]?.[xPosition] || null, // MM
      zLevel.rows[yPosition + 1]?.[xPosition] || null, // MR
      zLevel.rows[yPosition - 1]?.[xPosition - 1] || null, // BL
      zLevel.rows[yPosition]?.[xPosition - 1] || null, // BM
      zLevel.rows[yPosition + 1]?.[xPosition - 1] || null, // BR
    );

    return {
      layerAboveNeighbours: zA && zA.rows ? findNeighbours(zA) : null,
      layerCurrentNeighbours: zC && zC.rows ? findNeighbours(zC) : null,
      layerBelowNeighbours: zB && zB.rows ? findNeighbours(zB) : null,
    }
  }

  setup(ducks: Duck[], totalDucks: number, world: World, scene: Scene, three: ThreeInstance): void {
    let cameraPosition = null;
    
    // run Z axis loop
    for (var z = 0; z < this.segmentsZ.length; z++) {
      let currentZ = this.segmentsZ[z];
      // run Y axis loop
      for (var y = 0; y < currentZ.rows.length; y++) {
        let currentY = currentZ.rows[y];
        // run X axis loop
        for (var x = 0; x < currentY.length; x++) {
          let neighbouringTiles = this.returnNeighbouringTiles(x, y, z, this);
          switch(currentY[x]) {
            case TILES.water:
              this.levelTiles.push(new Water(neighbouringTiles, x, y, z));
              break;
            case TILES.spawn:
              // Update camera position variable
              cameraPosition = { x: x * TILE_SIZE, y: y * TILE_SIZE };
              // Add the player
              this.player = new Player(x, y, z);
              // Add the ducks
              if (totalDucks > 0) {
                const columnDucks = 10 % totalDucks;
                let currentDuck = 0;
                for (var col = 0; col < columnDucks; col++) {
                  for (var row = 0; row < totalDucks / columnDucks; row++) {
                    ducks.push(new Duck((row / TILE_SIZE) + x * 1.1, (col / TILE_SIZE) + y * 1.1, currentDuck));
                    currentDuck++;
                  }
                }
                this.flock = new Flock(ducks);
              }
            case TILES.floor:
              this.levelTiles.push(new Floor(neighbouringTiles, x, y, z));
              break;
            case TILES.rock:
              this.levelTiles.push(new Rock(neighbouringTiles, x, y, z));
              this.distractions.push(new DistractionRadius(ducks, x, y, z, false, 2, 0.1));
              break;
            case TILES.bridge:
              this.levelTiles.push(new Bridge(neighbouringTiles, x, y, z));
              break;
            case TILES.distraction:
              this.levelTiles.push(new Distraction(neighbouringTiles, x, y, z));
              this.distractions.push(new DistractionRadius(ducks, x, y, z, false, 20));
              break;
            default:
              break;
          }
        }
      }
    }

    if (cameraPosition) {
      three.updateCamera(cameraPosition);
    }

    for (var tile of this.levelTiles) {
      tile.setup(world, scene);
    }
  }
  update(scene: Scene, ducks: Duck[]) {
    for (var distraction of this.distractions) {
      for (var duck of ducks) {
        distraction.computeDistractionAmount(duck);
      }
    }
    if (this.flock !== null) {
      this.flock.update();
    }
    for (var duck of ducks) {
      duck.update();
    }
    return;
  }
}