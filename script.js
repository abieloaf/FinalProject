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
            window.location="./home.html";
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
            document.getElementById('listcerita').innerHTML = '';
            if(data.notes.length>0){
                let List='';
                for(i=0;i<data.notes.length;i++){
                    if(data.notes[i].title.toLowerCase().includes(document.getElementById('filter').value.toLowerCase())){
                        List+=`
                        <a href="${window.location.href.replace('home','bacacatatan')}?${data.notes[i].id}">
                            <div class="card mb-3 card-style">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-3 text-center right-border">${new Date(data.notes[i].updated).toDateString()}</div>
                                        <div class="col-9">${data.notes[i].title}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        `
                    
                    }
                }
                document.getElementById('listcerita').innerHTML = List;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function fungsiGetCerita(){
    const id = window.location.search.replace('?','');
    fetch('https://api.m3o.com/v1/notes/Read', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer MzQ5ZmQ4NTktYTIzYi00ZGM0LWFjOGUtYTJkNjc2YWQxMzcx'
        },
        body: JSON.stringify({ id: id }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            document.getElementById('judul-baca').value = data.note.title;
            document.getElementById('notes-baca').value = data.note.text;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function fungsiDeleteCerita(){
    const id = window.location.search.replace('?','');
    fetch('https://api.m3o.com/v1/notes/Delete', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer MzQ5ZmQ4NTktYTIzYi00ZGM0LWFjOGUtYTJkNjc2YWQxMzcx'
        },
        body: JSON.stringify({ id: id }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert('notes berhasil dihapus');
            window.location = './home.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function fungsiUpdate(){
    const id = window.location.search.replace('?','');
    const judul= document.getElementById('judul-baca').value;
    const notes= document.getElementById('notes-baca').value;
    if(judul && notes){
        const data={note: {title: judul,text: notes, id: id}};
        fetch('https://api.m3o.com/v1/notes/Update', {
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
                alert('notes berhasil diupdate');
                 window.location = './home.html';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
