
// 로고 이미지 클릭 이벤트 처리
const logo = document.getElementById('logo');
logo.addEventListener('click', function () {
  window.location.href = 'main.html';
});
 
//URL에서 책 제목 추출
    let params = new URL(location).searchParams;
    var bookTitleFromother = params.get("book-title")

    if ( bookTitleFromother === "" ) {
            //이전 main.html에서 공백란으로 온다면 아무것도 하지 않는다.
    } else {
        searchfunc();
    }

    //function searchfunc

    function searchfunc() {

        //api 호출
        var ajaxhttp = new XMLHttpRequest(); //전체 행사 수를 가져오기 위한 ajax를 사용하기 위해 변수를 선언한다.    
        var jsonhttp = new Object();
        ajaxhttp.onreadystatechange = function () {
            if (ajaxhttp.readyState == 4 && ajaxhttp.status == 200) { //행사 목록을 가져오기 위한 통신에 성공하면 
            jsonhttp = JSON.parse(ajaxhttp.responseText); //받은 데이터를 JSON으로 파싱한다.
            console.log(bookTitleFromother, jsonhttp);
            temp(jsonhttp);
     }
   };
   ajaxhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + bookTitleFromother, true);
   ajaxhttp.send();
 }
 var obj = {};
 var jsonItem;

function next(bookInfo) {
  let jsonItem = JSON.stringify(bookInfo);
  localStorage.setItem("bookInfo", jsonItem);
  window.location.href = 'playlist.html';
}

function temp(jsonhttp) {
  let resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
  let jsonitem = jsonhttp["items"];
  let jsonttl = jsonhttp["totalItems"];
  
  if (jsonttl === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    for (let i = 0; i < jsonitem.length; i++) {
      let book = jsonitem[i]["volumeInfo"];
      let bookInfo = {
        제목: book["title"],
        저자: book["authors"],
        출판사: book["publisher"],
        출판일: book["publishedDate"],
        줄거리: book["description"]
      };
      console.log(bookInfo);
      // keys 배열을 반복하여 정보를 가져와서 HTML에 추가
      let keys = Object.keys(bookInfo);
      let textButton = "";

      textButton += "<button id = choice onclick='next(" + JSON.stringify(bookInfo) + ")'>";
      for (var j = 0; j < keys.length; j++) {
        textButton += keys[j] + ": " + bookInfo[keys[j]] + "<br>";
      }
      textButton += "</button><hr>";
      resultsContainer.innerHTML += textButton;
    }
  }
}

