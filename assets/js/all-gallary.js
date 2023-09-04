
db.collection('gallaryCollection').get().then((result) => {

    $('#gallaryCount').html(result.docs.length)
    let i = 0;


    result.forEach((director) => {
        $(`#allGallary`).append(`
        <div class="col-sm-12 col-md-4 col-lg-4">
        <img src="${director.data().image}" class="img-fluid" alt="">
    </div>
        
        `)



        

    });

}).catch((err) => {
    window.alert(err.message);
});
