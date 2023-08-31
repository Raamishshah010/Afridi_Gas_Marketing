


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



let gallaryID = null;



db.collection('gallaryCollection').get().then((result) => {

    $('#gallaryCount').html(result.docs.length)
    let i = 0;


    result.forEach((director) => {
        $(`#galleryList`).append(`
        <div class="col-sm-12 col-md-6 col-lg-4 mt-5">
                            <div class="gallaryImage">
                                <img data-toggle="modal" data-target="#exampleModal" src="${director.data().image}" id="selectImage${i}" width="100%" alt="">
                            </div>
                        </div>
        
        `)



        $(`#selectImage${i}`).on('click', function () {

            $(`#gallaryImageModel`).attr('src', director.data().image);

            
            localStorage.setItem('gallaryID', result.data().docID)

        })

        i++;

    });

}).catch((err) => {
    window.alert(err.message);
});



function deleteImage() {

    gallaryID = localStorage.getItem('gallaryID')

    let checkConfirm = confirm('Are you sure you want to delete');

    if (checkConfirm) {
        db.collection('gallaryCollection').doc(gallaryID).delete().then(() => {
            window.alert('Deleted Successfully');
            window.location.reload();
        }).catch((err) => {
            window.alert(err.message);
        });
    } else {
        window.alert('Not Deleted')

    }
}