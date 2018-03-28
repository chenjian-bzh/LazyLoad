
function isInView(element,offset){
    let position = getElementPostion(element)
        height = element.clientHeight,
        width = element.clientWidht;
        
}

function getElementPostion(element){
    let rect = element.getBoundingClientRect()
    return {
        top:rect.top + window.pageYOffset,
        left:rect.left + window.pageXoffset
    }
}

export default isInView