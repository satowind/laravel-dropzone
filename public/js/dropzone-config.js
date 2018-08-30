var total_photos_counter = 0;
var newObj;
var name = "";
var winds;
Dropzone.options.myDropzone = {
    uploadMultiple: true,
    parallelUploads: 12,
    maxFilesize: 16,
    previewTemplate: document.querySelector('#preview').innerHTML,
    addRemoveLinks: true,
    dictRemoveFile: 'Remove file',
    dictFileTooBig: 'Image is larger than 16MB',
    timeout: 10000,
    
    // renameFile: function (file) {
    //     name = new Date().getTime() + Math.floor((Math.random() * 100) + 1) + '_' + file.name;
    //     return name;
    // },

    init: function () {
        this.on("removedfile", function (file) {
            
            $.post({
                url: 'http://localhost/dropzone/public/images-delete',
                data: {id: file.name,photo:newObj[file.name], _token: $('[name="_token"]').val()},
                dataType: 'json',
                success: function (data) {
                    total_photos_counter--;
                    $("#counter").text("# " + total_photos_counter);
                }
            });
            delete newObj[file.name];
        });
    },
    success: function( file, response ){
        obj = JSON.parse(response);
        

        let wind = obj.split(',');
        console.log(wind);
        if(newObj){
            for(var i = 0; i < wind.length; i++) {
                var name = wind[i].split('*')[0];
                var val = wind[i].split('*')[1];
    
                newObj[name]=val;
            }
            console.log(newObj);
        }else{
            newObj = {};
            for(var i = 0; i < wind.length; i++) {
                var name = wind[i].split('*')[0];
                var val = wind[i].split('*')[1];
    
                newObj[name] = val;
            }
            console.log(newObj);
        }
        
        //console.log(obj);

        
         // <---- here is your filename
   }
};

function add(){
    var winds = '';
    newObj;
    if(newObj){
       for(key in newObj){
           winds += newObj[key]+',';
       }
    }
   
    console.log(winds);
    $('#me').val(winds);
};