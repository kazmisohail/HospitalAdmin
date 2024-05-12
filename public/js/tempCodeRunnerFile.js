var menuState=false;

function toggleMenu() {
    var menu = document.getElementById("side-menu");
    menu.classList.toggle("open");

    if (menu.classList.contains('open')) {
        console.log("menu state has been set to true")
        menuState = true;
    } else {
        menuState = false;
    }
}