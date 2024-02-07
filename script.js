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

function generateMiniTable(arr, id) {
    let elems = document.querySelectorAll('.cell-mini')
    console.log(arr, elems)
    elems.forEach(e => e.textContent = '')
    document.querySelector('.title-mini').textContent = `Билет № ${id}`


    for (let i = 0; i < elems.length; i++) {
        if (arr[(i + 1)]) elems[i].textContent = arr[(i + 1)];
    }
}

function generateTable(obj, id) {
    let tableWrap = creacteElemennt('div', 'table-wrap');
    tableWrap.addEventListener('click', () => {
        let arr = [tableWrap.dataset.number]
        if (!JSON.parse(localStorage.getItem('tickets-ids'))) {
            localStorage.setItem('tickets-ids', JSON.stringify(arr))
            tableWrap.style.border = '2px solid red';
            save.disabled = false;
        } else {
            let arr2 = JSON.parse(localStorage.getItem('tickets-ids'));
            if (arr2.includes(tableWrap.dataset.number)) {
                tableWrap.style.border = '';
                if (arr2.length >= 2) {
                    let res = arr2.filter(e => e !== tableWrap.dataset.number)
                    localStorage.setItem('tickets-ids', JSON.stringify(res))
                } else {
                    localStorage.removeItem('tickets-ids')
                    console.log('ELFKBKBKBKBKBKB')
                    save.disabled = true;
                }
            } else {
                tableWrap.style.border = '2px solid red';
                localStorage.setItem('tickets-ids', JSON.stringify(arr2.concat(arr)))
                save.disabled = false;
            }
        }
    })
    tableWrap.dataset.number = id;
    let title = creacteElemennt('div', 'title', `Билет № ${id}`);
    let table1 = creacteElemennt('div', 'blank1');
    let table2 = creacteElemennt('div', 'blank2');
    let tr1 = creacteElemennt('div', 'row1');
    let tr2 = creacteElemennt('div', 'row2');
    let tr3 = creacteElemennt('div', 'row3');
    let tr4 = creacteElemennt('div', 'row4');
    let tr5 = creacteElemennt('div', 'row5');
    let tr6 = creacteElemennt('div', 'row6');
    table1.append(tr1, tr2, tr3);
    table2.append(tr4, tr5, tr6);
    tableWrap.append(title, table1, table2);
    for (let i = 1; i <= 54; i++) {
        if (i <= 9) {
            if (obj[i]) {
                tr1.append(creacteElemennt('div', `cell`, obj[i]))
            } else {
                tr1.append(creacteElemennt('div', `cell`))
            }
        }

        if (i > 9 && i <= 18) {
            if (obj[i]) {
                tr2.append(creacteElemennt('div', `cell`, obj[i]))
            } else {
                tr2.append(creacteElemennt('div', `cell`))
            }
        }

        if (i > 18 && i <= 27) {
            if (obj[i]) {
                tr3.append(creacteElemennt('div', `cell`, obj[i]))
            } else {
                tr3.append(creacteElemennt('div', `cell`))
            }
        }

        if (i > 27 && i <= 36) {
            if (obj[i]) {
                tr4.append(creacteElemennt('div', `cell`, obj[i]))
            } else {
                tr4.append(creacteElemennt('div', `cell`))
            }
        }
        if (i > 36 && i <= 45) {
            if (obj[i]) {
                tr5.append(creacteElemennt('div', `cell`, obj[i]))
            } else {
                tr5.append(creacteElemennt('div', `cell`))
            }
        }
        if (i > 45 && i <= 54) {
            if (obj[i]) {
                tr6.append(creacteElemennt('div', `cell`, obj[i]))
            } else {
                tr6.append(creacteElemennt('div', `cell`))
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
                loginn.textContent = data.login;
                autho.classList.add('authorization2')
                autho.append(iconUser)
                autho.append(loginn)
                autho.append(arrowDown)
                autho.append(exit)
                document.querySelector(".modal-registration").style.display = 'none';
                document.querySelector(".message1").textContent = ''
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
                loginn.textContent = data.login;
                autho.classList.add('authorization2')
                autho.append(iconUser)
                autho.append(loginn)
                autho.append(arrowDown)
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

async function checkTickets(obj) {
    console.log(obj)
    await fetch('  http://89.104.66.35:5000/api/tickets/verification', {
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
                save.disabled = false
            } else {
                save.disabled = true;
            };
            return data;
        })
        .catch(err => {
            console.log(err, 'Неполадки в проверке уникальности билета')
        }
        )
}


function leaveGeedback(arr) {
    //let loggin = JSON.parse(localStorage.getItem('login'));
    //let data = {
    //    idUser: loggin.id,
    //    tickets: arr
    //}
    console.log(data)
    fetch('  http://89.104.66.35:5000/api/user/leave-feedback', {
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
                console.log(err, 'Бла бла блаб лаб ла>')
            }
        )
}

function getAllLeaveGeedback() {
    //let loggin = JSON.parse(localStorage.getItem('login'));
    //let data = {
    //    idUser: loggin.id,
    //    tickets: arr
    //}
    console.log(data)
    fetch('  http://89.104.66.35:5000/api/user/get-leave-feedback')
        .then(respon => respon.json())
        .then(data => {
            console.log(data)
        })
        .catch(
            err => {
                console.log(err, 'Бла бла блаб лаб ла>')
            }
        )
}

async function generationManyTicketsWithCheck() {
    let arrAll = [[], [], [], []]
    let objAll = [{}, {}, {}, {}];
    arrAll[0] = generateIndexLine();
    arrAll[1] = generateIndexLine();
    arrAll[2] = generateIndexLine();
    arrAll[3] = generateIndexLine();
    let tickets = [];

    let count = 0;
    for (let k = 0; k < 4; k++) {
        count = 0;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 9; j++) {
                if (arrAll[k][j][i] === 0) {
                    //cells[count].textContent = "";
                } else {
                    objAll[k][count + 1] = arrAll[k][j][i]
                    //cells[count].textContent = arrAll[k][j][i];
                }
                count++;
            }
        }
        tickets.push({ numbers: objAll[k], idd: Date.now() + k.toString(), ticket: arrAll[k] })
    }


    console.log(tickets);



    await fetch('  http://89.104.66.35:5000/api/tickets/verification-some', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tickets)
    })
        .then(respon => respon.json())
        .then(data => {
            console.log(data);

            if (data) {

                localStorage.setItem('tickets-options', JSON.stringify(tickets))
                document.querySelector(".choice-of-tickets-options-items").innerHTML = ''
                for (let i = 0; i < tickets.length; i++) {
                    document.querySelector(".choice-of-tickets-options-items").append(generateTable(tickets[i].numbers, tickets[i].idd))
                }
            } else {
                tickets = [];
                generationManyTicketsWithCheck();
            }
        })
        .catch(err => {
            console.log(err, 'Неполадки в проверке уникальности билета')
        }
        )



    //Promise.all([res1, res2, res3, res4])
    //    .then((values) => {
    //        console.log(values);
    //        if (values[0] && values[1] && values[2] && values[3]) {
    //            for (let i = 0; i < tickets.length; i++) {
    //                document.querySelector(".choice-of-tickets-options-items").append(generateTable(tickets[i].numbers, tickets[i].idd))
    //            }
    //        } else {
    //            tickets = [];
    //            generationManyTicketsWithCheck();
    //        }

    //    });
}



