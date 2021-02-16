var storedLinks = [];   
load();
function showForm(){
    document.getElementById('add-form').style.display = 'flex';
}

function addLink(){
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var link = document.getElementById('link').value;
    if(validateForm(title,description,link)){
        storedLinks.push({
            title: title,
            description: description,
            link: link
        });
    
        localStorage.setItem("links", JSON.stringify(storedLinks));
    
        load();
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('link').value = '';
        document.getElementById('add-form').style.display = 'none';
    }
}

function removeRow(id) {
    storedLinks.splice(id, 1);
    localStorage.setItem("links", JSON.stringify(storedLinks));
    load();
}

function load(){
    document.getElementById('thelist').innerHTML = '';
    if(JSON.parse(localStorage.getItem("links"))){
        storedLinks = JSON.parse(localStorage.getItem("links"));
    }
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    if(params.has('password')){
        if(MD5(params.get('password').toString()) == 'd6a21c8a87cc87995d0a96b41da17a1a'){
            document.getElementById('add-button').style.display = 'inline-block';
            var i=0;
            if(storedLinks){
                storedLinks.forEach(element => {
                    var li = document.createElement('li');
                    li.className = 'list-element';
                    li.innerHTML = '<h2>'+element['title']+'</h2>'+
                                        '<div class="description">'+element['description']+'</div>'+
                                        '<input type="text" id="editLink'+i+'" value="'+element['link']+'" />'+
                                        '<button onclick="changeLink('+i+')">UPDATE</button>'+
                                        ' <button onclick="removeRow('+i+')">DELETE</button>';
                    document.getElementById("thelist").appendChild(li);
                    i++;
                });
            }
        }else{
            document.getElementById("thelist").innerHTML = "<h1>Wrong password!</h1>"
        }
    }else{
        var i=0;
        if(storedLinks){
            storedLinks.forEach(element => {
                var li = document.createElement('li');
                li.className = 'list-element';
                li.innerHTML = '<a href="'+element['link']+'"><h2>'+element['title']+'</h2>'+
                                    '<div class="description">'+element['description']+'</div>'+
                                    '</a>';
                document.getElementById("thelist").appendChild(li);
                i++;
            });
        }  
    }
}
function cancel(){
    document.getElementById('add-form').style.display = 'none';
}

function validateForm(title, description, link) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!title || !description || !link) {
      alert('Please submit value for each field.');
      return false;
    }
    if (!link.match(regex)) {
      alert('Please provide a valid web address.');
      return false;
    }
    // Valid
    return true;
}

function changeLink(index){
    storedLinks[index]['link'] = document.getElementById("editLink"+index).value;
    localStorage.setItem("links", JSON.stringify(storedLinks));
    alert('URL has been changed.');
}
