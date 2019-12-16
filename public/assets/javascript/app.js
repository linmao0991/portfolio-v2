//Function to poplate projects
function getPortfolioData(){
    $.get("/getporjects/all", function(data){
    }).then(function (projectData){
        console.log(projectData.length);
        poplatePortfolio(projectData)
    });
}

function poplatePortfolio(portofiloData){
    var cardSection = $("#portofilo-cards")
    for (var i = 0; i < portofiloData.length; i++ ){
        var portfolio = `<div class="card text-white font-weight-bold h-25 d-inline-block">`+
                            // Card Body
                            `<div class="card-body p-0">`+
                                `<img src="${portofiloData[i].portfolio_img}" class="card-img" alt="Card Photo">`+
                                `<div class="card-img-overlay card-block">`+
                                    `<h5 class="card-title">${portofiloData[i].title}</h5>`+
                                    `<p class="card-text">${portofiloData[i].short_desc}</p>`+
                                    `<a type="button" data-toggle="collapse" data-target="#cardOneInfo" class="btn btn-dark font-weight-bold myBtnStyle">More Info</a>`+
                                    `<a type="button" class="btn btn-dark font-weight-bold myBtnStyle" href="${portofiloData[i].portfolio_url}" target="_blank">Link</a>`+
                                `</div>`+
                                // Card Expanded Information
                                `<div id="cardOneInfo" class="collapse cardExpanded">`+
                                    `<h5>${portofiloData[i].title}</h5>`+
                                    `<p>${portofiloData[i].long_desc}</p>`+
                                    `<br>`+
                                `</div>`+
                            `</div>`+
                        `</div>`
        cardSection.append(portfolio);
    }

}