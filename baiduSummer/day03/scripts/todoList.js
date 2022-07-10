let list = {
    undoList: [],
    doneList: []
};


function main() {
    let storage = localStorage.getItem("list");
    if (storage) {
        list = JSON.parse(storage);
        render(list);
    }
    let add_todo = document.getElementById("addTodo");
    let text_todo = document.getElementById("todoText");
    add_todo.addEventListener("click", (event) => {
        if (text_todo.value !== null) {
            list.undoList.push(text_todo.value);
            render(list);
            text_todo.value = '';
        }
    });

    let list_box = document.getElementById("listBox");
    list_box.addEventListener("change", (event) => {
        let target = event.target;
        if (target.dataset.from === 'undo') {
            if (target.tagName === 'INPUT') {
                let index = +target.dataset.index;
                let value = list.undoList.splice(index, 1)[0];
                list.doneList.push(value);
                render(list);
            }
            // else if (target.tagName === 'BUTTON') {
            //     let index = +target.dataset.index;
            //     list.undoList.splice(index, 1);
            //     render(list);
            // }

        } else if (target.dataset.from === 'done') {
            if (target.tagName === 'INPUT') {
                let index = +target.dataset.index;
                let value = list.doneList.splice(index, 1)[0];
                list.undoList.push(value);
                render(list);
            }
            // else if (target.tagName === 'BUTTON') {
            //     let index = +target.dataset.index;
            //     list.doneList.splice(index, 1);
            //     render(list);
            // }

        }
    });

    list_box.addEventListener("click", (event) => {
        let target = event.target;
        if (target.dataset.from === 'undo' && target.tagName === 'BUTTON') {
            let index = +target.dataset.index;
            list.undoList.splice(index, 1);
            render(list);
        } else if (target.dataset.from === 'done' && target.tagName === 'BUTTON') {
            let index = +target.dataset.index;
            list.doneList.splice(index, 1);
            render(list);
        }
    });
}


function render(list) {
    let undoBox = document.getElementById("undo");
    let doneBox = document.getElementById("done");
    let htmlStr = ''
    for (let i = 0; i < list.undoList.length; i++) {
        htmlStr +=
            `<li>
                <input type="checkbox" data-from="undo" data-index="${i}" >
                <span>${list.undoList[i]}</span>
                <button data-from="undo" data-index="${i}" name="delete">删除</button>
            </li>`;
    }
    undoBox.innerHTML = htmlStr;
    htmlStr = '';
    for (let i = 0; i < list.doneList.length; i++) {
        htmlStr +=
            `<li>
                <input type="checkbox" data-from="done" data-index="${i}" checked = true>
                <span>${list.doneList[i]}</span>
                <button data-from="done" data-index="${i}" name="delete">删除</button>
            </li>`;
    }
    doneBox.innerHTML = htmlStr;
}

window.onload = main;