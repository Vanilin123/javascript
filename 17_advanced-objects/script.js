const errorMsg = document.getElementById('feedback'),
      form = document.getElementById('form'),
      input = document.getElementById('input'),
      prototypeList = document.getElementById('prototype');

function errorMes(msg) {
    input.classList.add('is-invalid');
    errorMsg.textContent = msg;
}

async function errorCheck() {
    const request = input.value;
    try {
        if (request.endsWith('.js')) { 
            const module = await import(`./modules/${request}`);
            moduleClass(module.default);
        } else {       
            windowClass(request);
        }
    } catch(error) {
        if(error.name === 'TypeError') error.message = 'Пусто'
        errorMes(error.message);
    }
}

function windowClass(currentClass) {
    if (!Object.hasOwn(window, currentClass)) {
        throw new Error('Данный класс отсутствует в Window')
    }
    if (typeof window[currentClass] != 'function') {
        throw new Error('Не является функцией-конструктором')
    }
    prototypeList.textContent = '';
    prototypeAdd(window[currentClass].prototype);
    chainAdd(window[currentClass].prototype);    
}

function moduleClass(currentClass) {
    prototypeList.textContent = '';
    prototypeAdd(currentClass.prototype);
    chainAdd(currentClass.prototype);    
}

function prototypeAdd(classProto) {
    let listItem = document.createElement('li');
    listItem.textContent = classProto.constructor ? classProto.constructor.name : 'Без названия'
    listItem.append(listAdd(classProto));
    prototypeList.append(listItem); 
}

function chainAdd(classProto) { 
    if(Object.getPrototypeOf(classProto) != null) {        
        let objPrototype = Object.getPrototypeOf(classProto),
            listItem = document.createElement('li');
        listItem.textContent = objPrototype.constructor ? objPrototype.constructor.name : 'Без названия'
        listItem.append(listAdd(objPrototype));
        prototypeList.append(listItem);
        chainAdd(objPrototype);
    }
}

function listAdd(currentPrototype) {
    let list = document.createElement('ol');    
    const descriptors = Object.getOwnPropertyDescriptors(currentPrototype);
    Object.entries(descriptors).map(([key,value]) => {
        let item = document.createElement('li');
        item.textContent = `"${key}", ${value.get ? typeof value.get : typeof value.value}`;
        list.append(item);
    })
    return list;
}

form.addEventListener('submit', el => {
    el.preventDefault();
    errorCheck();
})

input.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    errorMsg.textContent = '';
})
