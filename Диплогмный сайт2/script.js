let container = document.getElementById("html-codee");

function showMakers(){
    ( document.querySelector('.button-make').style.display = 'block');
    ( document.querySelector('.begin').style.display = 'none');
    const beginCreate = document.createElement("div");
    beginCreate.innerHTML = "<xmp><!DOCTYPE html></xmp> <xmp><head></xmp>";
    beginCreate.className = "beg";
    container.appendChild(beginCreate)

}


function createTitle(){
    let nameTitle = prompt ('Введите название для вкладки страницы', 'название страницы');
    const titleCreate = document.createElement("div");
    titleCreate.innerHTML = '<xmp><title></xmp>' +nameTitle +'<xmp></title></xmp> <xmp></head></xmp><xmp><body></xmp>';
    titleCreate.className = "tit";
    container.appendChild(titleCreate);
    
    const titleWeb = document.createElement("div");
    titleWeb.innerHTML = nameTitle;
    titleWeb.className = "webTit";
    document.querySelector(".html-deign").append(titleWeb);

}
function createH1(){
      let nameH1 = prompt ('Введите название заголовка', 'название заголовка');
      const h1Create = document.createElement("div");
      h1Create.innerText = '<h1>'+nameH1+'</h1>';
      h1Create.className = "headers";
      container.appendChild(h1Create)

      const h1Web = document.createElement("div");
    h1Web.innerHTML = nameH1;
    h1Web.className = "webheaders";
    document.querySelector(".html-deign").append(h1Web);

}
function createP(){
    let nameP = prompt ('Введите текст', 'текст');
      const pCreate = document.createElement("div");
      pCreate.innerText = '<p>'+nameP+'</p>';
      pCreate.className = "paragraph";
      container.appendChild(pCreate)

      const pWeb = document.createElement("div");
      pWeb.innerHTML = nameP;
      pWeb.className = "webparagraph";
    document.querySelector(".html-deign").append(pWeb);

}
function createUl(){
      let nameUl = prompt ('Введите количество пунктов', '0');
      const ulCreate = document.createElement("div");
      ulCreate.innerText = '<ul>';
      ulCreate.className = "list";
      container.appendChild(ulCreate);
      for (let i=0;i<(+nameUl);i++){
            let name = prompt ('Введите название пункта', 'название');
            const ulCreateLi = document.createElement("div");
            ulCreateLi.innerText = '<li>'+name+'</li>';
            ulCreateLi.className = "Lilist";
            container.appendChild(ulCreateLi)

            const liWeb = document.createElement("div");
            liWeb.innerHTML = '*'+name;
            liWeb.className = "webli";
            document.querySelector(".html-deign").append(liWeb);
      }

      const ulCreateEnd = document.createElement("div");
      ulCreateEnd.innerText = '</ul>';
      ulCreateEnd.className = "list";
      container.appendChild(ulCreateEnd);

}
function createImg(){
    let uriImg = prompt ('Введите адрес изображения', 'адрес');
      const imgCreate = document.createElement("div");
      imgCreate.innerText = '<img src="'+uriImg+'"/>';
      imgCreate.className = "image";
      container.appendChild(imgCreate)

      const imgWeb = document.createElement("img");

      imgWeb.src =imgWeb.src=(uriImg);
      
            imgWeb.innerHTML = imgWeb.src;
            imgWeb.className = "webimg";
 
            document.querySelector(".html-deign").append(imgWeb);

}
function createTable(){
      const tableCreate = document.createElement("div");
      tableCreate.innerText = '<table>';   
      tableCreate.className = "table";
      container.appendChild(tableCreate)

      let numberTr = prompt ('Введите количество строк', '0');
      let numberTd = prompt ('Введите количество столбцов', '0');
      const TrCreate = document.createElement("div");
      for (let j=1;j<=(+numberTr);j++){
            const tableCreateTrBegin = document.createElement("div");
            tableCreateTrBegin.innerText = '<tr>';
            tableCreateTrBegin.className = "table";
            container.appendChild(tableCreateTrBegin)

            for (let l=1;l<=(+numberTd);l++){
             let trr = prompt ("Введите содержимое ячейки "+j+"."+l, '...');
             const tableCreateTr = document.createElement("div");
             tableCreateTr.innerText = '<td>'+trr+'</td>';
             tableCreateTr.className = "ttable";      
             container.appendChild(tableCreateTr);
             
             
             const tdWeb = document.createElement("div");

             tdWeb.innerHTML = "|_"+trr+"_|";
             tdWeb.className = "webtr";      
             document.querySelector(".html-deign").append(tdWeb); 

            };
            
            const brbr = document.createElement("br");
            document.querySelector(".html-deign").append(brbr);

            const tableCreateEnd = document.createElement("div");
            tableCreateEnd.innerText = '</tr>';
            tableCreateEnd.className = "table";
            container.appendChild(tableCreateEnd)
      };

      const tableCreateClose = document.createElement("div");
      tableCreateClose.innerText = '</table>';   
      tableCreateClose.className = "table";
      container.appendChild(tableCreateClose)

}

function createEnd(){
      const endCreate = document.createElement("div");
      endCreate.innerHTML = "<xmp></body></xmp>";
      endCreate.className = "end";
      container.appendChild(endCreate);
  
  }