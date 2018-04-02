import React , {Component,Children} from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import cs from 'classnames'
import debounce from './util/debounce'
import throttle from './util/throttle'
import getScrollNode from './util/getScrollNode'
import isInView from './util/isInView'
 
class LazyLoad extends Component{
    constructor(props){
        super(props)
        this.loadCurrentNode = this.loadCurrentNode.bind(this)
        this.getOffset = this.getOffset.bind(this)
        this.getEventHandler = this.getEventHandler.bind(this)
        //对handler进行包装
        this.loadCurrentNode = this.getEventHandler(props)
        this.state = {
            isVisible:false 
        }
    }

    componentDidMount(){
        this._mounted = true
        let dom = findDOMNode(this)
        let scrollNode = getScrollNode(dom)
        this.loadCurrentNode()
        document.body.addEventListener("resize",this.loadCurrentNode)
        scrollNode.addEventListener("scroll",this.loadCurrentNode)
    }

    componentWillUnmount(){ 
        this._mounted = false
        let scrollNode = getScrollNode(findDOMNode(this))
        document.body.removeEventListener("resize",this.loadCurrentNode)
        scrollNode.removeEventListener("scroll",this.loadCurrentNode)
    }

    shouldComponentUpdate(nextprops,nextstate){    
        if(nextstate.isVisible === this.state.isVisible){
            return false
        } 
        return true
    }

    getEventHandler(props){
        if(props.debounce){
            return debounce(this.loadCurrentNode,props.throttle)
        }else{
            return throttle(this.loadCurrentNode,props.throttle)
        }
    }

    loadCurrentNode(){
        if(!this._mounted){
            return 
        }
        let dom = findDOMNode(this),
            container = getScrollNode(dom);
        if(isInView(dom,container,this.getOffset())){
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
            _offsetRight = offsetRight || offsetHorizontal;
        return {
            top:_offsetTop,
            bottom:_offsetBottom,
            left:_offsetLeft,
            right:_offsetRight
        }
    }

    render(){
        let {isVisible} = this.state
        let {height,width} = this.props
        let style = {}
        if(height && width){
            style = Object.assign(style,{height:height},{width:width})
        }else if(height){
            style = Object.assign(style,{height:height},{width:"100%"})
        }else if(width){

        }else{

        }
        return (<div style={style} className={cs(isVisible?'isVisible':'isNotVisible')}>
                        {isVisible?this.props.children : ''}
                </div>)
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

export default LazyLoad