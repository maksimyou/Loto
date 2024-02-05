function generateIndexLine() {
    let arr = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const check = (index, num) => {
        for (let k = 0; k < 6; k++) {
            if (arr[k][index] === num) return true;
        }
        return false;
    };

    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 5; i++) {
            let num;

            let index = Math.floor(Math.random() * 9);

            while (arr[j][index] !== 0) {
                index = Math.floor(Math.random() * 9);
            }

            if (index === 8) {
                num = Math.floor(
                    index * 10 + Math.random() * ((index + 1) * 10 + 1 - index * 10)
                );
            } else {
                num = Math.floor(
                    index * 10 + Math.random() * ((index + 1) * 10 - index * 10)
                );
            }

            while (check(index, num)) {
                if (index === 8) {
                    num = Math.floor(
                        index * 10 + Math.random() * ((index + 1) * 10 + 1 - index * 10)
                    );
                } else {
                    num = Math.floor(
                        index * 10 + Math.random() * ((index + 1) * 10 - index * 10)
                    );
                }
            }

            arr[j][index] = num;
        }
    }

    let arr2 = [];
    for (let i = 0; i < 9; i++) {
        let arrr = [];
        for (let j = 0; j < 6; j++) {
            arrr.push(arr[j][i]);
        }
        arr2.push(arrr);
    }
    let res = arr2.map((j) => {
        let copy = j.concat([]);
        let subarr = j.sort().filter((e) => e !== 0);

        return copy.map((h) => {
            if (h !== 0) {
                return subarr.shift();
            } else {
                return h;
            }
        });
    });

    return res;
}


function generatorChips() {
    let num = Math.floor(Math.random() * 90) + 1;
    while (drum.includes(num)) {
        num = Math.floor(Math.random() * 90) + 1;
    }
    drum.push(num);
    return num;
}





function creacteElemennt(tag, clas = '', text = '') {
    let elem = document.createElement(tag)
    if (clas !== '') elem.classList.add(clas)
    elem.textContent = text;
    return elem;
}



function generateTable(obj, id) {
    let tableWrap = creacteElemennt('div', 'table-wrap');
    let title = creacteElemennt('div', 'title', `Билет № ${id}`);
    let table1 = creacteElemennt('table');
    let table2 = creacteElemennt('table');
    let tr1 = creacteElemennt('tr');
    let tr2 = creacteElemennt('tr');
    let tr3 = creacteElemennt('tr');
    let tr4 = creacteElemennt('tr');
    let tr5 = creacteElemennt('tr');
    let tr6 = creacteElemennt('tr');
    table1.append(tr1, tr2, tr3);
    table2.append(tr4, tr5, tr6);
    tableWrap.append(title, table1, table2);
    for (let i = 1; i <= 54; i++) {
        if (i <= 9) {
            if (obj[i]) {
                tr1.append(creacteElemennt('td', `td${id}`, obj[i]))
            } else {
                tr1.append(creacteElemennt('td', `td${id}`))
            }
        }

        if (i > 9 && i <= 18) {
            if (obj[i]) {
                tr2.append(creacteElemennt('td', `td${id}`, obj[i]))
            } else {
                tr2.append(creacteElemennt('td', `td${id}`))
            }
        }

        if (i > 18 && i <= 27) {
            if (obj[i]) {
                tr3.append(creacteElemennt('td', `td${id}`, obj[i]))
            } else {
                tr3.append(creacteElemennt('td', `td${id}`))
            }
        }

        if (i > 27 && i <= 36) {
            if (obj[i]) {
                tr4.append(creacteElemennt('td', `td${id}`, obj[i]))
            } else {
                tr4.append(creacteElemennt('td', `td${id}`))
            }
        }
        if (i > 36 && i <= 45) {
            if (obj[i]) {
                tr5.append(creacteElemennt('td', `td${id}`, obj[i]))
            } else {
                tr5.append(creacteElemennt('td', `td${id}`))
            }
        }
        if (i > 45 && i <= 54) {
            if (obj[i]) {
                tr6.append(creacteElemennt('td', `td${id}`, obj[i]))
            } else {
                tr6.append(creacteElemennt('td', `td${id}`))
            }
        }
    }
    return tableWrap;
}


