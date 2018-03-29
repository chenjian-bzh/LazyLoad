
function isInView(element,container,offset){
    let position = getElementPostion(element)
        height = element.offsetHeight,
        width = element.offsetWidth,
        containerPos = {};
    if(container==null || container == window){
        containerPos = {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }
    
        
}

function getElementPostion(element){
    let rect = element.getBoundingClientRect()
    return {
        top:rect.top + window.pageYOffset,
        left:rect.left + window.pageXoffset
    }
}

export default isInView 