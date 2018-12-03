const input = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
];

function getObservables(domItem) {
  const mouseEventToCoordinate = mouseEvent => {
    mouseEvent.preventDefault();
    return {
      x: mouseEvent.offsetX, 
      y: mouseEvent.offsetY
    };
  };
  
  const mouseDowns = Rx.Observable.fromEvent(domItem, "mousedown").map(mouseEventToCoordinate);
  const mouseUps = Rx.Observable.fromEvent(domItem, "mouseup").map(mouseEventToCoordinate);

  return { mouseDowns, mouseUps };
}

const domItem = document.getElementById('wrapper');
const outButton = document.getElementById('output');

const xItemWidth = domItem.offsetWidth / 24;
const yItemHeight = domItem.offsetHeight / 7;

const observables = getObservables(domItem);

const coordinateStamp = {
  xd: 0,
  yd: 0,
  xu: 0,
  yu: 0
}

outButton.onclick = (e) => {
  e.preventDefault();
  output(coordinateStamp.xd, coordinateStamp.yd, coordinateStamp.xu, coordinateStamp.yu);
  console.log(input);
}

const valueTransfer = ([x, y]) => {
  return [Math.trunc(x / xItemWidth), Math.trunc(y / yItemHeight)];
}

const output = (xd, yd, xu, yu) => {
  [xd, yd] = valueTransfer([xd, yd]);
  [xu, yu] = valueTransfer([xu, yu]);

  for(i = Math.min(yd, yu); i <= Math.max(yd, yu); i++) {
    for(j = Math.min(xd, xu); j <= Math.max(xd, xu); j++) {
      input[i][j] = true;
    }
  }
  console.log(input);
  return input;
}

Rx.Observable.combineLatest(observables.mouseDowns, observables.mouseUps)
  .map((coords) => console.log(coords))
  .subscribe();

// observables.mouseDowns.subscribe(coordinate => {
//   console.log(`x: ${coordinate.x} y: ${coordinate.y}`)
//   return [coordinateStamp.xd, coordinateStamp.yd] = [coordinate.x, coordinate.y];
// });

// observables.mouseUps.pipe(
//   map(coordinate => [coordinateStamp.xu, coordinateStamp.yu] = [coordinate.x, coordinate.y]),
//   tap((coordinateStamp) => output((coordinateStamp.xd, coordinateStamp.yd, coordinateStamp.xu, coordinateStamp.yu))
  
// )
// .subscribe(coordinate => {
//   console.log(`x: ${coordinate.x} y: ${coordinate.y}`)
// });