function Registration(login, password, email) {
    let data = {
        login, password, email
    };
    console.log(data)
    fetch('http://89.104.66.35:5000/api/user/registration', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(respon => respon.json())
        .then(data => {
            localStorage.setItem('token', JSON.stringify({ token: data.token }))
            localStorage.setItem('login', JSON.stringify({ login: data.login, id: data.id }))
            console.log(data)
            getTicketsUser(data.id)
            if (data) {
                let reg = document.querySelector(".modal-registration-content");
                reg[0].value = '';
                reg[1].value = '';
                reg[2].value = '';
                autho.children[0].style.display = 'none';
                autho.children[1].style.display = 'none';
                panel.style.display = 'block'
                loginn.textContent = data.login;
                autho.append(loginn)
                autho.append(exit)
                document.querySelector(".modal-registration").style.display = 'none';
            }
        })
        .catch()
}

function Join(login, password) {
    let data = {
        login, password
    };
    console.log(data)
    fetch('http://89.104.66.35:5000/api/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(respon => respon.json())
        .then(data => {
            localStorage.setItem('token', JSON.stringify({ token: data.token }))
            localStorage.setItem('login', JSON.stringify({ login: data.login, id: data.id }))
            console.log(data)
            getTicketsUser(data.id)
            if (data.token) {
                let join = document.querySelector(".modal-join-content");
                join[0].value = '';
                join[1].value = '';
                autho.children[0].style.display = 'none';
                autho.children[1].style.display = 'none';
                panel.style.display = 'block'
                loginn.textContent = data.login;
                autho.append(loginn)
                autho.append(exit)
                document.querySelector(".modal-join").style.display = 'none';
                document.querySelector(".message2").textContent = ''
            }
        })
        .catch(
            document.querySelector(".message2").textContent = 'Указан неверный пароль логин'
        )
}


function getTicketsUser(id) {
    let data = {
        idUser: id
    };
    console.log(data)
    fetch('http://89.104.66.35:5000/api/tickets/get-user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(respon => respon.json())
        .then(data => {
            localStorage.setItem('tickets-user', JSON.stringify(data))
            console.log(data)
        })
        .catch(
            console.log('Билеты пользователя не получены')
        )
}



function setTickets(data) {

    console.log(data)
    fetch('  http://89.104.66.35:5000/api/tickets/set', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(respon => respon.json())
        .then(data => {
            console.log(data)
        })
        .catch(
            err => {
                console.log(err, 'Билет не получилось сохранить')
            }
        )

}

function setTicketsUser(arr) {
    let loggin = JSON.parse(localStorage.getItem('login'));
    let data = {
        idUser: loggin.id,
        tickets: arr
    }
    console.log(data)
    fetch('  http://89.104.66.35:5000/api/tickets/set-user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(respon => respon.json())
        .then(data => {
            console.log(data)
        })
        .catch(
            err => {
                console.log(err, 'Билет не получилось сохранить')
            }
        )
}

function checkTickets(obj) {
    console.log(obj)
    fetch('  http://89.104.66.35:5000/api/tickets/verification', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ obj })
    })
        .then(respon => respon.json())
        .then(data => {
            console.log(data)
            if (data) {
                document.querySelector(".save").disabled = false
            } else {
                document.querySelector(".save").disabled = true;
            };
            return data;
        })
        .catch(err => {
            console.log(err, 'Неполадки в проверке уникальности билета')
        }
        )
}



let autho = document.querySelector(".authorization");
let panel = document.querySelector(".panel");
let cells = document.querySelectorAll(".td1");
let exit = creacteElemennt('div', 'exit', 'Выход')
let loginn = creacteElemennt('div', 'login', '')
let arr1;
let drum = [];
let obj = {};
if (localStorage.getItem('token')) {
    let loggg = JSON.parse(localStorage.getItem('login'))
    getTicketsUser(loggg.id)
    autho.children[0].style.display = 'none';
    autho.children[1].style.display = 'none';
    panel.style.display = 'block'
    console.log(loggg)
    loginn.textContent = loggg.login;
    autho.append(loginn)
    autho.append(exit)
}

document.querySelector(".generate").addEventListener("click", () => {
    drum = [];
    // document.querySelector(".number").textContent = `Число: ${}`;
    for (let i = 0; i < 54; i++) {
        cells[i].style.background = "";
    }
    arr1 = generateIndexLine();
    let count = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr1[j][i] === 0) {
                cells[count].textContent = "";
            } else {
                obj[count + 1] = arr1[j][i]
                cells[count].textContent = arr1[j][i];
            }

            count++;
        }
    }
    checkTickets(obj)
});


