let data = new Date().getDate() + '-' + new Date().getMonth() + 1 + '-' + new Date().getFullYear();
let dataRewers = new Date().getFullYear() + '-' + new Date().getMonth() + 1 + '-' + new Date().getDate();

let sortColumnFlag = 'fio',
    sortDirFlag = true

const $app = document.getElementById('app'),
$table = document.createElement('table'),
$tableHead = document.createElement('thead'),
$tableBody = document.createElement('tbody'),

$inputName = document.getElementById('form__name');
$inputSurname = document.getElementById('form__surename');
$inputLastname = document.getElementById('form__lastname');
$inputBirthday = document.getElementById('form__birthday');
$inputStudyStart = document.getElementById('form__startOfTraining');
$inputFaculty = document.getElementById('form__facultaru');

$filterForm = document.getElementById('filter__form'),
$FIOFilterInp = document.getElementById('filter__FIO'),
$BirthdayFilterInp = document.getElementById('filter__Birthday'),
$StartOfTrainingFilterInp = document.getElementById('filter__StartOfTraining'),
$FacultyFilterInp = document.getElementById('filter__Faculty')

$sortAgeBtn = document.getElementById('sort__age'),
$sortFIOBtn = document.getElementById('sort__fio'),

$tableHeadTr = document.createElement('tr'),
$tableHeadThFIO = document.createElement('th'),
$tableHeadThBirthday = document.createElement('th'),
$tableHeadThStartOfTraining = document.createElement('th'),
$tableHeadThFaculty = document.createElement('th'),
$tableDeleteUser = document.createElement('th'),



$tableHeadFIOBtn = document.createElement('button'),
$tableHeadBirthdayBtn = document.createElement('button'),
$tableHeadStartOfTrainingBtn = document.createElement('button'),
$tableHeadFacultyBtn = document.createElement('button');

$table.classList.add('table')
$tableHeadFIOBtn.classList.add('btn', 'btn-outline-primary')
$tableHeadBirthdayBtn.classList.add('btn', 'btn-outline-primary')
$tableHeadStartOfTrainingBtn.classList.add('btn', 'btn-outline-primary')
$tableHeadFacultyBtn.classList.add('btn', 'btn-outline-primary')

$tableHeadFIOBtn.textContent = 'ФИО'
$tableHeadBirthdayBtn.textContent = 'День рождения'
$tableHeadStartOfTrainingBtn.textContent = 'Начало обучения'
$tableHeadFacultyBtn.textContent = 'Факультет'
$tableDeleteUser.textContent = 'Удаление пользователя'

$tableHeadThFIO.append($tableHeadFIOBtn)
$tableHeadThBirthday.append($tableHeadBirthdayBtn)
$tableHeadThStartOfTraining.append($tableHeadStartOfTrainingBtn)
$tableHeadThFaculty.append($tableHeadFacultyBtn)

$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThBirthday)
$tableHeadTr.append($tableHeadThStartOfTraining)
$tableHeadTr.append($tableHeadThFaculty)
$tableHeadTr.append($tableDeleteUser)

$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)

/*Форма*/
const $addForm = document.getElementById('addForm'),
$formName = document.getElementById('form__name'),
$formSurename = document.getElementById('form__surename'),
$formLastname = document.getElementById('form__lastname'),
$formBirthday = document.getElementById('form__birthday'),
$formStartOfTraining = document.getElementById('form__startOfTraining'),
$formFacultary = document.getElementById('form__facultaru');

