async function generateCode(){

    const secret =
        document.getElementById('secret').value;

    const res = await fetch('/api/code', {

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({
            secret:secret
        })

    });

    const data = await res.json();

    if(data.error){

        document.getElementById('code').innerText =
            data.error;

        return;
    }

    document.getElementById('code').innerText =
        data.code;
}