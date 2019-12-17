function getPortfolioData(id){
    $.get("/getporjects/byid/"+id, function(data){
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
        // If logged out, display login & signup buttons
        if (data.logged_in == false) {
            window.location.replace("/");
        }
        // If logged in, display signout & profile buttons
        else {
            getPortfolioData(data.user_id);
        }
    });
})