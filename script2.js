
// 로고 이미지 클릭 이벤트 처리
const logo = document.getElementById('logo');
logo.addEventListener('click', function () {
  window.location.href = 'main.html';
});

// localStorage에 들어있던 선택된 책 정보 보여주기
var bookInfo = localStorage.getItem('bookInfo');
var parsedData = JSON.parse(bookInfo);

var container = document.getElementById("container");
// key별로 줄 구분하여 표시
Object.keys(parsedData).forEach(function(key) {
  var value = parsedData[key];
  container.innerHTML += "<strong>" + key.toUpperCase() + ":</strong> " + value + "<br>";
});

var bookTitle = parsedData["제목"];

// search 버튼 누르면 어떤일이 생길까
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
    const bookTitle = parsedData["제목"]; // 책 제목 가져오기
    const searchQuery = bookTitle + ' bgm'; // 검색 쿼리 생성 (책 제목과 "bgm" 키워드 조합)
    searchYouTubeVideos( searchQuery );
});

// YouTube API를 사용하여 동영상 검색
function searchYouTubeVideos(searchQuery) {
    const apiKey = 'AIzaSyDUW0vm7o7EKFR-Zvj4tRMnXnOu8S-gGSA';
    const maxResults = 5; // 가져올 결과 수
  
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}&key=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayVideoResults(data.items);
      })
      .catch(error => {
        console.error('Error searching YouTube videos:', error);
      });
  }

// 검색 결과를 테이블로 표시
function displayVideoResults(videos) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';

  if (videos.length === 0) {
    resultsContainer.innerHTML = "<p>No videos found.</p>";
  } else {
    const table = document.createElement('table');

    videos.forEach((video, index) => {
      const videoTitle = video.snippet.title;
      const videoId = video.id.videoId;
      
    
      // 동영상 제목과 링크를 테이블에 추가 , table 사용!
      const row = document.createElement('tr');
      const numberCell = document.createElement('td');
      const titleCell = document.createElement('td');
      const linkCell = document.createElement('td');
      const videoLink = document.createElement('a');
      videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
      videoLink.target = "_blank"; // 링크를 새 창에서 열도록 설정
      videoLink.textContent = videoTitle;


      numberCell.textContent = (index + 1) + ".";
      titleCell.appendChild(videoLink);
      row.appendChild(numberCell);
      row.appendChild(titleCell);
      row.appendChild(linkCell);
      table.appendChild(row);
    });

    resultsContainer.appendChild(table);
  }
}

  const satisfactionForm = document.getElementById('satisfaction-form');
    
  satisfactionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const selectedOption = document.querySelector('input[name="satisfaction"]:checked');
    
    if (selectedOption) {
      const satisfaction = selectedOption.value;
      
      if (satisfaction === 'yes') {
        alert('만족하셨습니다. 감사합니다!');
      } else if (satisfaction === 'no') {
        alert('만족하지 않으셨습니다. 개선하겠습니다.');
      }
      
      satisfactionForm.reset();
    }
})

  