function SearchPhotos() {
    let clientId = "sYoUMawzOY5bv-nXDaU-zLmM1Hb6LVW2Xv_B2epudkU";

    let query = document.getElementById("search").value;

    let url = "https://api.unsplash.com/search/photos/?client_id="+clientId+"&query"+ query;


    fetch(url)
    .then(function(data){
        return data.json();
    })
    .then(function (data){
        console.log(data);

        data.results.forEach(photo => {
            let result = `
            <img src="${photo.urls.regular}">
            `;
            document.getElementById("result").append(result)
            
        });
    })
};


