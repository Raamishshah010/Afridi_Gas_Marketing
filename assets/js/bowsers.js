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
            
        </tr>
        `);


        i++;
    })


}).catch((err) => {
    window.alert(err.message);
});
