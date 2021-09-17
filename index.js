
/**
     // 1. Tạo một REST api server sử dụng json-server
    // 2. Đọc documentation của json-server và axios, 
    tìm hiểu các method GET, POST, PUT, PATCH, DELETE
    // 3. Làm các ví dụ sử dụng axios để gửi các request lên json-server để tạo object mới,
    update 1 object với dữ liệu mới, xoá 1 object
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
