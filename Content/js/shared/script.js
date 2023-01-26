import { searchResults } from "../searchResults.js";
//import { result } from "./util.js";

function search() {
  const search = document.getElementById("search").value;
  searchResults(search);
}

//Init function
function init() {
  const btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", search);
}

init();