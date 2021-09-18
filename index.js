
/**
     // 1. Create a REST api server used json-server
    // 2. Read documentation of json-server and axios, 
    // 2.1 Learn more about  GET, POST, PUT, PATCH, DELETE
    // 3. Do example with axios to send requests to fjson-server to create new object,
       3.2 update a object with new data , delete a object
 */
    // 1. REST API server 
const url = 'http://localhost:3000/users';
const addBtn = document.querySelector('#add-btn');
const input = document.querySelector('#new-item');
const todoList = document.querySelector('#todo-list');
const saveBtn = document.querySelector('#save-btn');
axios.get(url)
    .then((response) => {
        // console.log(response.data);
        let users = response.data;
        render(users);
    })
    .catch((err) => {
        console.log(err);
    });
// add value in todo-list
addBtn.addEventListener('click', handleClickAdd);
function handleClickAdd() {
    let newValue = {name: input.value};
    axios.post(url, newValue);
    render();
    input.value = '';

}
// handle click  delete button
todoList.addEventListener('click', handleClickDelete);
function handleClickDelete(event) {
    let btn = event.target;
    let i = btn.dataset.deleteId;
    // console.log(i);
    if( i === 0  || i) {
        axios.delete(url + '/' + i);
        render();
    }
}
// handle edit button
todoList.addEventListener('click', handleClickEdit);
function handleClickEdit(event) {
    let btn = event.target;
    let i = btn.dataset.editId;
    // console.log(i);
    if(i === 0 || i) {
        addBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        axios.get(url + '/' + i)
            .then((response) => {
                // console.log(response.data);
                let item = response.data;
                input.value = item.name;
            })
            .catch((err) => {
                console.log(err);
            });
        saveBtn.addEventListener('click', handleClickSave);
        function handleClickSave() {
            let item = {name: input.value};
            axios.patch(url + '/' + i, item);
            render();
        }
    }
}
      // handle save value edited
 saveBtn.addEventListener('click', handleClickSave);
        function handleClickSave() {
            let item = {name: input.value};
            // console.log(JSON.stringify(item));
            console.log(i);
            axios.put(url + '/' + i, item);
            render();
        }

// render
function render(users) {
    let list = users.map((item) => {
        return `<li>${item.name}<button data-edit-id = '${item.id}'>Edit</button> <button data-delete-id = '${item.id}'>Delete</button></li>`;
    });
    todoList.innerHTML = list.join('');
}
