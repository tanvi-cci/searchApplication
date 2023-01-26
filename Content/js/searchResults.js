import { renderutil,renderSearchResults } from "./shared/util.js";

var API_KEY = "AIzaSyBwiN6vZtxb6amB-J5SScat2HI2NTBZPhw";
var access_key = "b339311e4b0b86c475e9e00898d14f02";
var max_results = 10;

const validationEmpty = function validationEmpty(value) {
    if(value){
        return true;
    }
    return false;
}

//calculate the age in days
const listResults = function listResults(search) {
    var data_youtube= "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&type=video&part=snippet&maxResults=" + max_results + "&q=" + search;
    var data_stackflow = "https://api.stackexchange.com/2.3/search?order=desc&sort=activity&tagged=" + search + "&site=stackoverflow&pageSize=" + max_results;
    var data_git = "https://api.github.com/search/repositories?q=" + search;
    var data_google = "http://api.serpstack.com/search?access_key=" + access_key + "&gl=in&query=" + search;
    renderutil("","row");
    newRequest(data_youtube,"Youtube Videos");
    newRequest(data_stackflow,"Stack Overflow Questions");
    newRequest(data_git,"GitHub Repos");
    newRequest(data_google,"Google Search");
}

function newRequest(data,name) {
    var request = new XMLHttpRequest();
    request.open('GET', data);
    request.send();
    request.onload = ()=>{
      renderSearchResults(request,name);
    }   
}

export const searchResults = function searchResults(value) {
    if(!validationEmpty(value)) {
        renderutil("Please enter something!","red text-center");
        return;
    }
    return listResults(value);
}