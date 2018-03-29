
function isInView(element,container,offset){
    let position = getElementPostion(element)
        height = element.offsetHeight,
        width = element.offsetWidth,
        top = 0,//视口的位置
        left = 0,
        bottom = 0,
        right = 0;
    if(container==null || container == window){
        top=window.pageYOffset,
        left=window.pageXOffset
        bottom = top+window.innerHeight
        right = left+window.innerWidth
    }else{
        let cpos = getElementPostion(container)
        top=cpos.top - window.pageYOffset
        left=cpos.left - window.pageXOffset
        bottom=top+container.offsetHeight
        right =left+container.offsetWidth
    }
    return top<=position.top+height+offset.top && 
           bottom>=position.top-offset.bottom && 
           left<=postion.left+width+offset.left && 
           right>=postion.left-offset.right     
}

function getElementPostion(element){
    let rect = element.getBoundingClientRect()
    return {
        top:rect.top + window.pageYOffset,
        left:rect.left + window.pageXoffset
    }
}

export default isInView 