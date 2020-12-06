exports.pickProps = function(obj,...props){
    if(!obj || typeof obj !== 'object')return obj;
    const tempObj = {};
    Object.keys(obj).forEach(prop=>{
        if(props.includes(prop)){
            tempObj[prop] = obj[prop];
        }
    })
    return tempObj;
}