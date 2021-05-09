function upload(ev){
    let input = ev.target;
    // console.log(this);
    let filePath = input.value;
    let arr = filePath.split("\\");
    let len = arr.length;

    let fileName = arr[len-1];
   
    appendTr(fileName.split('.')[0], fileName.split('.')[1].toUpperCase());
    
}

function dropHandler(ev){
    
    //Prevent default behavior (Prevent file from being opened);
    ev.preventDefault();

    if(ev.dataTransfer.items){
        // Use DataTransferItemList interface to access the file(s)
        let count = ev.dataTransfer.items.length; 

        for(let i=0; i<count; i++){
            let fileObj = ev.dataTransfer.items[i];
            let type = fileObj.type;
         
            let kind = fileObj.kind;
        
            if(!type){
                alert("Invalid file type!");
                return;
            }
            // If items are not files, reject them
            if( kind === 'file'){       
                let file = fileObj.getAsFile();
                let title = file.name.split('.')[0];
                let fileType = file.name.split('.')[1].toUpperCase();
                appendTr(title, fileType);
            }
        }
    }else{
        //Use DataTransfer interface to access the file(s)
        console("In else");
        for(let i = 0; i< ev.dataTransfer.files.length; i++){
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
    }
}

function appendTr(title, type){
    let tbody = document.querySelector('.tbody');
    let tr = document.createElement('tr');
    tr.innerHTML = `<td style="color: rgb(36, 111, 250);">${title}</td><td>${type}</td><td class="delete_btn"><i class="far fa-trash-alt" onclick="removeTr(event)"></i></td>`; 
    tbody.appendChild(tr);
}

function dragOverHandler(ev) {
    //Prevent default behavior (Prevent file from being opened);
    ev.preventDefault();
}

function removeTr(event){
    
    let currTr = event.target.parentElement.parentElement;

    currTr.remove();
}