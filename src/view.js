import { createRoot } from 'react-dom';
import { useEffect } from 'react';

import './style.scss';
import { lbbConfig } from './config';
import Lightbox from './Lightbox';

import Style from './Components/Common/Style';

// Lightbox Block
document.addEventListener('DOMContentLoaded', () => {
    const lightboxEls = document.querySelectorAll('.wp-block-lbb-lightbox');
    lightboxEls.forEach((lightboxEl, index) => {
        const attributes = JSON.parse(lightboxEl.dataset.attributes);
        const { popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, options, controls } = attributes;

        lbbConfig(lightboxEl.id, popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, options, controls);

        createRoot(lightboxEl).render(<>
            <Style attributes={attributes} id={lightboxEl.id} index={index} />
            <RenderLayout attributes={attributes} id={lightboxEl.id} index={index} />
        </>);
        lightboxEl?.removeAttribute('data-attributes');
    });
});


const RenderLayout = ({ attributes, id, contentBlock, index }) => {



    const updateItem = (type, index, someting, nothin = false) => {
    }

    const Modal = ({ onRequestClose, activeIndex, id: clientId, children }) => {
        const dom = document.querySelector(`#${id + '-content-' + activeIndex}`);

        if (!dom) {
            return <></>
        }

        // Modal create Element Modal
        useEffect(() => {

            const modalWrapper = document.createElement('div');
            modalWrapper.classList.add('ghbModalMainSection');

            modalWrapper.setAttribute('id', `ghbModal-${clientId}`);

            const modal = document.createElement('div');
            modal.classList.add('ghbChildSection');

            const closeBtn = document.createElement('div');
            closeBtn.classList.add('closeBtn');

            closeBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' fill='#000000' width='30px' height='30px' viewBox='-6 -6 24 24' preserveAspectRatio='xMinYMin' class='jam jam-close'><path d='M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z' /></svg>";

            modalWrapper.appendChild(modal);

            const images = dom.querySelectorAll('[data-fancybox]');
            let id = dom.getAttribute('fancy-id');
            const cloneDom = dom.cloneNode(true);
            if (!id) {
                images.forEach(img => id = img.getAttribute('data-fancybox'));
                dom.setAttribute('fancy-id', id);
                images.forEach(img => img.removeAttribute('data-fancybox'));
            } else {
                const cloneImages = cloneDom.querySelectorAll('a');
                cloneImages.forEach(img => img.setAttribute('data-fancybox', id));
            }
            modal.innerHTML = cloneDom.innerHTML;

            modal.append(closeBtn);


            document.body.appendChild(modalWrapper);
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modalWrapper);
                onRequestClose();
            });

            // modal outside click modal remove 
            modalWrapper.addEventListener('click', function (e) {
                if (e.target.classList.contains('ghbModalMainSection')) {
                    document.body.removeChild(modalWrapper);
                    onRequestClose();
                }
            });
        }, []);

        return <>
        </>
    }

    const ContentArea = ({ id, item, index, isBackend, custom, setOpen }) => {
        return <></>
    }

    return <Lightbox ContentArea={ContentArea} Modal={Modal} attributes={attributes} id={id} isSelected={true} isBackend={true} custom={{ updateItem }} index={index} />
}
