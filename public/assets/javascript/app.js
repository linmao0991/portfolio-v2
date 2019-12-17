//Function to poplate projects
function getPortfolioData(){
    $.get("/getporjects/all", function(data){
    }).then(function (projectData){
        console.log(projectData.length);
        poplatePortfolio(projectData)
    });
}

function poplatePortfolio(projectData){
    var cardSection = $("#portofilo-cards")
    for (var i = 0; i < projectData.length; i++ ){
        var project = `<div class="card text-white font-weight-bold h-25 d-inline-block">`+
                            // Card Body
                            `<div class="card-body p-0">`+
                                `<img src="${projectData[i].project_img}" class="card-img img-fluid" alt="Card Photo">`+
                                `<div class="card-img-overlay card-block">`+
                                    `<h5 class="card-title">${projectData[i].title}</h5>`+
                                    `<p class="card-text">${projectData[i].short_desc}</p>`+
                                    `<a type="button" data-toggle="collapse" data-target="#card${projectData[i].id}Info" class="btn btn-dark font-weight-bold myBtnStyle">More Info</a>`+
                                    `<a type="button" class="btn btn-dark font-weight-bold myBtnStyle" href="${projectData[i].project_url}" target="_blank">Link</a>`+
                                `</div>`+
                                // Card Expanded Information
                                `<div id="card${projectData[i].id}Info" class="collapse cardExpanded">`+
                                    `<h5>${projectData[i].title}</h5>`+
                                    `<p>${projectData[i].long_desc}</p>`+
                                    `<br>`+
                                `</div>`+
                            `</div>`+
                        `</div>`
        cardSection.append(project);
    }
}

$(document).ready(function(){

    $.get("/api/user_data", function (data) {
    }).then(function (data) {
        console.log(data)
        $("#loginButton").text("");
        // If not logged in, hide these links
        if (data.logged_in == false) {
            $("#control_panel").css("display","none");
            $("#logout").css("display","none");
            getPortfolioData()
        }
        // If logged in hide these links.
        else {
            $("#login").css("display","none");
            $("#sign_up").css("display","none");
            getPortfolioData()
        }
    });

    $("#loginButton").on("click", function(){
        $.get("/api/user_data", function (data) {
        }).then(function (data) {
            window.location.replace("/cp");
        }).catch(function(){
        })
    })
});