var API_KEY = "AIzaSyCnoeqqdqePcIosHHDLp5Gzqyd7BRSibA0";
var access_key = "b339311e4b0b86c475e9e00898d14f02";
var video = '';
var stack = '';
var google = '';
document.getElementById("basic-addon2").addEventListener('click', function(event){
    event.preventDefault();
    var search = document.getElementById("search").value;
    videoSearch(API_KEY,search,10);
    stackoverflowSearch(search,10);
    gitSearch(search);
    googleSearch(access_key,search,10)
    });

function videoSearch(key,search,max_results) {
    document.getElementById("searchResults").innerHTML = "";
    var data1 = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + max_results + "&q=" + search;
    var request = new XMLHttpRequest();
    request.open('GET', data1);
    request.send();
    request.onload = ()=>{
        console.log(JSON.parse(request.response));
        video= `<div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <img src="./Content/img/youtube-logo.png" width="40">
            Youtube Videos
          </div>
          <div class="card-body" id="videos">
            
          </div>
        </div>
      </div>`;
        document.getElementById("searchResults").innerHTML += video;
         JSON.parse(request.response).items.forEach(item => {
            video = `<iframe width="200" height="170" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <div>
                        <p>${item.snippet.title}</p>
                        <p>${item.snippet.description}</p>
                    </div>`;
            document.getElementById("videos").innerHTML += video;
        });
    }
}

function stackoverflowSearch(search,max_results) {
    document.getElementById("searchResults").innerHTML = "";
    var data1 = "https://api.stackexchange.com/2.3/search?order=desc&sort=activity&tagged=" + search + "&site=stackoverflow&pageSize=" + max_results;
    var request = new XMLHttpRequest();
    request.open('GET', data1);
    request.send();
    request.onload = ()=>{
        console.log(JSON.parse(request.response));
        stack = `<div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <img src="./Content/img/stackoverflow-logo.png" width="30">
            Stack Overflow
          </div>
          <div class="card-body" id="stackoverflow">
            
          </div>
        </div>
      </div>`;
      document.getElementById("searchResults").innerHTML += stack;
        JSON.parse(request.response).items.forEach(item => {
            stack = `<div class="d-flex">
                <div>
                    <p>${item.score} votes</p>
                    <p>${item.answer_count} answers</p>
                    <p>${item.view_count} views</p>
                </div>
                <div>
                    <p><a href="${item.link}">${item.title}</a></p>
                </div>
            </div>`;
            document.getElementById("stackoverflow").innerHTML += stack;
        });
    }
}

function gitSearch(search) {
    document.getElementById("searchResults").innerHTML = "";
    var data1 = "https://api.github.com/search/users?q=" + search + " in:name";
    var request = new XMLHttpRequest();
    request.open('GET', data1);
    request.send();
    request.onload = ()=>{
        console.log(JSON.parse(request.response));
        git = `<div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <img src="./Content/img/github-logo.png" width="30">
            Github repos
          </div>
          <div class="card-body" id="github">
            
          </div>
        </div>
      </div>`;
      document.getElementById("searchResults").innerHTML += git;
        JSON.parse(request.response).items.forEach(item => {
            git = `<div class="d-flex">
                <div>
                    <p>${item.score} votes</p>
                    <p>${item.answer_count} answers</p>
                    <p>${item.view_count} views</p>
                </div>
                <div>
                    <p><a href="${item.link}">${item.title}</a></p>
                </div>
            </div>`;
            document.getElementById("github").innerHTML += git;
        });
    }
}

function googleSearch(key,search,max_results) {
    document.getElementById("searchResults").innerHTML = "";
    var data1 = "http://api.serpstack.com/search?access_key=" + key + "&gl=in&query=" + search;
    console.log(data1);
    var request = new XMLHttpRequest();
    request.open('GET', data1);
    request.send();
    request.onload = ()=>{
        console.log(JSON.parse(request.response));
        google = `<div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <img src="./Content/img/google-logo.png" width="30">
            Google Search results
          </div>
          <div class="card-body" id="google">
            
          </div>
        </div>
      </div>`;
      document.getElementById("searchResults").innerHTML += google;
        JSON.parse(request.response).organic_results.forEach(item => {
            console.log(item);
            google = `<div class="d-flex">
                <div>
                    <p>${item.title}</p>
                </div>
                <div>
                    
                </div>
            </div>`;
            document.getElementById("google").innerHTML += google;
        });
    }
}
