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
      y: mouseEvent.offsetY,
      t: mouseEvent.target
    };
  };
  
  const mouseDowns = fromEvent(domItem, "mousedown").pipe(map(mouseEventToCoordinate));
  const mouseUps = fromEvent(domItem, "mouseup").pipe(map(mouseEventToCoordinate));

  return { mouseDowns, mouseUps };
}

const domItem = document.getElementById('wrapper');
const xItemWidth = domItem.offsetWidth / 24;
const yItemHeight = domItem.offsetHeight / 7;

const observables = getObservables(domItem);

const valueTransfer = ([x, y]: any) => {
  return [Math.trunc(x / xItemWidth), Math.trunc(y / yItemHeight)];
}

const output = (xd: any, yd: any, xu: any, yu: any, target: any) => {
  [xd, yd] = valueTransfer([xd, yd]);
  [xu, yu] = valueTransfer([xu, yu]);

  for(let i = Math.min(yd, yu); i <= Math.max(yd, yu); i++) {
    for(let j = Math.min(xd, xu); j <= Math.max(xd, xu); j++) {
      if (!input[i][j]) {
        input[i][j] = true;
        createElement(i, j, target);
      } else {
        input[i][j] = false;

      }
    }
  }
  console.log(input);
  return input;
}

const coordinateStamp = {
  xd: 0,
  yd: 0,
  xu: 0,
  yu: 0
}

observables.mouseDowns.subscribe(coordinate => {
  console.log(`::: Begin at: ${valueTransfer([coordinate.x, coordinate.y])}`, coordinate)
  return [coordinateStamp.xd, coordinateStamp.yd] = [coordinate.x, coordinate.y];
});

observables.mouseUps.subscribe(coordinate => {
  console.log(`::: End at: ${valueTransfer([coordinate.x, coordinate.y])}`);
  [coordinateStamp.xu, coordinateStamp.yu] = [coordinate.x, coordinate.y];

  output(coordinateStamp.xd, coordinateStamp.yd, coordinateStamp.xu, coordinateStamp.yu, coordinate.t);
});

function createElement(y: any, x: any, target: any){
  // Надо удалять существующий элемент, если он уже есть. Текущая реализация не 
  // подойдёт, потому что нужно удалять все элементы выделенной области, а не только
  // event.target
  if (target !== domItem) {
    target.remove();
  } else {
    const item = document.createElement('div');
    item.setAttribute('style', `grid-row: ${y + 1}; grid-column: ${x + 1}`);
    item.id = `element-${y}${x}`
    item.textContent=`${x + 1}`;
    domItem.appendChild(item);
  }
}
