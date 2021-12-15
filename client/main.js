document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};


let newForm = document.getElementById('new-fortune');
let delSelect = document.getElementById('del-select');
let delForm = document.getElementById('del-form');
let upSelect = document.getElementById('up-select');
let upForm = document.getElementById('up-form');

findFortunes = () => {
    axios.get("http://localhost:4000/api/controller")
    .then(res => renderFortune(res.data, "get"))
}

loadFortunes = () => {
    axios.get("http://localhost:4000/api/controller/load")
    .then(res => populateOptions(res.data));
}

populateOptions = fortunes => {
    fortunes.forEach((fortune, index) => {
        let option = document.createElement('option');
        option.id = `d-${index}`;
        option.value = index;
        option.innerText = fortune.text;
        let clone = option.cloneNode(true);
        clone.id = `u-${index}`;
        delSelect.appendChild(option);
        upSelect.appendChild(clone);
    })
}

addOption = fortune => {
    let { index, text } = fortune;
    let option = document.createElement('option');
    option.id = `d-${index}`;
    option.value = index;
    option.innerText = text;
    let clone = option.cloneNode(true);
    clone.id = `u-${index}`;
    delSelect.appendChild(option);
    upSelect.appendChild(clone);
}


newFortune = e => {
    e.preventDefault();
    let value = e.target.children[1].value;
    let fortune = {
        text: value
    }
    axios.post('http://localhost:4000/api/controller', fortune)
    .then(res => {
        renderFortune(res.data, "post");
        addOption(res.data);
    });

    newForm.reset();
}

deleteFortune = e => {
    e.preventDefault();
    let target = e.submitter.previousElementSibling.value;
    axios.delete(`http://localhost:4000/api/controller/${target}`)
    .then(res => removeOption(res.data));
}

updateFortune = e => {
    e.preventDefault();
    let index = e.target.children[0].value;
    let text = e.target.children[1].children[0].value;
    let obj = {
        index: index,
        text: text
    }
    axios.put(`http://localhost:4000/api/controller/${index}`, obj)
    .then(res => changeOptions(res.data));

    upForm.reset();
}

removeOption = index => {
    document.getElementById(`d-${index}`).remove();
    document.getElementById(`u-${index}`).remove();
}

changeOptions = fortune => {
    let { index, text } = fortune;
    let delOption = document.getElementById(`d-${index}`);
    let upOption = document.getElementById(`u-${index}`);
    delOption.innerText = text;
    upOption.innerText = text;
}

renderFortune = (text, type) => {
    let target;

    let fortune = document.createElement('h3');

    if (type === "get") {
        target = document.getElementById('random-fortune-body');
        fortune.innerText = text;
        fortune.className = "text";
    } else {
        target = document.getElementById('new-fortune-body');
        fortune.innerText = text.text
        fortune.className = "text";
    }

    if (target.children.length === 0) {
        target.style.display = "";
        target.appendChild(fortune);
    } else {
        target.style.display = "";
        let h3 = target.children[0];
        h3.innerText = fortune.innerText;
    }
    
}

document.getElementById('fortuneButton').addEventListener("click", findFortunes);
document.addEventListener("DOMContentLoaded", loadFortunes);
newForm.addEventListener("submit", newFortune);
delForm.addEventListener("submit", deleteFortune);
upForm.addEventListener("submit", updateFortune);