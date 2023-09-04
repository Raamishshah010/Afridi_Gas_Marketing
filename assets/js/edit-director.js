let urlParam = new URLSearchParams(window.location.search);

let myParam = urlParam.get('id');


db.collection('directorCollection').doc(myParam).get().then((result) => {

    console.log(result.data());

    $('#directorInfo').append(`
    <div class="directorImage">
                                        <img src="${result.data().image}" class="img-fluid" alt="">
                                    </div>
                                    <div class="directorInfo mt-5">
                                        <h5>${result.data().directorName}</h5>
                                        <p>${result.data().directorRole}</p>
                                    </div>
    `);


    $('#directorName').val(result.data().directorName)
    $('#directorRole').val(result.data().directorRole)


}).catch((err) => {
    window.alert(err.message)
});

let file = null;

let image = document.getElementById('image');
image.addEventListener('change', function (e) {

    file = e.target.files[0];

});



function editDirector() {

    let directorNameUpdated = $('#directorName').val();
    let directorRoleUpdated = $('#directorRole').val();

    if (directorNameUpdated === "" || directorRoleUpdated === "") return window.alert("Please Enter All Fields");

    if (file === null) {

        db.collection('directorCollection').doc(myParam).update({
            directorName: directorNameUpdated,
            directorRole: directorRoleUpdated

        }).then(() => {
            window.alert('Updated Successfully');
            window.location.reload();


        }).catch((err) => {
            window.alert(err.message)
        });

    } else {


        $('#subBtn').html('Please Wait....');
        $('#subBtn').addClass('disabled');

        var storageRef = firebase.storage().ref('images/directorImage' + Date.now());

        var uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                $('#progressBar').html(`Uploaded ${progress}%`);
                console.log('Upload is ' + progress + '% done');
                console.log(snapshot.state)
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    db.collection('directorCollection').doc(myParam).update({
                        directorName: directorNameUpdated,
                        directorRole: directorRoleUpdated,
                        image: downloadURL

                    }).then(() => {
                        window.alert('Updated Successfully');
                        window.location.reload();


                    }).catch((err) => {
                        window.alert(err.message)
                    });
                })
            })


    }


}