document.querySelector(".save").addEventListener("click", () => {


    if (!document.querySelector(".save").disabled) {
        let objj = { numbers: obj, ticket: arr1, idd: Date.now().toString() }
        setTickets(objj)
        let arr = JSON.parse(localStorage.getItem('tickets-user'));
        arr.push(objj)
        let idsUser = [];
        arr.forEach(element => {
            idsUser.push(element.idd)
        });
        setTicketsUser(idsUser)
        localStorage.setItem('tickets-user', JSON.stringify(arr))

    }
    obj = {};
    document.querySelector(".save").disabled = true;
})


document.querySelector(".generate2").addEventListener("click", () => {
    let num = generatorChips();
    document.querySelector(".number").textContent = `Число: ${num}`;
    for (let i = 0; i < 54; i++) {
        Number(cells[i].textContent) === num
            ? (cells[i].style.background = "#999")
            : "";
    }
});



document.querySelector(".show").addEventListener("click", () => {
    document.querySelector(".tickets-container").innerHTML = '';
    let arr = JSON.parse(localStorage.getItem('tickets-user'));

    for (let i = 0; i < arr.length; i++) {
        document.querySelector(".tickets-container").append(generateTable(arr[i].numbers, arr[i].idd))
    }
})

document.querySelector(".registration").addEventListener("click", () => {
    document.querySelector(".modal-registration").style.display = 'flex';
})


document.querySelector(".join").addEventListener("click", () => {
    document.querySelector(".modal-join").style.display = 'flex';
})

document.querySelector(".close1").addEventListener("click", () => {
    document.querySelector(".modal-registration").style.display = 'none';
})

document.querySelector(".close2").addEventListener("click", () => {
    document.querySelector(".modal-join").style.display = 'none';
})



document.querySelector(".btn-registration").addEventListener("click", (e) => {
    let reg = document.querySelector(".modal-registration-content");
    if (reg[0].value && reg[1].value && reg[2].value) {
        Registration(reg[0].value, reg[2].value, reg[1].value)
    } else {
        document.querySelector(".message1").textContent = 'Введите корректные данные'
    }
    e.preventDefault()
})

document.querySelector(".btn-join").addEventListener("click", (e) => {
    e.preventDefault()
    let reg = document.querySelector(".modal-join-content");
    if (reg[0].value && reg[1].value) {
        Join(reg[0].value, reg[1].value)
    } else {
        document.querySelector(".message2").textContent = 'Введите корректные данные'
    }
    e.preventDefault()
})


exit.addEventListener('click', () => {
    localStorage.removeItem('token')
    document.querySelector(".tickets-container").innerHTML = '';
    autho.children[0].style.display = 'block';
    autho.children[1].style.display = 'block';
    panel.style.display = 'none'
    loginn.remove()
    exit.remove()
})