var item = document.querySelector('#item');
var toDoBox = document.querySelector('#to-do-box');

item.addEventListener('keyup', function (event) {
    // console.log(event.key);

    if (event.key == "Enter") {
        addToDo(this.value);
        this.value = "";
    }

})

const addToDo = (item) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${item}
      <i class="ri-close-line"></i>
    `;

    listItem.addEventListener('click', function () {
        this.classList.toggle('done');
    });

    listItem.querySelector('i').addEventListener('click', function () {
        listItem.remove();
        updateLocalStorage();
    });

    toDoBox.appendChild(listItem);
    updateLocalStorage();
};

const updateLocalStorage = () => {
    const items = [];

    // Loop through each list item and add its text content to the items array
    toDoBox.querySelectorAll('li').forEach((item) => {
        items.push(item.textContent.trim());
    });

    // Store the items array in local storage
    localStorage.setItem('toDoItems', JSON.stringify(items));
};

const savedItems = JSON.parse(localStorage.getItem('toDoItems'));
if (savedItems) {
    savedItems.forEach((item) => {
        addToDo(item);
    });
}
