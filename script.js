function fungsiSimpan(){
    const judul= document.getElementById('judul').value;
    const notes= document.getElementById('notes').value;
    if(judul && notes){
       const data={title: judul,text: notes};
       fetch('https://api.m3o.com/v1/notes/Create', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer MzQ5ZmQ4NTktYTIzYi00ZGM0LWFjOGUtYTJkNjc2YWQxMzcx'
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            window.location="./index.html";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
     }
}

function fungsiListCerita(){
    fetch('https://api.m3o.com/v1/notes/List', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer MzQ5ZmQ4NTktYTIzYi00ZGM0LWFjOGUtYTJkNjc2YWQxMzcx'
        },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            if(data.notes.length>0){
                let List='';
                for(i=0;i<data.notes.length;i++){
                    List+=`
                        <div class="card mb-3 card-style">
                             <div class="card-body">
                                <div class="row">
                                    <div class="col-3 text-center right-border">${new Date(data.notes[i].updated).toDateString()}</div>
                                    <div class="col-9">${data.notes[i].title}</div>
                                </div>
                            </div>
                        </div>
                    `
                }
                document.getElementById('listcerita').innerHTML = List;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}