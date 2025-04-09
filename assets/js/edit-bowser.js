

let urlParam = new URLSearchParams(window.location.search);

let myParam = urlParam.get("id");


console.log(myParam);




db.collection("bowserCollection").doc(myParam).get().then((item) => {
    
    console.log(item.data());

    $("#vehicleNo").val(item.data().vehicleNo)
    $("#bowserNo").val(item.data().bowserNo)
    $("#capacity").val(item.data().capacity)
    $("#totalAxel").val(item.data().totalAxel)
    $("#otherDetails").val(item.data().otherDetails)
    
})


function editBowser(){
    let updatedvehicleNo = document.getElementById('vehicleNo').value;
    let updatedbowserNo = document.getElementById('bowserNo').value;
    let updatedcapacity = document.getElementById('capacity').value;
    let updatedtotalAxel = document.getElementById('totalAxel').value;
    let updatedotherDetails = document.getElementById('otherDetails').value;



    if (updatedvehicleNo === "" || updatedbowserNo === "" || updatedcapacity === "" || updatedtotalAxel === "" || updatedotherDetails === "") return window.alert("Please enter all fields");


    $('#subBtn').html('Please Wait....');
    $('#subBtn').addClass('disabled');


    db.collection("bowserCollection").doc(myParam).update({
        vehicleNo: updatedvehicleNo,
        bowserNo: updatedbowserNo,
        capacity: updatedcapacity,
        totalAxel: updatedtotalAxel,
        otherDetails: updatedotherDetails,
    }).then(() => {
        window.alert("Updated Successfully!");
        window.location.reload();
        
    }).catch((err) => {
        window.alert(err.message)
    })



}