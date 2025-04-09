db.collection('customerCollection').orderBy("sNo", 'asc').get().then((result) => {
    let i = 0;

    result.forEach((item) => {

        console.log(item.data());

        $('#customerList').append(`
        <tr>
            <th scope="row">${item.data().sNo}</th>
            <td>${item.data().agencyCode}</td>
            <td>${item.data().nameOfDistributor}</td>
            <td>${item.data().agencyName}</td>
            <td>${item.data().agencyAddress}</td>
            <td>${item.data().contact}</td>
            
        </tr>
        `);


        $(`#deleteDest${i}`).on("click", () =>{
            console.log(item.data().docID);


            let confirm = window.confirm("Are you sure you want to delete this distributor?");

            if (confirm) {
                db.collection("customerCollection").doc(item.data().docID).delete().then(() =>{
                    window.alert("Distributor Deleted Successfully");
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
