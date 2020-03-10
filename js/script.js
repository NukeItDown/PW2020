// punctul 1
  let p1_x = document.getElementById('p1 x')
  let p1_y = document.getElementById('p1 y')
  let res = document.getElementById('Resultat')
  let p1_bth = document.getElementById('sum')

  let sum = (a, b) => {
    return Number(a) + Number(b)
  }

  p1_bth.onclick = () => {res.value = sum(p1_x.value,p1_y.value)}
// punctul 2
  let p2_x = document.getElementById('p2 x')
  let p2_y = document.getElementById('p2 y')
  let p2_bth = document.getElementById('swap')

  let swap = (a, b) => {
    return [b , a]
  }

  p2_bth.onclick = () => {let a = swap(p2_x.value, p2_y.value); p2_x.value = a[0]; p2_y.value = a[1]}
// punctul 3
  let p3_x = document.getElementById('container')
  p3_x.addEventListener("mouseover", function( event ) {   
    event.target.classList.toggle('Verde')
  });
  p3_x.addEventListener("mouseout", function( event ) {   
    event.target.classList.toggle('Verde')
  });

// punctul 4
  let p4_x = document.getElementById('p4')

  for(let i=0;i<10;i++){
    let p = document.createElement('p')
    p.className = i%2 == 0 ?'odd':'even'
    p.innerHTML = "Elementul cu numarul "+(i+1)
    p4_x.append(p)
  }

  let odd = document.querySelectorAll('.odd')
  let even = document.querySelectorAll('.even')
  odd.forEach(element => {
    element.style.background = "#0000FF"
  });
  even.forEach(element => {
    element.style.background = "#FFFF00"
  });
// punctul 5
  let p5_x = document.getElementById('p4')
  let p5_y = document.createElement('ul');
  p5_x.append(p5_y)

  for(let i=0;i<10;i++){
    let li = document.createElement('li');
    li.innerHTML = "Paragraful NR. "+(i+1);
    p5_y.appendChild(li)
  }
// punctul 6
  p5_y.setAttribute("id", "list");
  let setLastChild = () => {
    document.getElementById('list').lastChild.style.background = "violet"
  }
  setLastChild()
// punctul 7
  let p7 = document.getElementById('p7')
  p7_bth = document.createElement('button')
  p7_bth.innerHTML = "Button"
  p7_bth.setAttribute("id", "p7_bth")
  p7.append(p7_bth)
  p7_bth.onclick = () => {p5_y.removeChild(p5_y.childNodes[4])}
// punctul 8
  let p8 = document.getElementById('p8')
  for(let i=0;i<10;i++){
    let div = document.createElement('div');
    div.className = 'cerc';
    p8.append(div)
  }
// punctul 9
  var mass = []
  let p9 = document.getElementById('p9')
  for(let i=0;i<10;i++){
    mass[i] = Math.ceil((Math.random() * 20) + 1)
  }
  mass.sort(function(a, b){return a-b});
  mass.forEach(element => {
    let el = document.createElement('span')
    el.innerHTML = element + ", "
    p9.append(el)
  });

// punctul 10
  setTimeout(function(){
    document.body.style.background = "gray"
  },5000)
// punctul 11
  let listEl = document.getElementById('list')
  
  function timeout() {
    setTimeout(function () {
      let poz = listEl.childNodes.length
      let li = document.createElement('li')
      li.innerHTML = "Paragraful NR. " + (poz+1)
      listEl.lastChild.style.background = "none"
      listEl.appendChild(li)
      setLastChild()
      timeout()
    }, 10000)
  }
  timeout()
// punctul 12
  let p12_bth = document.querySelector('#p12 button')
  let value
  p12_bth.onclick = () => {
    value = p12_bth.innerHTML.split(" ")
    p12_bth.innerHTML = value[0] +" "+(Number(value[1])+1)
  }
// punctul 13
  var arr = []
  let p13 = document.getElementById('p13')
  let count = 10
  for(let i=0;i<count;i++){
    arr[i] = Math.ceil((Math.random() * 20) + 1)
  }
  function showAfterTime(count) {
    setTimeout(function () {
      let el = document.createElement('span')
      el.innerHTML = arr[10-count] + ", "
      p13.append(el);
      if(count != 1){
        showAfterTime(count-1);
      }
      return
    }, 1000);
  }
  showAfterTime(count)
// punctul 14
  let p14_x = document.getElementById('p14')
  let p14_y = document.createElement('ul')
  p14_x.append(p14_y)

  for(let i=0;i<10;i++){
    let li = document.createElement('li')
    li.innerHTML = (i+1)
    li.setAttribute("title",Math.pow((i+1),2))
    p14_y.appendChild(li)
  }