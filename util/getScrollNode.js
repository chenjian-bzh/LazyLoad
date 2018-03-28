/**获取指定节点的第一个可以滚动的父节点 */
function getOverFlowStyle(element){
    return window.getComputedStyle(element).getPropertyValue('overflow')
}

function getScrollNode(node){
    let parent = node
    let overflow = getOverFlowStyle(parent)
    while(parent){
        if(overflow === 'scroll' || overflow === 'auto'){
            return parent
        }
        parent = node.parentNode
    }
    return parent
}

export default getScrollNode