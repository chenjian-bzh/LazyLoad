function debounce(fn,timems){
    let timeout= null
    return function(){
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn()
        }, timems);
    }
}

export default debounce