let autho = document.querySelector(".authorization");
let otherTicketsBtn = document.querySelector(".other-tickets-btn");
let save = document.querySelector(".save");
let reviewsWinners = document.querySelector('btn-reviews-winners');
let cells = document.querySelectorAll(".td1");
let exit = creacteElemennt('div', 'exit', 'Выход')
let loginn = creacteElemennt('div', 'login', '')
let arrowDown = creacteElemennt('img', 'arrow-down', '')
let iconUser = creacteElemennt('img', 'user-icon', '')
arrowDown.src = './assets/Arrow - Down Circle.png'
iconUser.src = './assets/Avatar.png'
//let drum = [];
if (localStorage.getItem('token')) {
    let loggg = JSON.parse(localStorage.getItem('login'))
    getTicketsUser(loggg.id)
    autho.children[0].style.display = 'none';
    autho.children[1].style.display = 'none';
    console.log(loggg)
    loginn.textContent = loggg.login;
    autho.classList.add('authorization2')

    autho.append(iconUser)
    autho.append(loginn)
    autho.append(arrowDown)
    autho.append(exit)
}
generationManyTicketsWithCheck()
localStorage.removeItem('tickets-ids');

arrowDown.addEventListener('click', () => {
    let d = window.getComputedStyle(exit)
    if (d.visibility === 'visible') {
        exit.style.visibility = 'hidden';
    } else {
        exit.style.visibility = 'visible';
    }
})



