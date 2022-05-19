let fieldId;
let container;
let noText;
let descField;
$(document).ready(function() {
    var url = new URL(location.href);
    fieldId = url.searchParams.get('id');
    container = document.getElementById("container");
    const userId = localStorage.getItem("photo-token");
    noText = document.getElementById("no-images-msg");
    descField = document.getElementById('descField');
    $.ajax({
        type: "get",
        url: `/photograph/php/get_field_user_images.php?user_id=${userId}&field_id=${fieldId}`,
        success: (response, status) => {
            let json = JSON.parse(response);

            if (json.length === 0) {
                // display empty array of images text + empty card to add new one
                noText.style.display = 'block';

            } else {
                // display all images + empty card to add new one
                noText.style.display = 'none';

                // generate all image cards
                for (let index = 0; index < json.length; index++) {
                    const image = json[index];
                    let generatedImage = generateImage(image);
                    container.innerHTML += generatedImage;
                }
            }

        }
    });
});

let fullScreen = (imageId) => open(imageId, '_blank').focus();

let generateImage = (image) => `  <div class="card">
<img src="${image.img_url}">
<div class="content">
    <h2>${image.dsc}</h2>
    <a id='re${image.id}' onClick='fullScreen("${image.img_url}")'>Full Screen</a>
</div>
</div>`;

Dropzone.options.uploadForm = {
    url: "/photograph/php/add_new_image.php",
    autoProcessQueue: false,
    paramName: 'file',
    init: function() {
        var myDropzone = this;
        this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
            // Make sure that the form isn't actually being sent.
            e.preventDefault();
            e.stopPropagation();
            myDropzone.processQueue();

        });
        this.on("sending", function(file, xhr, formData) {
            // Will send the filesize along with the file as POST data.
            formData.append("userId", localStorage.getItem('photo-token'));
            formData.append("fieldId", fieldId);

            formData.append("desc", descField.value);
        });
        this.on('success', function(file, response) {
            console.log(response);
            let json = JSON.parse(response);

            noText.style.display = 'none';
            container.innerHTML += generateImage(json['image']);
            myDropzone.removeAllFiles();
        });
    },

};

let logout = () => {
    localStorage.removeItem('photo-token');
    location.href = 'index.html';
}

let showAddForm = () => {
    let uploadBox = document.getElementById('upload-form');
    uploadBox.style.display = 'block';
    //hidden
    if (!uploadBox.classList.contains('animate__zoomInUp')) {
        uploadBox.classList.add("animate__zoomInUp");
        uploadBox.classList.remove('animate__zoomOutRight');
    } else {
        uploadBox.classList.remove("animate__zoomInUp");
        uploadBox.classList.add('animate__zoomOutRight');
    }
}