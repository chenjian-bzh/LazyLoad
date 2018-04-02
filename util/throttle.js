function throttle(fn,throttle){
    let timeout = null 
    let lastfire  = new Date()
    return function(){
        let context = this,
            args = arguments;
        if((lastfire - new Date())>throttle){
            fn.apply(context,args)
            lastfire =  new Date()
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(context,args)
            lastfire = new Date()
        }, throttle); 
    }
}

export default throttle