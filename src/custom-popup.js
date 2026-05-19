import './custom-popup.scss';
document.addEventListener('DOMContentLoaded', function () {

    const modal = document.createElement('div');
    modal.id = 'lbb_pdfModal';
    modal.innerHTML = `
        <div class="pdf-modal-content">
            <span class="pdf-close">&times;</span>
            <iframe id="pdfViewer" src="" frameborder="0"></iframe>
        </div>
    `;
    document.body.appendChild(modal);


    const iframe = modal.querySelector('#pdfViewer');
    const closeBtn = modal.querySelector('.pdf-close');
    const links = document.querySelectorAll('.lbb_lightbox');

    links.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const pdfUrl = link.getAttribute('href');
            //Google viewer
            iframe.src = `https://docs.google.com/gview?url=${pdfUrl}&embedded=true`;

            // iframe.src = pdfUrl;
            modal.style.display = 'block';
        });
    });


    // Close modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        iframe.src = '';
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            iframe.src = '';
        }
    });
});
