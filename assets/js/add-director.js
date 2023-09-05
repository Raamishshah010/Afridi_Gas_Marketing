let file = null;

let image = document.getElementById('image');
image.addEventListener('change', function (e) {

    file = e.target.files[0];

});



function addDirector() {
    let directorName = $('#directorName').val();
    let directorRole = $('#directorRole').val();

    if (directorName === "" || directorRole === "" || file === null) return window.alert('Please Enter All Fields');

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

                let directorRef = db.collection("directorCollection").doc();

                let data = {
                    directorName: directorName,
                    directorRole,
                    image: downloadURL,
                    docID: directorRef.id

                }

                directorRef.set(data).then(() => {
                    window.alert('Director Added Successfully')
                    window.location.reload();
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(errorMessage);
                    window.alert(errorMessage)
                });
            })
        })



}