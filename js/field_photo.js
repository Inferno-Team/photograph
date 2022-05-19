let fieldId;
let container;
let noText;
$(document).ready(function() {
    var url = new URL(location.href);
    fieldId = url.searchParams.get('id');
    container = document.getElementById("container");
    const userId = localStorage.getItem("photo-token");
    noText = document.getElementById("no-images-msg");
    $.ajax({
        type: "get",
        url: `/photograph/php/get_field_images.php?field_id=${fieldId}`,
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