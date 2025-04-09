db.collection('bowserCollection').orderBy("sNo", 'asc').get().then((result) => {
    let i = 0;

    result.forEach((item) => {

        console.log(item.data());

        $('#bowserList').append(`
        <tr>
            <th scope="row">${item.data().sNo}</th>
            <td>${item.data().vehicleNo}</td>
            <td>${item.data().bowserNo}</td>
            <td>${item.data().capacity}</td>
            <td>${item.data().totalAxel}</td>
            <td>${item.data().otherDetails}</td>
            <td style="display:flex;align-items:center; gap: 20px"><a href="../../admin/edit-bowser.html?id=${item.data().docID}" style="font-size:24px;"><i class='bx bxs-edit-alt'></i></a>   <span id="deleteDest${i}"><i class='bx bxs-trash' style="color:crimson; font-size:24px; cursor:pointer"></i></span> </td>
            
        </tr>
        `);


        $(`#deleteDest${i}`).on("click", () =>{
            console.log(item.data().docID);


            let confirm = window.confirm("Are you sure you want to delete this bowser?");

            if (confirm) {
                db.collection("bowserCollection").doc(item.data().docID).delete().then(() =>{
                    window.alert("Bowser Deleted Successfully");
                    window.location.reload();
                }).catch((err) => {
                    window.alert(err.message)
                })
            }
            
        })


        i++;
    })


}).catch((err) => {
    window.alert(err.message);
});
