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
const observables = getObservables(domItem);

// const xDowns, yDowns, xUps, yUps;

observables.mouseDowns.subscribe(coordinate => {
  // xDowns = coordinate.x;
  // yDowns = coordinate.y;
  console.log(`x: ${coordinate.x} y: ${coordinate.y}`)
});

observables.mouseUps.subscribe(coordinate => {
  // xUps = coordinate.x;
  // yUps = coordinate.y;
  console.log(`x: ${coordinate.x} y: ${coordinate.y}`)
  // console.log(xDowns, yDowns, xUps, yUps)
});
