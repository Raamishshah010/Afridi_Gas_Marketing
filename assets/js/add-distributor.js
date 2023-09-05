let sNo;

db.collection('customerCollection').get().then((result) => {
    sNo = result.docs.length


}).catch((err) => {
    window.alert(err.message);
});

function addDistributor() {

    let agencyCode = document.getElementById('agencyCode').value;
    let nameOfDistributor = document.getElementById('nameOfDistributor').value;
    let agencyName = document.getElementById('agencyName').value;
    let agencyAddress = document.getElementById('agencyAddress').value;
    let contact = document.getElementById('contact').value;



    if (agencyCode === "" || nameOfDistributor === "" || agencyName === "" || agencyAddress === "" || contact === "") return window.alert("Please enter all fields");


    $('#subBtn').html('Please Wait....');
    $('#subBtn').addClass('disabled');


    let disRef = db.collection('customerCollection').doc();


    let data = {
        agencyCode,
        nameOfDistributor,
        agencyName,
        agencyAddress,
        contact,
        date: new Date(),
        docID: disRef.id,
        sNo: parseInt(sNo + 1)
    }

    disRef.set(data).then(() => {

        window.alert('Added Successfully');
        window.location.reload();

    }).catch((err) => {
        window.alert(err.message)
    });

}