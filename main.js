document.querySelectorAll('.drop-zone__input').forEach(inputElement => {
  const dropZoneElement = inputElement.closest('.drop-zone');

  dropZoneElement.addEventListener('dragover', e => {
    e.preventDefault();
    dropZoneElement.classList.add('drop-zone--over');
  });

  ['dragleave', 'dragend'].forEach(type => {
    dropZoneElement.addEventListener(type, e => {
      dropZoneElement.classList.remove('drop-zone--over');
    });
  });

  dropZoneElement.addEventListener('drop', e => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      console.log(inputElement.files);
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove('drop-zone--over');
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb');

  if (dropZoneElement.querySelector('.drop-zone__prompt')) {
    dropZoneElement.querySelector('.drop-zone__prompt').remove();
  }

  // First time there's no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('drop-zone__thumb');
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;
}
