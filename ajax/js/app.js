document.getElementById('button').addEventListener('click', loadData);

function loadData() {
  //Create an xhr object
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'data.txt', true);

  xhr.onload = function() {
    if(this.status === 200) {
      console.log(this.responseText);
    }
  }
  xhr.readystatechange = function() {
    if(this.status === 200 && this.readyState === 4) {
      console.log(this.responseText);
    }
  }
  xhr.send();
}