dir_array = ['index_profile.html', 'js', ['index.js'], 'css', ['index.css']];
multi_array=['index_profile.html', 'js', ['index.js', 'cpp',['index.cpp']], 'css', ['index.css']]

function dirTree(array) {
    let curr = 0;
    if (curr === array.length) return "";
    let str = '<ul>';
    while (curr < array.length) {
        str += '<li>';
        if (curr < array.length - 1 && typeof array[curr] === "string" && typeof array[curr + 1] !== "string") {
            str += array[curr] + dirTree(array[curr + 1]);
            curr += 2;
        } else if (typeof array[curr] === "string") {
            str += array[curr];
            curr++;
        }
        str += '</li>';
    }
    str += '</ul>';
    return str;
}

function printTree() {
    document.getElementById("single").innerHTML = dirTree(dir_array);
    document.getElementById("multi").innerHTML = dirTree(multi_array);
}

printTree();