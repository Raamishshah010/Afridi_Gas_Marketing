db.collection('directorCollection').get().then((result) => {

    result.forEach((director) => {

        if(director.data().directorRole === "CEO"){
            $('#ceo').attr('src', director.data().image)
        }


        $('#allDirectors').append(`
        <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="directorCard">
                        <div class="directorCard_img">
                            <img src="${director.data().image}" class="img-fluid" alt="">
                        </div>
                        <div class="directorCard_content">
                            <h5>${director.data().directorName}</h5>
                            <p>${director.data().directorRole}</p>
                        </div>
                    </div>
                </div>

        
        `)
    })

}).catch((err) => {
    window.alert(err.message);
});