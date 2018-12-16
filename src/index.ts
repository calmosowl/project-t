import { Observable, combineLatest, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const input = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
];

function getObservables(domItem: any) {
  const mouseEventToCoordinate = (mouseEvent: any) => {
    mouseEvent.preventDefault();
    return {
      x: mouseEvent.offsetX, 
      y: mouseEvent.offsetY
    };
  };
  
  const mouseDowns = fromEvent(domItem, "mousedown")
    .pipe(map(mouseEventToCoordinate));

  const mouseUps = fromEvent(domItem, "mouseup")
    .pipe(map(mouseEventToCoordinate));
  // const mouseDowns =  Observable.create((observer:any) => {
  //   observer.fromEvent(domItem, "mousedown").map(mouseEventToCoordinate);
  // });
  // const mouseUps = Observable.create((observer:any) => {
  //   observer.fromEvent(domItem, "mousedown").map(mouseEventToCoordinate);
  // });

  return { mouseDowns, mouseUps };
}

const domItem = document.getElementById('wrapper');
const xItemWidth = domItem.offsetWidth / 24;
const yItemHeight = domItem.offsetHeight / 7;

const observables = getObservables(domItem);

const valueTransfer = ([x, y]: any) => {
  return [Math.trunc(x / xItemWidth), Math.trunc(y / yItemHeight)];
}

const output = (xd: any, yd: any, xu: any, yu: any) => {
  [xd, yd] = valueTransfer([xd, yd]);
  [xu, yu] = valueTransfer([xu, yu]);

  for(let i = Math.min(yd, yu); i <= Math.max(yd, yu); i++) {
    for(let j = Math.min(xd, xu); j <= Math.max(xd, xu); j++) {
      input[i][j] = true;
    }
  }
  console.log(input);
  return input;
}

const combined = combineLatest(observables.mouseDowns, observables.mouseUps);

const subscribe = combined.subscribe(
  ([down, up]) => {
    console.log(`::: Begin at: ${valueTransfer([down.x, down.y])},
    ::: End at: ${valueTransfer([up.x, up.y])}`
                 );
  }
);
