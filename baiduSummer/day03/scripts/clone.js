function clone(parent){
    let allParent = [];
    let allChildren = [];
    function __clone(parent){
        const child = {};
        if(parent == null)
            return null;
        else if(typeof parent!=='object')
            return parent;
        else{
            const idx = allParent.indexOf(parent);
            if(idx!== -1){
                return allChildren[idx];
            }else{
                allChildren.push(child);
                allParent.push(parent);
                for (const key in parent){
                    child[key] = __clone(parent[key])
                }
            }
        }
        return child;
    }
    return __clone(parent);
}

const a = {
    s1:5,
    s2:'s2',
    s3:{
        m1:10,
        m2:'m2'
    }
}

b = clone(a);
console.log('a is ',a, ' and b is', b);