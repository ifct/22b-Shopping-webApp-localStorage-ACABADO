const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

//Mostrar items almacenados
function displayItems(){
    let itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    itemsFromStorage.forEach((item) =>{
        addItemDom(item);
    });
    
}

//AÑADIR NUEVOS ELEMENTOS
//recoge el valor del campo input
function onAddItemSubmit(e){
    //evitar el valor de submit por defecto
    e.preventDefault();

    //almacenamos el valor del campo
    const newItem = itemInput.value;

    //impedir que almacene valores vacios
    if(newItem === ''){
        alert('Introduce un producto');
        return;
    }
    
    //añadir producto al DOM
    addItemDom(newItem);
    //añadir producto a localStorage
    addItemToStorage(newItem);

    //comprobar el estado del tamaño de la lista
    checkUI();
    //reseteamos el campo input
    itemInput.value='';
}

//añadir items al DOM
function addItemDom(item){
    //crear elemento li para agregar a la lista
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    //crear boton pasando las clases del elemento html
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //añadir el elemento li nuevo al ul
    itemList.appendChild(li);
}

// Leer la información que existe en localStorage
function getItemsFromStorage() {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage =[];
    } else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    } 
    return itemsFromStorage;   
}

//añadir item a localStorage
function addItemToStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    //añado el item del formulario al array
    itemsFromStorage.push(item);
    //escribir en localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
// removeItemFromStorage(alqueDoyXDeLosProductos); 
function removeItemFromStorage(item) {
    // Llamar a la función para leer localStorage
    let itemsFromStorage = getItemsFromStorage();
    // "guardar" una copia filtrando el dato a eliminar
    itemsFromStorage = itemsFromStorage.filter((i)=> i!==item);
    // Volver a escribir en localStorage "el inventario" actualizado
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
} 

//crea el boton para appendChild al elemento <li>
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;

    //crear icono pasando las clases del elemento html
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
}

//crea el icono para appendChild al elemento <button>
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className= classes;
    return icon;
}

//ELIMINAR ELEMENTOS DE LA LISTA
//elimina todos los elementos de la lista
function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    // Eliminar el contenido de localStorage
    localStorage.clear();
    //comprobar el estado del tamaño de la lista
    checkUI();
}

//elimina solo el elemento pulsado
function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
    }

    // Eliminar de localStorage
    removeItemFromStorage(e.target.parentElement.parentElement.textContent);
    
    //comprobar el estado del tamaño de la lista
    checkUI();
}



//función de filtrado de productos.
function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) =>{
        const itemName = item.firstChild.textContent.toLocaleLowerCase();
        if(itemName.indexOf(text)!=-1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    }
    );
}

//función que evalua si existen elementos en la lista
//para determinar si muestra o no el campo de filtro y botón de limpiar
function checkUI(){
    //obtener los <li> que hay en el DOM dentro del <ul id="item-List">
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }

}

//listener de captura evento submit
itemForm.addEventListener('submit', onAddItemSubmit);
//listeners de eliminar elementos
clearButton.addEventListener('click', clearItems);
itemList.addEventListener('click', removeItem);
itemFilter.addEventListener('input', filterItems);

//carga la información de los items
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();