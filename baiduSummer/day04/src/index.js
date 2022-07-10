import _ from 'lodash'
import "./style.less"

class EventEmitter {
    constructor() {
        this.event = {};
    }

    on(evt, listener) {
        (this.event[evt] || (this.event[evt] = [])).push(listener);
    }

    emit(evt) {
        (this.event[evt] || []).slice().forEach((lsn) => lsn());
    }
}

let view = {
    // viewer
    render(module) {
        if (!module) return;
        let htmlStr = '';
        for (let i = 0; i < module.length; i++) {
            htmlStr +=
                `<tr>
                    <td>${module[i].pname}</td>
                    <td>${module[i].page}</td>
                </tr>`;
        }
        document.getElementById("list").innerHTML = htmlStr;
    }
};


class Module {
    constructor() {
        this.__value = [];
        this.__view = view;
        this.__event = new EventEmitter();
        this.__event.on('add', this.__view.render);
    }

    push(value) {
        this.__value.push(value);
        this.__event.emit('add');
    }

    get() {
        return this.__value;
    }
}

let module = new Module();

let controller = {
    add(module) {
        let namebar = document.getElementById("name");
        let agebar = document.getElementById("age");
        if (namebar.value !== null && agebar.value !== null) {
            module.push({pname: namebar.value, page: agebar.value});
            view.render(module.get());
            namebar.value = '';
            agebar.value = '';
        }
    },

    upload(module) {
        localStorage.setItem("list", JSON.stringify(module.get()));
        console.log(module.get());
    },

    removeall(module) {
        module.__value.splice(0, module.__value.length);
        view.render(module.get());
    }
};


document.getElementById("save").addEventListener("click", (event) => {
    controller.add(module);
});

document.getElementById("upload").addEventListener("click", (event) => {
    controller.upload(module);
});

document.getElementById("remove").addEventListener("click", (event)=>{
    controller.removeall(module);
});


let loadInfo = function () {
    if (localStorage)
        module.__value = JSON.parse(localStorage.getItem("list"));
    if (module.__value === null) module.__value = [];
    view.render(module.get());
}

window.onload = loadInfo;