otherTicketsBtn.addEventListener('click', () => {
    generationManyTicketsWithCheck()
})


save.addEventListener("click", () => {
    if (localStorage.getItem('token')) {

        let tickets = JSON.parse(localStorage.getItem('tickets-options'));
        let ticketsIds = JSON.parse(localStorage.getItem('tickets-ids'));
        let res = tickets.filter(g => ticketsIds.includes(g.idd))
        if (!save.disabled) {

            let arr = JSON.parse(localStorage.getItem('tickets-user'));
            for (let n = 0; n < res.length; n++) {
                setTickets(res[n])
                arr.push(res[n])
            }
            let idsUser = [];
            arr.forEach(element => {
                idsUser.push(element.idd)
            });
            setTicketsUser(idsUser)
            localStorage.setItem('tickets-user', JSON.stringify(arr))

        }
        save.disabled = true;
        localStorage.removeItem('tickets-ids');
        localStorage.removeItem('tickets-options');
        generationManyTicketsWithCheck();
    } else {
        document.querySelector('.error-notification').style.display = 'block'
        setTimeout(() => {
            document.querySelector('.error-notification').style.display = 'none'
        }, 3000)
    }
})


//document.querySelector(".generate2").addEventListener("click", () => {
//    let num = generatorChips();
//    document.querySelector(".number").textContent = `Число: ${num}`;
//    for (let i = 0; i < 54; i++) {
//        Number(cells[i].textContent) === num
//            ? (cells[i].style.background = "#999")
//            : "";
//    }
//});



document.querySelector(".show").addEventListener("click", () => {

    if (localStorage.getItem('token')) {
        document.querySelector(".your-tickets").innerHTML = '';
        let yourTicketsTitle = creacteElemennt('div', 'your-tickets-title', 'Ваши билеты')
        let ull = creacteElemennt('ul')

        let arr = JSON.parse(localStorage.getItem('tickets-user'));

        for (let i = 0; i < arr.length; i++) {
            let elem = creacteElemennt('li', '', `${i + 1}. № ${arr[i].idd}`)
            elem.addEventListener('click', () => {
                generateMiniTable(arr[i].numbers, arr[i].idd)
            })
            ull.append(elem)
        }
        document.querySelector(".your-tickets").append(yourTicketsTitle, ull)
    } else {
        document.querySelector('.error-notification').style.display = 'block'
        setTimeout(() => {
            document.querySelector('.error-notification').style.display = 'none'
        }, 3000)
    }




    //generateTable(arr[i].numbers, arr[i].idd)
})

reviewsWinners.addEventListener('click', () => {
    let id;
    let title;
    let subtitle;

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
    //document.querySelector(".tickets-container").innerHTML = '';
    autho.children[0].style.display = 'flex';
    autho.children[1].style.display = 'flex';
    exit.style.visibility = 'hidden';
    autho.classList.remove('authorization2')
    iconUser.remove()
    arrowDown.remove()
    loginn.remove()
    exit.remove()
})