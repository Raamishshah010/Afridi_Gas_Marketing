


db.collection('directorCollection').get().then((result) => {

    $('#directorCount').html(result.docs.length)

    result.forEach((director) => {
        $(`#directorsList`).append(`
        <div class="col-sm-12 col-md-12 col-lg-6 mt-5">
                            <div class="directorCard">
                                <div class="directorCardImage">
                                    <img src="${director.data().image}" class="img-fluid" alt="">
                                </div>

                                <div class="directorCardConent mt-3">
                                    <h6>${director.data().directorName}</h5>
                                    <p>${director.data().directorRole}</p>

                                    <div class="cardBtns">

                                        <span class="editBtn">
                                            <a class="btn btn-primary" href="../admin/edit-director?id=${director.data().docID}">Edit</a>
                                        </span>
                                        
                                    </div>
                                </div>

                            </div>
                        </div>
        
        `)
    })

}).catch((err) => {
    window.alert(err.message);
});