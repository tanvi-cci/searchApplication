var API_KEY = "AIzaSyBwiN6vZtxb6amB-J5SScat2HI2NTBZPhw";
var access_key = "b339311e4b0b86c475e9e00898d14f02";
var max_results = 10;
document.getElementById("btnSearch").addEventListener('click', function(event){
    event.preventDefault();
    var search = document.getElementById("search").value;
    validation(search);
    document.getElementById("searchResults").innerHTML = "";
    var data_youtube= "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&type=video&part=snippet&maxResults=" + max_results + "&q=" + search;
    var data_stackflow = "https://api.stackexchange.com/2.3/search?order=desc&sort=activity&tagged=" + search + "&site=stackoverflow&pageSize=" + max_results;
    var data_git = "https://api.github.com/search/repositories?q=" + search;
    var data_google = "http://api.serpstack.com/search?access_key=" + access_key + "&gl=in&query=" + search;

    newRequest(data_youtube,"Youtube Videos");
    newRequest(data_stackflow,"Stack Overflow Questions");
    newRequest(data_git,"GitHub Repos");
    newRequest(data_google,"Google Search");
    });

function validation(search) {
    if(!search) {
        return false;
    }
    return search;
}

function newRequest(data,name) {
    var request = new XMLHttpRequest();
    request.open('GET', data);
    request.send();
    request.onload = ()=>{
        document.getElementById("searchResults").innerHTML += `<div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <img src="./Content/img/${name.split(" ")[0].toLowerCase()}-logo.png" width="40">
            ${name}
          </div>
          <div class="card-body" id="${name.split(' ').join('_')}">
            
          </div>
        </div>
      </div>`;
      renderUI(request,name);
    }
}

function renderUI(request,name) {
    console.log(request,request.response);
    switch (name) {
        case "Youtube Videos":  JSON.parse(request.response).items.forEach(item => {
            document.getElementById(name.split(' ').join('_')).innerHTML += `<div class="d-flex">
                <iframe width="200" height="170" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <div>
                        <p>${item.snippet.title}</p>
                        <p><a href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a></p>
                        <p>${item.snippet.description}</p>
                    </div>
                </div>`;
        });
        break;
        case "Stack Overflow Questions":  JSON.parse(request.response).items.forEach(item => {
            document.getElementById(name.split(' ').join('_')).innerHTML += `<div class="d-flex">
                <div class="summary">
                    <p>${item.score} votes</p>
                    <p>${item.answer_count} answers</p>
                    <p>${item.view_count} views</p>
                </div>
                <div class="description">
                    <p><a href="${item.link}">${item.title}</a></p>
                    <div class="d-flex space-between">
                        <p id="${item.question_id}"></p>
                        <p>
                            <img src="${item.owner.profile_image}" width="16">
                            <a href="${item.owner.link}">${item.owner.display_name}</a>
                        </p>
                    </div>
                </div>
            </div>`;
            item.tags.forEach(function (it,index) {
            var a = document.createElement('a');
            a.href="https://stackoverflow.com/questions/tagged/" + item.tags[index];
            a.className="tags";
            a.innerHTML = item.tags[index];
            document.getElementById(item.question_id).appendChild(a); 
            });
        });
        break;
        case "GitHub Repos": JSON.parse(request.response).items.forEach(item => {
            document.getElementById(name.split(' ').join('_')).innerHTML += `<div>
                <p><a href="${item.clone_url}">${item.full_name}</a></p>
                <p>${item.description || " "}</p>
            </div>`;
        });
        break;
        case "Google Search": JSON.parse(request.response).organic_results.forEach(item => {
            document.getElementById(name.split(' ').join('_')).innerHTML += `<div class="d-flex">
                <div>
                <p class="cite">${item.displayed_url}</p>
                    <p><a href="${item.url}">${item.title}</a></p>
                </div>
                <div>
                    
                </div>
            </div>`;
        });
        break;
    }
}
