function recuperar(e)
{
    e.preventDefault();
    const email = document.getElementById('email').value
    fetch(ipServidor + 'api/usuarios/recuperarPass', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email:email
        })
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            window.location.href = "./login.html"
        })
        .catch(err => {
            console.log(err)
        });
    return false
}