


//timer


function timer(time, i){
  if(time == 0) setTimeout(function(){
    alert('Game over!')/*Game over, call the function for this*/},800/*set 800 as transition time for the div */)
  else{
    setTimeout(
      timeRun = () =>{
        while(time != 0){
          time--
          i++
          let a = document.querySelector('.timer')
          a.style= `width:${(time/(time+i)*100)}%;`
          return timer(time, i)
        }
        return 0
      }, 1000)
  }
}



timer(180, 0)


//timer-end

let cuvinte = loadXMLDoc()






let get_word = function(){
  if (cuvinte.length >=1 ) {
    let a = cuvinte[Math.floor(Math.random() * cuvinte.length)];
    if (cuvinte.indexOf(a) > -1) {
      cuvinte.splice(cuvinte.indexOf(a), 1);
    }
    console.log(cuvinte, a);
    return a;
  }else {
    return 0;
  }
}
let cuvant, cheeting = 0;

window.addEventListener('keydown', function(event){
  var key = event.keyCode;
  if (key == 192) {
    cheet();
  } else if (key == 13) {
    if (cheeting) {
      cheet();
    }
  } else {
    console.log('nope');
  }
})

window.addEventListener('click', function(event){
  if (cheeting) {
    cheet_div = document.querySelector('.cheet_div');
    if (event.target.contains(cheet_div)) {
      cheet();
    }
  }
});

window.addEventListener('load', over_and_over_again);

function amestecare(cuvant) {
let array = [];
for (let a of cuvant) {
  array.push(a);
}
var currentIndex = array.length, temporaryValue, randomIndex;
while (0 !== currentIndex) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}
return array;
}

function randomWord(random){
let game_word = document.querySelector('.game_word');
let letters = document.querySelector('.letters');
game_word.innerHTML = '';
letters.innerHTML = '';
Array.from(random).forEach(function(rand){
  let a = document.createElement('div');
  a.classList = 'letter letter_empty';
  game_word.appendChild(a);
  let b = document.createElement('div');
  b.classList = 'letter letter_';
  b.innerHTML = '<div class="letter_span" draggable="true"><span>' + rand.toUpperCase() + '</span></div>';
  letters.appendChild(b);
});
}

function over_and_over_again(){
  cuvant = get_word();
  if (cuvant) {
    randomWord(amestecare(cuvant));
    let fills = document.querySelectorAll('.letter_span');
    let empties = document.querySelectorAll('.letter');
    for(let fill of fills){
      fill.addEventListener('dragstart', dragStart);
      fill.addEventListener('dragend', dragEnd);
    }
    //Loop from empties and call drag events
    for(let empty of empties){
      empty.addEventListener('dragover', dragOver);
      empty.addEventListener('dragenter', dragEnter);
      empty.addEventListener('dragleave', dragLeave);
      empty.addEventListener('drop', dragDrop);
    }
  } else {
    window.alert('nasol asa\nAi terminat jocul, nu mai ai ce face acuma :/\nMai bine asa?');
  }

}

function dragStart(){
 this.classname += ' hold';
 setTimeout(() => this.className = 'invisible', 0);
}

function dragEnd(){
   this.className = 'letter_span';
 }

function dragOver(e){
   e.preventDefault();
 }

function dragEnter(e){
   e.preventDefault();
   this.className += ' hovered';
 }

function dragLeave(){
   if (this.parentElement.className == 'game_word') {
     this.className = 'letter letter_empty';
   } else {
     this.className = 'letter letter_';
   }
 }

function dragDrop(){
   let hold = document.querySelector('.invisible');
   if (this.parentElement.className == 'game_word') {
     this.className = 'letter letter_empty';
   } else {
     this.className = 'letter letter_';
   }
   this.append(hold);
   verifica();
 }

function verifica() {

   let let_empty = document.querySelectorAll('.letter_empty');
   if (verif(cuvant, createWord(let_empty))) {
     over_and_over_again();
   }
 }

function createWord(cuvant) {
   let word = '';
   for(const letter of cuvant){
     if (letter.children[0]) {
       word += letter.children[0].children[0].textContent;
       console.log(word);
     }
   }
   return word;
 }

function verif(cuv1, cuv2){
   if (cuv1.toUpperCase() === cuv2.toUpperCase()) {
     return true;
   }else {
     return false;
   }
 }

function cheet() {
   if (!cheeting) {
     cheeting = 1;
     let a = document.createElement('div');
     a.classList = 'cheet';
     a.innerHTML = '<div class="cheet_div"><input class="cheet_input" type="text" autofocus placeholder="Cheat code..."></div>'
     document.getElementsByTagName('html')[0].appendChild(a);
   } else {
     let ch = document.querySelector('.cheet');
     if (verifying_the_cheet()) {
       console.log('bun');
       activate_the_cheet();
     } else {
       console.log('nu-i bun');
     }

     ch.remove();
     cheeting = 0;
   }
 }

function verifying_the_cheet() {
   let input_cheet = document.querySelector('.cheet_input').value;
   if (input_cheet == 'hahaha') {
     return 1;
   } else {
     return 0;
   }
 }

function activate_the_cheet() {
   let ones = [];
   const letter_span = document.querySelectorAll('.letter_span');
   for (var i = 0; i < cuvant.length; i++) {
     ones.push(cuvant[i].toUpperCase());
   }
   for (var i = ones.length - 1; i >= 0; i--) {
     console.log(i);
     for (const c of letter_span) {
       if (!c.children[1]) {
         if (c.textContent == ones[i]) {
           c.innerHTML += '<div class="cheet_index">' + (i + 1) + '</div>';
           ones.pop();
           console.log(ones);
         }
       }
     }
   }
 }
