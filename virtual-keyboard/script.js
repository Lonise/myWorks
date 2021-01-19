
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.continuous = true;
let recognitionWords = '';

let keyboardInput = document.querySelector('.use-keyboard-input');
let counterIndex = 0;
let keyLayout = [];

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    language: false,
    rangeStart: 0,
    rangeEnd: 0,
    voice: false,
    volume: false,
  },


  init() {

    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });

      element.addEventListener('click', () => {

        this.properties.rangeStart = keyboardInput.selectionStart;
        this.properties.rangeEnd = keyboardInput.selectionEnd;
      });
      
    });
  },
 
  _createKeys() {
    const fragment = document.createDocumentFragment();

    const keyLayoutEn = [
      ["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", ["[", "{"], ["]", "}"], "enter",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", [";", ":"], ["'", "\""], ["\\", "|"], "mic",
      "shift","done", "z", "x", "c", "v", "b", "n", "m", [",", "<"], [".", ">"], ["/", "?"], "language",
      "space", "left", "right", "volume"
    ];
    
    const keyLayoutRu = [
      "ё", ["1", "!"], ["2", "\""], ["3", "№"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], "backspace",
      "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "enter",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", ["\\", "|"], "mic",
      "shift","done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", [".", ","], "language",
      "space", "left", "right", "volume"
    ];

    const keyboardKeyCode = [
      "192", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187", "8",
       "9", "81", "87", "69", "82", "84", "89", "85", "73", "79", "80", "219", "221", "13",
       "20", "65", "83", "68", "70", "71", "72", "74", "75", "76", "186", "222", "220", "mic",
       "16", "done", "90", "88", "67", "86", "66", "78", "77", "188", "190", "191", "language",
       "32", "37", "39", "volume"
      ];

    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };
     keyLayout = [];

    this.properties.language ? keyLayout = keyLayoutRu : keyLayout = keyLayoutEn;

    if (this.properties.shift) {
      for (let i = 0; i < keyLayout.length; i ++) {
        if (typeof keyLayout[i] === 'object') keyLayout[i].reverse();
      };
    };

    counterKeyIndex = 0;

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "enter", "mic", "language"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.setAttribute("id", `${keyboardKeyCode[counterKeyIndex]}`);
      counterKeyIndex++;
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            if (this.properties.volume) {
              soundKeyBs.play()
            }

            if (this.properties.rangeStart !== this.properties.rangeEnd) {
              this.properties.value = this.properties.value.substring(0, this.properties.rangeStart) + this.properties.value.substring(this.properties.rangeEnd, this.properties.value.length);
              this._triggerEvent("oninput");
              this.properties.rangeEnd = this.properties.rangeStart;
            }
            else {

              this.properties.value = this.properties.value.substring(0, this.properties.rangeStart - 1) + this.properties.value.substring(this.properties.rangeEnd, this.properties.value.length);
              this._triggerEvent("oninput");
              this.properties.rangeStart--;
              this.properties.rangeEnd = this.properties.rangeStart;
            }
            keyboardInput.focus();
            keyboardInput.setSelectionRange(this.properties.rangeStart, this.properties.rangeEnd);       
          });

          break;

        case "tab":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_tab");

          keyElement.addEventListener("click", () => {
            this.properties.value += "  ";
            this._triggerEvent("oninput");
            keyboardInput.focus();
          });
          keyboardInput.focus();
          break;
          
          case "caps":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
            keyElement.innerHTML = createIconHTML("keyboard_capslock");
            this.properties.capsLock ? keyElement.classList.add("keyboard__key--active") : keyElement.classList.remove("keyboard__key--active");

            keyElement.addEventListener("click", () => {
              if (this.properties.volume) {
                soundKeyCaps.play()
              }
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            keyboardInput.focus();
          });
 
          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_up") ;
          this.properties.shift ? keyElement.classList.add("keyboard__key--active") : keyElement.classList.remove("keyboard__key--active");

          keyElement.addEventListener("click", () => {
            if (this.properties.volume) {
              soundKeyShift.play()
            }
            this._toggleShift(); 
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            keyboardInput.focus();
          });
          
          break;

        case "language":
          keyElement.classList.add("keyboard__key--wide");
          let currentLanguage = this.properties.language ? 'ru' : 'en';
          keyElement.innerHTML = createIconHTML("language") + currentLanguage;

          keyElement.addEventListener("click", () => {
            
            this.properties.language = !this.properties.language;
    
            while (this.elements.keysContainer.firstChild) {
              this.elements.keysContainer.removeChild(this.elements.keysContainer.firstChild);
            };

            this.elements.keysContainer.appendChild(this._createKeys());
            this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
  
            keyElement.innerHTML = createIconHTML("language") + currentLanguage;
            keyboardInput.focus();
          });

          break;

        case "volume":
          keyElement.classList.add("keyboard__key--wide");
           this.properties.volume ? keyElement.innerHTML = createIconHTML("volume_up") : keyElement.innerHTML = createIconHTML("volume_off");
          keyElement.addEventListener("click", () => {
            keyElement.innerHTML === '<i class="material-icons">volume_off</i>' ? keyElement.innerHTML = '<i class="material-icons">volume_up</i>' :  keyElement.innerHTML = '<i class="material-icons">volume_off</i>';
            this.properties.volume = !this.properties.volume;
          })
          
          break;  

        case "mic":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = createIconHTML("mic_off");
          let repeatedStrings = '';
          keyElement.addEventListener("click", () => {
            keyElement.innerHTML === '<i class="material-icons">mic_off</i>' ? keyElement.innerHTML = '<i class="material-icons">mic</i>' :  keyElement.innerHTML = '<i class="material-icons">mic_off</i>';
            
            this.properties.language ? recognition.lang = "ru-RU" : recognition.lang = "en-US";
            this.properties.voice = !this.properties.voice;
            if ( this.properties.voice) {
              recognition.addEventListener('result', e => {
                const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
                
                if (e.results[0].isFinal) {
                  recognitionWords = transcript.replace(repeatedStrings, '')
                  repeatedStrings = transcript;
                  this.properties.value = this.properties.value.substring(0, this.properties.rangeStart) + recognitionWords + this.properties.value.substring(this.properties.rangeEnd, this.properties.value.length);
                  this.properties.rangeStart += recognitionWords.length;
                  this.properties.rangeEnd = this.properties.rangeStart;               
                  keyboardInput.setSelectionRange(this.properties.rangeStart, this.properties.rangeEnd); 
                  this._triggerEvent("oninput");
                }
              })

              recognition.start();
            }
            else {
              recognition.stop();
              recognitionWords = '';
              intRes = '';

            }
            keyboardInput.focus();
          });

          
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            if (this.properties.volume) {
              soundKeyEnter.play()
            }

            this.properties.value = this.properties.value.substring(0, this.properties.rangeStart) + "\n" + this.properties.value.substring(this.properties.rangeEnd, this.properties.value.length);
            this.properties.rangeStart++;
            this.properties.rangeEnd = this.properties.rangeStart;
            this._triggerEvent("oninput");
            keyboardInput.focus();
            keyboardInput.setSelectionRange(this.properties.rangeStart, this.properties.rangeEnd); 
          });

          
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.rangeStart) + " " + this.properties.value.substring(this.properties.rangeEnd, this.properties.value.length);
            this.properties.rangeStart++;
            this.properties.rangeEnd = this.properties.rangeStart;           
            this._triggerEvent("oninput");

            keyboardInput.focus();
            keyboardInput.setSelectionRange(this.properties.rangeStart, this.properties.rangeEnd); 
          });
          break;
        
        case "left":
          keyElement.classList.add("keyboard__key--wide");;
          keyElement.innerHTML = createIconHTML("arrow_left");
          keyElement.addEventListener('click', () => {

            if (this.properties.rangeStart > 0) {
              this.properties.rangeStart--;
              this.properties.rangeEnd--;   
              keyboardInput.setSelectionRange(this.properties.rangeStart, this.properties.rangeEnd);
            } 
            keyboardInput.focus();

          });
          break;

        case "right":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("arrow_right");
          keyElement.addEventListener('click', () => {

            if (this.properties.rangeEnd < this.properties.value.length) {
              this.properties.rangeStart++;
              this.properties.rangeEnd++;   
              keyboardInput.setSelectionRange(this.properties.rangeStart, this.properties.rangeEnd); 
            }
            keyboardInput.focus();
          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
            
          });

          break;

        default:
          if (typeof key === 'object' ) {
            keyElement.textContent = key[0]
          }
          else {
            if (this.properties.capsLock && this.properties.shift) {
              keyElement.textContent = key.toLowerCase();
            }
            else if (this.properties.capsLock || this.properties.shift) {
              keyElement.textContent = key.toUpperCase();
            }
            else {
              keyElement.textContent = key.toLowerCase();
            }
          };

          keyElement.addEventListener("click", () => {
            if (this.properties.volume) {
              if (this.properties.language) {
                soundRuKeys.play()
              } else {
                soundEnKeys.play()
              }
              
            };
            let currentKey = key;
            if (typeof key === 'object' ) {
              currentKey = currentKey[0]
            }
            else {
              if (this.properties.capsLock && this.properties.shift) {
                currentKey = currentKey.toLowerCase();
              }
              else if (this.properties.capsLock || this.properties.shift) {
                currentKey = currentKey.toUpperCase();
              }
              else {
                currentKey = currentKey.toLowerCase();
              }
            };
            this.properties.value = this.properties.value.substring(0, this.properties.rangeStart) + currentKey + this.properties.value.substring(this.properties.rangeEnd, this.properties.value.length);
            this.properties.rangeStart++;
            this.properties.rangeEnd = this.properties.rangeStart;
            this._triggerEvent("oninput");
            keyboardInput.focus();
            keyboardInput.setSelectionRange(this.properties.rangeStart, this.properties.rangeEnd);
          });
          
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

   handleDown(keyboardKey) {

    switch(keyboardKey.key) {

      case"Enter":
        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.rangeStart) + "\n" + Keyboard.properties.value.substring(Keyboard.properties.rangeEnd, Keyboard.properties.value.length);
        Keyboard.properties.rangeStart++;
        Keyboard.properties.rangeEnd = Keyboard.properties.rangeStart;
      break;

      case"Backspace":
        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.rangeStart - 1) + Keyboard.properties.value.substring(Keyboard.properties.rangeEnd, Keyboard.properties.value.length);
        Keyboard.properties.rangeStart--;
        Keyboard.properties.rangeEnd = Keyboard.properties.rangeStart;
      break;

      case"Tab":
        Keyboard.properties.value += "  ";
      break;

      case"CapsLock":
        Keyboard._toggleCapsLock();
        document.getElementById(keyboardKey.keyCode).classList.toggle("keyboard__key--active", Keyboard.properties.capsLock);
      break;

      case"Shift":
        Keyboard._toggleShift();
        document.getElementById(keyboardKey.keyCode).classList.toggle("keyboard__key--active", Keyboard.properties.shift);
      break;
      
      case" ":
      Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.rangeStart) + " " + Keyboard.properties.value.substring(Keyboard.properties.rangeEnd, Keyboard.properties.value.length);
      Keyboard.properties.rangeStart++;
      Keyboard.properties.rangeEnd = Keyboard.properties.rangeStart;
      break;
      
      case"ArrowLeft":
        if (Keyboard.properties.rangeStart > 0) {
          Keyboard.properties.rangeStart--;
          Keyboard.properties.rangeEnd--;   
        } 
      break;

      case"ArrowRight":
        if (Keyboard.properties.rangeStart < Keyboard.properties.value.length) {
          Keyboard.properties.rangeStart++;
          Keyboard.properties.rangeEnd++;   
        } 
      break;

      default:
        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.rangeStart) + keyboardKey.key + Keyboard.properties.value.substring(Keyboard.properties.rangeEnd, Keyboard.properties.value.length);
        Keyboard.properties.rangeStart++;
        Keyboard.properties.rangeEnd = Keyboard.properties.rangeStart;
    }

    document.getElementById(keyboardKey.keyCode).classList.add('active');
    setTimeout(() => {
      document.getElementById(keyboardKey.keyCode).classList.remove('active');
    }, 100);

    },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (this.properties.capsLock && this.properties.shift) {
              key.textContent = key.textContent.toLowerCase();
        }
        else if (this.properties.capsLock || this.properties.shift) {
          key.textContent = key.textContent.toUpperCase();
        }
        else {
          key.textContent = key.textContent.toLowerCase();
        }
      }
    }
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;

    for (let i = 0; i < keyLayout.length; i++) {
      if (typeof keyLayout[i] === 'object') { 
        keyLayout[i].reverse();

        for (const key of this.elements.keys) {
          if (key.childElementCount === 0) {
            if (this.properties.capsLock && this.properties.shift) {
              key.textContent = key.textContent.toLowerCase();
            }
            else if (this.properties.capsLock || this.properties.shift) {
              key.textContent = key.textContent.toUpperCase();
            }
            else {
              key.textContent = key.textContent.toLowerCase();
            }
          };
          if (key.textContent === keyLayout[i][1]) {
              key.textContent = keyLayout[i][0];
          };
        };
      };
    };
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

