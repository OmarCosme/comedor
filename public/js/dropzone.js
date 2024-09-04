
document.addEventListener('DOMContentLoaded', () => {
    const myDropzone = new Dropzone('#imgEmployee', {
      url: '/upload',
      maxFilesize: 3,
      maxFiles: 1,
      acceptedFiles: '.jpg, .jpeg',
      addRemoveLinks: true
    });
  
    myDropzone.on('complete', (file) => {
        console.log("Respuesta", file);
    });
});

/*
document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('imgEmployee');
  
    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
      
        const formData = new FormData(uploadForm);
  
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al subir el archivo');
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
});
*/