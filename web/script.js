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

const downloadArea = document.querySelector(".download-area"),
dwlndBtn = downloadArea.querySelector('a');

let file;

const reader = new FileReader();
const fileByteArray = [];
let arrayBuffer;

dropArea.classList.add('invisible')
funcArea.classList.add('invisible')
downloadArea.classList.add('invisible')

startBtn.onclick = ()=>{
  infoArea.classList.add('invisible')
  dropArea.classList.remove('invisible')
}

fileBtn.onclick = ()=>{
  input.click();
}

input.addEventListener("change", function(){

  file = this.files[0];
  if (file['type'] != 'application/vnd.ms-excel') {
    alert('Можно преобразовать только файл .xls!')
  } else {
    reader.readAsArrayBuffer(file);
    reader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        arrayBuffer = evt.target.result,
          array = new Uint8Array(arrayBuffer);
        for (const a of array) {
          fileByteArray.push(a);
        }
        // console.log(fileByteArray)
      }
    }

    dropArea.classList.add("active");
    getFile(); 
  }
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

  if (file['type'] != 'application/vnd.ms-excel') {
    alert('Можно преобразовать только файл .xls!')
  } else {
    reader.readAsArrayBuffer(file);
    reader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        arrayBuffer = evt.target.result,
          array = new Uint8Array(arrayBuffer);
        for (const a of array) {
          fileByteArray.push(a);
        }
        // console.log(fileByteArray)
      }
    }

    dropArea.classList.add("active");
    getFile(); 
  }
});

function getFile(){
  // console.log(file)
  // console.log(file['name'])
  // // alert('Файл получен');
  dropArea.classList.add('invisible')
  funcArea.classList.remove('invisible')
  fnamepTag.textContent = 'Файл "' + file['name'] + '" получен'
}

transformBtn.onclick = () => {
  // alert(funcName.value)
  eel.process(fileByteArray, funcName.value)
  funcArea.classList.add('invisible')
  downloadArea.classList.remove('invisible')
  dwlndBtn.setAttribute('href', funcName.value + '.m')
}

// dwlndBtn.addEventListener('click', (event)=>{
//   eel.destroy(funcName.value + '.m')
// })