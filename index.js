import React , {Component,Children} from 'react'
import {findDomNode} from 'react-dom'
import PropTypes from 'prop-types'
import cs from 'classname'
import debounce from './util/debounce'
import throttle from './util/throttle'
import getScrollNode from './util/getScrollNode'
import isInView from './util/isInView'
 
class LazyLoad extends Component{
    constructor(props){
        this.state = {
            isVisible:false 
        }
    }

    getEventHandler(){
        let debounce = this.props.debounce,
            throttle = this.props.throttle;
        if(debounce){
            return debounce(this.loadCurrentNode,throttle)
        }else{
            return throttle(this.loadCurrentNode,throttle)
        }
    }

    componentDidMount(){
        let scrollNode = getScrollNode(findDomNode(this))
        loadCurrentNode()
        document.body.addEventListener("resize",this.getEventHandler())
        scrollNode.addEventListener("scroll",this.getEventHandler())
    }

    componentWillUnmount(){ 
        let scrollNode = getScrollNode(findDomNode(this))
        document.body.removeEventListener("resize")
        scrollNode.removeEventListener("scroll")
    }

    shouldComponentUpdate(){    
        return this.props.isVis
    }

    loadCurrentNode(){
        if(isInView(findDomNode(this),getOffset())){
            this.setState({isVisible:true})
        }
    }

    getOffset(){
        let {threshold,offsetTop,offsetBottom,offsetLeft,offsetRight,offsetVertical,offsetHorizontal} = this.props
        let _offsetVertical = offsetVertical || threshold,
            _offsetHorizontal = offsetHorizontal || threshold,
            _offsetTop = offsetTop || offsetVertical,
            _offsetBottom = offsetTop || offsetVertical,
            _offsetLeft = offsetLeft || offsetHorizontal,
            _offsetRight = offsetRight || offsetHorizontal,
        return {
            top:_offsetTop,
            bottom:_offsetBottom,
            left:_offsetLeft,
            right:_offsetRight
        }
    }

    render(){
        let {isVisible} = this.state
        return <div className={cs(isVisible?'isNotVisible':'')}>
                    {isVisible?this.props.children : ''}
               </div>
    }
}

LazyLoad.PropTypes = {
    debounce:PropTypes.bool.isRequired,
    throttle:PropTypes.number.isRequired,
    threshold:PropTypes.number.isRequired,
    offsetVertical:PropTypes.number.isRequired,
    offsetHorizontal:PropTypes.number.isRequired,
    offsetTop:PropTypes.number.isRequired,
    offsetBottom:PropTypes.number.isRequired,
    offsetLeft:PropTypes.number.isRequired,
    offsetRight:PropTypes.number.isRequired,
}

LazyLoad.defaultProps = {
    debounce:false,
    throttle:250,
    threshold:200,
    offsetVertical:0,
    offsetHorizontal:0,
    offsetTop:0,
    offsetBottom:0,
    offsetLeft:0,
    offsetRight:0
}