function createUserTr(oneUser) {
    const $userTr = document.createElement('tr'),
    $userFIO = document.createElement('th'),
    $userBirthday = document.createElement('th'),
    $userStartOfTraining = document.createElement('th'),
    $userFaculty = document.createElement('th'),
    $userDelete = document.createElement('th'),
    $userDeleteBtn = document.createElement('button');

    $userFIO.textContent = oneUser.FIO
    $userBirthday.textContent = oneUser.birthday
    $userStartOfTraining.textContent = oneUser.studyStart
    $userFaculty.textContent = oneUser.faculty
    $userDeleteBtn.textContent = 'Удалить студента'

    $userDeleteBtn.classList.add('btn','btn-danger')

    $userTr.append($userFIO)
    $userTr.append($userBirthday)
    $userTr.append($userStartOfTraining)
    $userTr.append($userFaculty)
$userDelete.append($userDeleteBtn)
$userTr.append($userDelete)


//удаление....//

$userDeleteBtn.addEventListener('click', function () {
    async function deleteStydent() {
        const response = await fetch(`http://localhost:3000/api/students/${oneUser.id}`, {
            method: 'DELETE',
        });
        // можно проверить response
        if (response.status === 404)
            console.log('Не удалось удалить студента, так как его не существует');
        const data = await response.json();
        console.log(data);
        $userTr.remove()
    }
    deleteStydent();
})

return $userTr;

}


function filter(arr, prop, value) {
    return arr.filter(function(oneUser) {
        if (oneUser[prop].includes(value.trim())) return true
    });
}


async function createStydent(arrBack) {
    const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arrBack)
    });
    const data = await response.json();
    return data;
}


async function render() {
    $tableBody.innerHTML = '';
    
    let serwerArr = [];
    async function loadStudent() {
        const response = await fetch('http://localhost:3000/api/students');
        const data = await response.json();
        serwerArr = data;
        console.log(serwerArr);
    }
    await loadStudent();

    console.log(serwerArr);
    
    let copyListData = [...serwerArr];
    for (const oneUser of copyListData) {
        oneUser.FIO = oneUser.name + ' ' + oneUser.surename + ' ' + oneUser.lastname;
    }

    copyListData = copyListData.sort(function(a, b) {
        console.log(a, b);
        let sort = a[sortColumnFlag] < b[sortColumnFlag]
        if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
        return sort ? -1 : 1
    })

    if ($FIOFilterInp.value !== "") {
        copyListData = filter(copyListData, 'FIO', $FIOFilterInp.value)
    }
    
    if ($BirthdayFilterInp.value !== "") {
        copyListData = filter(copyListData, 'birthday', $BirthdayFilterInp.value)
    }
    
    if ($StartOfTrainingFilterInp.value !== "") {
        copyListData = filter(copyListData, 'studyStart', $StartOfTrainingFilterInp.value)
    }
    
    if ($FacultyFilterInp.value !== "") {
        copyListData = filter(copyListData, 'faculty', $FacultyFilterInp.value)
    }
    

    for (const oneUser of copyListData) {
        const $newTr = createUserTr(oneUser)
        $tableBody.append($newTr)
    }
};

render();

$addForm.addEventListener('submit', function (event) {
    event.preventDefault();

    async function createStudent() {
        const response = await fetch('http://localhost:3000/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: $inputName.value.trim(),
                surname: $inputSurname.value.trim(),
                lastname: $inputLastname.value.trim(),
                birthday: $inputBirthday.value.trim(),
                studyStart: $inputStudyStart.value.trim(),
                faculty: $inputFaculty.value.trim(),
                
            })
        });
    }
    createStudent();

    render();
    event.target.reset();
});


$tableHeadFIOBtn.addEventListener('click', function() {
    sortColumnFlag = 'FIO'
    sortDirFlag = !sortDirFlag
    render()
})

$tableHeadBirthdayBtn.addEventListener('click', function() {
    sortColumnFlag = 'birthday'
    sortDirFlag = !sortDirFlag
    render()
})

$tableHeadStartOfTrainingBtn.addEventListener('click', function() {
    sortColumnFlag = 'studyStart'
    sortDirFlag = !sortDirFlag
    render()
})

$tableHeadFacultyBtn.addEventListener('click', function() {
    sortColumnFlag = 'faculty'
    sortDirFlag = !sortDirFlag
    render()
})

/*фильтрация*/

$filterForm.addEventListener('submit', function(event) {
    event.preventDefault()
})

$FIOFilterInp.addEventListener('input', function() {
    render()
})
$BirthdayFilterInp.addEventListener('input', function() {
    render()
})

$StartOfTrainingFilterInp.addEventListener('input', function() {
    render()
})
$FacultyFilterInp.addEventListener('input', function() {
    render()
})
