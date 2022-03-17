function cardCreator(picture, name, email) {
    return `
        <div class="col-4" style="margin: 10px 0px;">
            <div class="card" style="width: 300px;">
                <img src="${picture}" width="300">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${email}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    `;
}



let cardContainer = document.getElementsByClassName('row')[0];


function loadUsers() {


    fetch(
        'http://localhost:3001/user/all',
        {
            'method': "GET",
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(
        function(backendResponse) {
            return backendResponse.json();
        }
    )
    .then(
        function(users) {
            users.forEach(
                function(user) {
                    cardContainer.innerHTML += cardCreator(
                        product['picture'],
                        product['firstName'],
                        product['email']
                    );
                }
            )
        }
    )
    .catch(
        function(error) {
            console.log(error)
        }
    );
}



