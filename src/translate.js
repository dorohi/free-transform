export default ({x, y, startX, startY}, onUpdate) => (
  (dragEvent) => {
    x += (dragEvent.pageX || dragEvent.targetTouches[0].pageX) - startX;
    y += (dragEvent.pageY || dragEvent.targetTouches[0].pageY) - startY;
    
    onUpdate({x, y});
    
    startX = dragEvent.pageX || dragEvent.targetTouches[0].pageX;
    startY = dragEvent.pageY || dragEvent.targetTouches[0].pageY;
  }
)
