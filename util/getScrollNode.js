/**获取指定节点的第一个可以滚动的父节点 */
function getOverFlowStyle(element){
    return window.getComputedStyle(element).getPropertyValue('overflow')
}

function getScrollNode(node){
    let parent = node
    let overflow = null
    while(parent){
        overflow = getOverFlowStyle(parent)
        if(overflow === 'scroll' || overflow === 'auto'){
            return parent
        }
        parent = parent.parentNode
    }
    return parent
}

export default getScrollNode