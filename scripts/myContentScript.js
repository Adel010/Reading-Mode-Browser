chrome.runtime.onMessage.addListener(receiveRequest);

function receiveRequest(requestContent, sender, sendResponse){
        if(document.querySelector("article") && document.querySelector("article").id !== "rm-extension"){
            // extractiing article content

            const articleContent = document.querySelector("article").innerHTML;
            // creating the new document structure
            let rmContainer = document.createElement("div");
            const article = document.createElement("article");
            article.innerHTML = articleContent;
            article.id = "rm-extension";
            rmContainer.className = "rm-extension-container";
            rmContainer.appendChild(article);

            // creating the control panel structure

            const controlPanel = document.createElement("div");
            controlPanel.innerHTML = `<div class="rm-main-menu"><p class="panel-title title">Reading mode<br/>control</p><div class="zoom-control-top"><button class="zoom-out" title="Press the - key on your keyboard">-</button><span class="current-val">100%</span><button class="zoom-in" title="Press the + key on your keyboard">+</button></div><button class="reset">Reset</button><br/><button class="full-screen-mode-btn">Fullscreen</button><button class="bg-panel-visibility" id="bg-control-visiblity">Background color</button><button title="Reload the page" class="exit">Exit this mode</button><br/><div class="panel-visibility" title="Hide this panel">▲</div></div>
            <div class="bg-selection-conatiner">
            <p class="bg-selection-title title">Pick a color for the background</p>
            <form class="bg-selector">
                <label class="radio-container" title="White">
                    <input type="radio" name="selected-bg" id="bg1" value="light-white">
                    <span class="custom-radio light-white-radio"></span>
                </label>
                <label class="radio-container" title="Dark mode">
                    <input type="radio" name="selected-bg" id="bg15" value="dark-primary">
                    <span class="custom-radio dark-primary-radio"></span>
                </label>
                <label class="radio-container" title="Lightgrey">
                    <input type="radio" name="selected-bg" id="bg2" value="light-lightgrey">
                    <span class="custom-radio light-lightgrey-radio"></span>
                </label>
                <label class="radio-container" title="Lavender">
                    <input type="radio" name="selected-bg" id="bg3" value="light-lavender">
                    <span class="custom-radio light-lavender-radio"></span>
                </label>
                <label class="radio-container" title="Honeydew">
                    <input type="radio" name="selected-bg" id="bg4" value="light-honeydew">
                    <span class="custom-radio light-honeydew-radio"></span>
                </label>
                <label class="radio-container" title="Ivory">
                    <input type="radio" name="selected-bg" id="bg5" value="light-ivory">
                    <span class="custom-radio light-ivory-radio"></span>
                </label>
                <label class="radio-container" title="Beige">
                    <input type="radio" name="selected-bg" id="bg6" value="light-beige">
                    <span class="custom-radio light-beige-radio"></span>
                </label>
                <label class="radio-container" title="Floralwhite">
                    <input type="radio" name="selected-bg" id="bg7" value="light-floralwhite">
                    <span class="custom-radio light-floralwhite-radio"></span>
                </label>
                <label class="radio-container" title="Lightyellow">
                    <input type="radio" name="selected-bg" id="bg8" value="light-lightyellow">
                    <span class="custom-radio light-lightyellow-radio"></span>
                </label>
                <label class="radio-container" title="Mintcream">
                    <input type="radio" name="selected-bg" id="bg9" value="light-mintcream">
                    <span class="custom-radio light-mintcream-radio"></span>
                </label>
                <label class="radio-container" title="Lavenderblush">
                    <input type="radio" name="selected-bg" id="bg10" value="light-lavenderblush">
                    <span class="custom-radio light-lavenderblush-radio"></span>
                </label>
                <label class="radio-container" title="Oldlace">
                    <input type="radio" name="selected-bg" id="bg11" value="light-oldlace">
                    <span class="custom-radio light-oldlace-radio"></span>
                </label>
                <label class="radio-container" title="Seashell">
                    <input type="radio" name="selected-bg" id="bg12" value="light-seashell">
                    <span class="custom-radio light-seashell-radio"></span>
                </label>
                <label class="radio-container" title="Whitesmoke">
                    <input type="radio" name="selected-bg" id="bg13" value="light-whitesmoke">
                    <span class="custom-radio light-whitesmoke-radio"></span>
                </label>
                <label class="radio-container" title="Linen">
                    <input type="radio" name="selected-bg" id="bg14" value="light-linen">
                    <span class="custom-radio light-linen-radio"></span>
                </label>
                <label class="radio-container" title="Full dark (black)">
                    <input type="radio" name="selected-bg" id="bg16" value="dark-black">
                    <span class="custom-radio dark-black-radio"></span>
                </label>
            </form>
            <button class="back-to-main">◄ Main menu</button>
            </div>`;
            controlPanel.className = "control-panel";
            rmContainer.appendChild(controlPanel);
            const panelOpener = document.createElement("p");
            panelOpener.innerText = "▼";
            panelOpener.id = "panel-opener";
            panelOpener.className = "panel-opener";
            panelOpener.title = "Show the reading mode control panel";
            rmContainer.appendChild(panelOpener);
            document.body.innerHTML = "";
            document.body.appendChild(rmContainer);

            // control panel events handling

            const zoomIn = document.querySelector(".zoom-in");
            const zoomOut = document.querySelector(".zoom-out");
            zoomIn.addEventListener("click", handleZoomIn);
            function handleZoomIn(){
                const articleDOM = document.querySelector("article");
                const styles = window.getComputedStyle(articleDOM);
                const oldValue = styles.getPropertyValue("zoom");
                const newValue = (+oldValue + 0.1).toString();
                article.style.zoom = newValue;
                document.querySelector(".current-val").innerHTML = `${(newValue * 100).toFixed(0)}%`;
            };
            zoomOut.addEventListener("click", handleZoomOut);
            function handleZoomOut(){
                const articleDOM = document.querySelector("article");
                const styles = window.getComputedStyle(articleDOM);
                const oldValue = styles.getPropertyValue("zoom");
                const newValue = (+oldValue - 0.1).toString();
                article.style.zoom = newValue;
                document.querySelector(".current-val").innerHTML = `${(newValue * 100).toFixed(0)}%`;
            };
            // zoom control using keyboard
            document.addEventListener("keyup", function(e){
                if(e.keyCode === 107){
                    handleZoomIn();
                }else if(e.keyCode === 109){
                    handleZoomOut();
                }
            })
            document.querySelector(".reset").addEventListener("click", function (){
                article.style.zoom = "1";
                document.querySelector(".current-val").innerHTML = "100%";
            });

            // fullscreen control
            let fullscreenOn = document.fullscreenElement ? true : false;
            const fullScreenBtn = document.querySelector(".full-screen-mode-btn");

            fullScreenBtn.addEventListener("click", function(){
                fullscreenOn = document.fullscreenElement ? true : false;
                if(!fullscreenOn){
                    document.documentElement.requestFullscreen();
                }else{
                    document.exitFullscreen();
                }
            });
            document.onfullscreenchange = function(){
                updateFullscreenBtn();
            };
            function updateFullscreenBtn(){
                fullscreenOn = document.fullscreenElement ? true : false;
                fullScreenBtn.innerHTML = fullscreenOn ? "Exit fullscreen" : "Fullscreen";
            }

            // exiting reading mode

            document.querySelector(".exit").addEventListener("click", function (){
                location.reload();
            });
            document.querySelector(".panel-visibility").addEventListener("click", function(){
                document.querySelector(".control-panel").classList.add("hide-control-panel");
                panelOpener.classList.add("rm-show")
            })
            document.querySelector(".panel-opener").addEventListener("click", function(){
                document.querySelector(".control-panel").classList.remove("hide-control-panel");
                document.querySelector(".panel-opener").classList.remove("rm-show")
            });

            //background color selection panel visibility
            const bgContainer = document.querySelector(".bg-selection-conatiner");
            const mainMenu = document.querySelector(".rm-main-menu");

            //showing the background selection menu
            document.getElementById("bg-control-visiblity").addEventListener("click",function(){
                bgContainer.classList.toggle("show-bg-selection");
                mainMenu.classList.toggle("hide-main-menu");
            });
            //going back to the main menu
            document.querySelector(".back-to-main").addEventListener("click", function(){
                bgContainer.classList.remove("show-bg-selection");
                mainMenu.classList.remove("hide-main-menu");
            });

            // handle BG color change
            const bgForm = document.querySelector("form");
            bgForm.addEventListener("change", handleBgChange);
            function handleBgChange(){
                let selectedBg = "";
                for(const bg of bgForm.elements){
                    if(bg.checked){
                        selectedBg = bg.value;

                        // save selected background color to storage

                        chrome.storage.sync.set({bgId : bg.id})
                    }
                }
                document.documentElement.style.setProperty("--selected-bg", `var(--${selectedBg}-bg)`);

                if(selectedBg === "dark-primary" || selectedBg === "dark-black"){
                    article.classList.add("dark-mode-text-style");
                }else{
                    article.classList.remove("dark-mode-text-style");
                }
            }
            
            // getting saved background color from storage
            chrome.storage.sync.get(["bgId"],function(result){
                if(result.bgId){
                    document.getElementById(result.bgId).checked = true;
                    handleBgChange();
                }
            });

        }else if(document.querySelector("article").id === "rm-extension"){
            // prenvent re-executing when already on use
            const controlPanel = document.querySelector(".control-panel");
            const panelOpener = document.querySelector("#panel-opener");
            controlPanel.classList.toggle("rm-open-warning");
            panelOpener.classList.toggle("rm-open-warning");
            window.setTimeout(function(){
                controlPanel.classList.remove("rm-open-warning");
                panelOpener.classList.remove("rm-open-warning");
            },500)
        }
}