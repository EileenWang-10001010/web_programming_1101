document.getElementById("album2").classList.add("hidden");
document.getElementById("album1").classList.add("album");
var prevImg = document.querySelector(".column");

function displayPreview(imgs) {
    prevImg.classList.remove("selected");

    var displayImg = document.getElementById("display");
    displayImg.src = imgs.src;
    
    imgs.classList.add("selected");
    prevImg = imgs;
  }

function toAlbum1(){
document.getElementById("album1").classList.add("album");
document.getElementById("album1").classList.remove('hidden');
document.getElementById("album2").classList.add("hidden");
}
function toAlbum2(){
    document.getElementById("album2").classList.add("album");
    document.getElementById("album2").classList.remove('hidden');
    document.getElementById("album1").classList.add("hidden");
}