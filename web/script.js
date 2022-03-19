const infoArea = document.querySelector(".info"),
startBtn = infoArea.querySelector("button");

const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
fileBtn = dropArea.querySelector("button"),
input = dropArea.querySelector("input");

const funcArea = document.querySelector(".func-area"),
funcName = funcArea.querySelector("input"),
transformBtn = funcArea.querySelector('button');
const fnamepTag = document.getElementById('file-name')

let file;

dropArea.classList.add('invisible')
funcArea.classList.add('invisible')

startBtn.onclick = ()=>{
  infoArea.classList.add('invisible')
  dropArea.classList.remove('invisible')
}

fileBtn.onclick = ()=>{
  input.click();
}

input.addEventListener("change", function(){

  file = this.files[0];
  dropArea.classList.add("active");
  getFile();
});

dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Отпустите, чтобы открыть";
});

dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Перетащите файл, чтобы открыть";
});

dropArea.addEventListener("drop", (event)=>{
  event.preventDefault();
  
  file = event.dataTransfer.files[0];
  getFile();
});

function getFile(){
  console.log(file)
  console.log(file['name'])
  // alert('Файл получен');
  dropArea.classList.add('invisible')
  funcArea.classList.remove('invisible')
  fnamepTag.textContent = 'Файл "' + file['name'] + '" получен'
}

transformBtn.onclick = () => {
  alert(funcName.value)
}