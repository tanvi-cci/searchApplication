const element = document.getElementById("searchResults");

const renderutil = function(msg,classes) {
  element.innerHTML = msg;
  element.className = classes;
}

const renderSearchResults = function(request,name) {
  element.innerHTML += `<div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <img src="./Content/img/${name.split(" ")[0].toLowerCase()}-logo.png" width="40">
          ${name}
        </div>
        <div class="card-body" id="${name.split(' ').join('_')}">
          
        </div>
      </div>
    </div>`;
    switch (name) {
        case "Youtube Videos":  JSON.parse(request.response).items.forEach(item => {
            document.getElementById(name.split(' ').join('_')).innerHTML += `<div class="d-flex">
                <iframe width="200" height="170" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <div>
                        <p>${item.snippet.title}</p>
                        <p><a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a></p>
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
                    <p><a target="_blank" href="${item.link}">${item.title}</a></p>
                    <div class="d-flex space-between">
                        <p id="${item.question_id}"></p>
                        <p>
                            <img src="${item.owner.profile_image}" width="16">
                            <a target="_blank" href="${item.owner.link}">${item.owner.display_name}</a>
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
                <p><a target="_blank" href="${item.clone_url}">${item.full_name}</a></p>
                <p>${item.description || " "}</p>
            </div>`;
        });
        break;
        case "Google Search": JSON.parse(request.response).organic_results.forEach(item => {
            document.getElementById(name.split(' ').join('_')).innerHTML += `<div class="d-flex">
                <div>
                <p class="cite">${item.displayed_url}</p>
                    <p><a target="_blank" href="${item.url}">${item.title}</a></p>
                </div>
                <div>
                    
                </div>
            </div>`;
        });
        break;
    }
}

export {renderutil,renderSearchResults};