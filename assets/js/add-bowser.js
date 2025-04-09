function addBowser() {
    let vehicleNo = document.getElementById('vehicleNo').value.trim();
    let bowserNo = document.getElementById('bowserNo').value.trim();
    let capacity = document.getElementById('capacity').value.trim();
    let totalAxel = document.getElementById('totalAxel').value.trim();
    let otherDetails = document.getElementById('otherDetails').value.trim();

    if (!vehicleNo || !bowserNo || !capacity || !totalAxel || !otherDetails) {
        return window.alert("Please enter all fields");
    }

    $('#subBtn').html('Please Wait....');
    $('#subBtn').addClass('disabled');

    // Check for uniqueness of vehicleNo and bowserNo
    db.collection('bowserCollection')
        .where('vehicleNo', '==', vehicleNo)
        .get()
        .then(snapshot1 => {
            if (!snapshot1.empty) {
                throw new Error("Vehicle Number already exists.");
            }

            return db.collection('bowserCollection')
                .where('bowserNo', '==', bowserNo)
                .get();
        })
        .then(snapshot2 => {
            if (!snapshot2.empty) {
                throw new Error("Bowser Number already exists.");
            }

            return db.collection('bowserCollection').get();
        })
        .then(result => {
            let sNo = result.docs.length + 1;
            let bowRef = db.collection('bowserCollection').doc();

            let data = {
                vehicleNo,
                bowserNo,
                capacity,
                totalAxel,
                otherDetails,
                date: new Date(),
                docID: bowRef.id,
                sNo: sNo
            };

            return bowRef.set(data);
        })
        .then(() => {
            window.alert('Added Successfully');
            window.location.reload();
        })
        .catch((err) => {
            $('#subBtn').html('Submit');
            $('#subBtn').removeClass('disabled');
            window.alert(err.message);
        });
}
