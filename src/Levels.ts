import Level, { Segment } from "./Level";

const LevelOne = new Level([
  new Segment(
    `
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
      WWWWWWWWWWWWWWWWWWWW,
    `
  ),
  new Segment(
    `
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXFFFFXXXXXX,
      XXXXXXXXXXFFFFXXXXXX,
      XXXXXXXXXXXXFFXXXXXX,
      XXXXXXXXXXXXX=XXXXXX,
      XXXXXXXXXXXXX=XXXXXX,
      XXXXXXXXFFFFFFXXXXXX,
      XXXXXXXXFFFFFFXXXXXX,
      XXXXXXXXFFFFFFXXXXXX,
      XXXXXXXXFFFFFFXXXXXX,
      XXXXXXXX=XXXXXXXXXXX,
      XXXXXXXX=XXXXXXXXXXX,
      XXXXXXXXFFXXXXXXXXXX,
      XXXXXFFFFFFFFXXXXXXX,
      XXXXXXXFFFF@FFFXXXXX,
      XXXXXXXFFFFFFFFXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
    `
  ),
  new Segment(
    `
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXDXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
      XXXXXXXXXXXXXXXXXXXX,
    `
  ),
]);

export default [LevelOne];