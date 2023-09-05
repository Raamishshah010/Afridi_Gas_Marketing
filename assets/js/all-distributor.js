db.collection('customerCollection').get().then((result) => {
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
        `)
    })


}).catch((err) => {
    window.alert(err.message);
});