document.onkeydown = Keyboard.handleDown;


const audioEn = document.createElement("audio");
audioEn.setAttribute("id", "enKey");
audioEn.setAttribute("src", "sound/keys_en.mp3");
audioEn.currentTime = 0;
document.querySelector('body').appendChild(audioEn)

const audioRu = document.createElement("audio");
audioRu.setAttribute("id", "ruKey");
audioRu.setAttribute("src", "sound/keys_ru.mp3");
audioRu.currentTime = 0;
document.querySelector('body').appendChild(audioRu)

const audioEnter = document.createElement("audio");
audioEnter.setAttribute("id", "enterKey");
audioEnter.setAttribute("src", "sound/key_enter.mp3");
audioEnter.currentTime = 0;
document.querySelector('body').appendChild(audioEnter)

const audioBS = document.createElement("audio");
audioBS.setAttribute("id", "bsKey");
audioBS.setAttribute("src", "sound/key_bs.mp3");
audioBS.currentTime = 0;
document.querySelector('body').appendChild(audioBS)

const audioShift = document.createElement("audio");
audioShift.setAttribute("id", "shiftKey");
audioShift.setAttribute("src", "sound/key_shift.mp3");
audioShift.currentTime = 0;
document.querySelector('body').appendChild(audioShift)

const audioCaps = document.createElement("audio");
audioCaps.setAttribute("id", "capsKey");
audioCaps.setAttribute("src", "sound/key_caps.mp3");
audioCaps.currentTime = 0;
document.querySelector('body').appendChild(audioCaps)


const soundRuKeys = document.getElementById('ruKey');
const soundEnKeys = document.getElementById('enKey');
const soundKeyEnter = document.getElementById('enterKey');
const soundKeyBs = document.getElementById('bsKey');
const soundKeyShift = document.getElementById('shiftKey');
const soundKeyCaps = document.getElementById('capsKey');