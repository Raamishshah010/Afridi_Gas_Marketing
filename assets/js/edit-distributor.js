

let urlParam = new URLSearchParams(window.location.search);

let myParam = urlParam.get("id");


console.log(myParam);




db.collection("customerCollection").doc(myParam).get().then((item) => {
    
    console.log(item.data());

    $("#agencyCode").val(item.data().agencyCode)
    $("#nameOfDistributor").val(item.data().nameOfDistributor)
    $("#agencyName").val(item.data().agencyName)
    $("#agencyAddress").val(item.data().agencyAddress)
    $("#contact").val(item.data().contact)
    
})


function editDistributor(){
    let updatedagencyCode = document.getElementById('agencyCode').value;
    let updatednameOfDistributor = document.getElementById('nameOfDistributor').value;
    let updatedagencyName = document.getElementById('agencyName').value;
    let updatedagencyAddress = document.getElementById('agencyAddress').value;
    let updatedcontact = document.getElementById('contact').value;



    if (updatedagencyCode === "" || updatednameOfDistributor === "" || updatedagencyName === "" || updatedagencyAddress === "" || updatedcontact === "") return window.alert("Please enter all fields");


    $('#subBtn').html('Please Wait....');
    $('#subBtn').addClass('disabled');


    db.collection("customerCollection").doc(myParam).update({
        agencyCode: updatedagencyCode,
        nameOfDistributor: updatednameOfDistributor,
        agencyName: updatedagencyName,
        agencyAddress: updatedagencyAddress,
        contact: updatedcontact,
    }).then(() => {
        window.alert("Updated Successfully!");
        window.location.reload();
        
    }).catch((err) => {
        window.alert(err.message)
    })



}