import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { loadFrameIfNotLoaded, manageVideo } from './utils/functions';

export const lbbConfig = (id, popupIconLeft, popupIconMiddle, popupIconRight, thumb, slideShow, options, controls) => {



    const leftSidePopOP = Object.keys(popupIconLeft).filter(key => popupIconLeft[key]);
    const middleSidePopOP = Object.keys(popupIconMiddle).filter(key => popupIconMiddle[key]);
    const rightSidePopOP = Object.keys(popupIconRight).filter(key => popupIconRight[key]);
    const nonPlyrKeys = ['skipTime', 'isHeart', 'isPlaybackSpeed'];
    const controlsOpt = Object.keys(controls).filter(key => controls[key] && !nonPlyrKeys.includes(key));
    const audioControlsOpt = Object.keys(controls).filter(key => controls[key] && !nonPlyrKeys.includes(key));

    const twitter = {
        tpl: '<button class="f-button"><svg><path stroke="none" d="M0 0h24v24H0z"/><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013z"/></svg></button>',
        click: () => {
            window.open(
                "http://twitter.com/share?url=" +
                encodeURIComponent(window.location.href) +
                "&text=" +
                encodeURIComponent(document.title),
                "",
                "left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
            );
        },
    }

    const facebook = {
        tpl: '<button class="f-button"><svg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></button>',
        click: () => {
            window.open(
                "https://www.facebook.com/sharer/sharer.php?u=" +
                encodeURIComponent(window.location.href) +
                "&t=" +
                encodeURIComponent(document.title),
                "",
                "left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
            );
        }
    }

    Fancybox.bind(`[data-fancybox='${id}-gallery']`, {
        wheel: options.wheel,
        autoFocus: false,
        backdropClick: "close",
        closeButton: "auto",
        commonCaption: false,
        contentClick: "toggleZoom", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        contentDblClick: "toggleCover", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        // defaultDisplay: "flex",
        Carousel: {
            transition: options?.transition
        },
        Toolbar: {
            items: {
                facebook,
                twitter
            },
            display: {
                left: leftSidePopOP,
                middle: middleSidePopOP,
                right: rightSidePopOP
            },
        },
        Thumbs: {
            type: thumb.type,
            showOnStart: thumb.showOnStart,
            minCount: 2,
        },

        Slideshow: {
            playOnStart: slideShow?.playOnStart,
            timeout: slideShow?.timeout,
        },
        on: {
            init: (fancybox,) => {
                setTimeout(() => {
                    if (fancybox.container) {
                        fancybox.container.classList.add(`${id}-lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_modal_area`);
                    }
                }, 100);
            },
        },
    });

    Fancybox.bind(`[data-fancybox='${id}-audio-gallery']`, {
        on: {
            done: (fancybox) => {
                const audioElements = Array.from(document.querySelectorAll('.lbb-audio-player')).filter(el => !el.plyr);
                if (audioElements.length) {
                    Plyr.setup(audioElements, { controls: audioControlsOpt });
                }

                const currentSlide = fancybox.getSlide();
                const currentAudio = currentSlide?.el?.querySelector('.lbb-audio-player');

                if (currentAudio?.plyr?.play) {
                    currentAudio.plyr.play().catch(err => {
                        console.warn("Autoplay failed:", err);
                    });
                }
            },
            init: (fancybox) => {
                setTimeout(() => {
                    if (fancybox.container) {
                        fancybox.container.classList.add(`${id}-lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_modal_area`);
                    }
                }, 100);
            },
            close: () => {
                const players = document.querySelectorAll('.lbb-audio-player');
                players.forEach((player) => {
                    const instance = player.plyr;
                    if (instance?.pause) instance.pause();
                });
            },
        },


        Carousel: {
            transition: options?.transition,
            on: {
                beforeChange: (carousel, to, from) => {
                    const activePlayers = document.querySelectorAll('.lbb-audio-player');
                    activePlayers.forEach(player => {
                        if (player?.plyr?.pause) {
                            player.plyr.pause();
                        }
                    });
                },
                change: (carousel, to, from) => {
                    setTimeout(() => {
                        const currentSlide = carousel.slides[to];

                        const currentAudio = currentSlide?.el?.querySelector('.lbb-audio-player');

                        if (currentAudio) {
                            if (!currentAudio.plyr) {
                                Plyr.setup(currentAudio, { controls: controlsOpt });
                            }

                            if (currentAudio?.plyr?.play) {
                                currentAudio.plyr.play().catch(err => {
                                    console.warn("Autoplay failed:", err);
                                });
                            }
                        }
                    }, 100); // Slightly more delay for better rendering
                }
            }
        },
        touch: false,
        wheel: options.wheel,
        autoFocus: false,
        backdropClick: "close",
        closeButton: "auto",
        commonCaption: false,
        contentClick: "toggleZoom",
        contentDblClick: "toggleCover",
        Toolbar: {
            items: {
                facebook,
                twitter
            },
            display: {
                left: leftSidePopOP,
                middle: middleSidePopOP,
                right: rightSidePopOP,
            },
        },
        Thumbs: {
            type: thumb.type,
            showOnStart: thumb.showOnStart,
            minCount: 2,
        },
        Slideshow: {
            playOnStart: slideShow?.playOnStart,
            timeout: slideShow?.timeout,
        }
    });

    Fancybox.bind(`[data-fancybox='${id}-video-gallery']`, {
        Hash: false,

        on: {
            done: () => {
                const videoElement = document.querySelectorAll('.fancybox__html5video');

                const youtubeVideos = document.querySelectorAll('.has-youtube .fancybox__content');
                const vimeoVideos = document.querySelectorAll('.has-vimeo .fancybox__content');

                const videoPlayers = Plyr.setup(videoElement, {

                    controls: controlsOpt,
                    fullscreen: {
                        enabled: true,
                        fallback: true,
                        iosNative: true,
                        container: null
                    }
                });

                const youtubePlayers = Plyr.setup(youtubeVideos);
                const vimeoPlayers = Plyr.setup(vimeoVideos);

                videoPlayers?.forEach(player => manageVideo(player));
                youtubePlayers?.forEach(player => manageVideo(player));
                vimeoPlayers?.forEach(player => manageVideo(player));
            },
            init: (fancybox) => {
                setTimeout(() => {
                    if (fancybox.container) {
                        fancybox.container.classList.add(`${id}-lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_modal_area`);
                    }
                }, 100);
            },
        },

        wheel: options.wheel,
        autoFocus: false,
        backdropClick: "close",
        closeButton: "auto",
        commonCaption: false,
        contentClick: "toggleZoom", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        contentDblClick: "toggleCover", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        defaultDisplay: "flex",
        Carousel: {
            transition: options?.transition
        },
        Toolbar: {
            items: {
                facebook,
                twitter
            },
            display: {
                left: leftSidePopOP,
                middle: middleSidePopOP,
                right: rightSidePopOP,
            }
        },
        Thumbs: {
            type: thumb.type,
            showOnStart: thumb.showOnStart,
            minCount: 2,
        },

        Slideshow: {
            playOnStart: slideShow?.playOnStart,
            timeout: slideShow?.timeout,
        }
    });

    Fancybox.bind(`[data-fancybox='${id}-allDataGallery']`, {
        on: {
            done: () => {

                const videoElements = document.querySelectorAll('.has-html5video video');
                const youtubeVideos = document.querySelectorAll('.has-youtube .fancybox__content');
                const vimeoVideos = document.querySelectorAll('.has-vimeo .fancybox__content');
                Plyr.setup(videoElements, { controls: controlsOpt });
                const youtubePlayers = Plyr.setup(youtubeVideos);
                const vimeoPlayers = Plyr.setup(vimeoVideos);
                youtubePlayers?.forEach(player => player.elements.container.classList.add('fancybox__content'));
                vimeoPlayers?.forEach(player => player.elements.container.classList.add('fancybox__content'));
            },
            init: (fancybox) => {
                setTimeout(() => {
                    if (fancybox.container) {
                        fancybox.container.classList.add(`${id}-lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_modal_area`);
                    }
                }, 100);
            },
        },
        wheel: options.wheel,
        autoFocus: false,
        backdropClick: "close",
        closeButton: "auto",
        commonCaption: false,
        contentClick: "toggleZoom", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        contentDblClick: "toggleCover", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        defaultDisplay: "flex",
        Carousel: {
            transition: options?.transition
        },
        Toolbar: {
            items: {
                facebook,
                twitter
            },
            display: {
                left: leftSidePopOP,
                middle: middleSidePopOP,
                right: rightSidePopOP,
            },
        },
        Thumbs: {
            type: thumb.type,
            showOnStart: thumb.showOnStart,
            minCount: 2,
        },

        Slideshow: {
            playOnStart: slideShow?.playOnStart,
            timeout: slideShow?.timeout,

        }
    });

    Fancybox.bind(`[data-fancybox='${id}-pdf-gallery']`, {

        wheel: options.wheel,
        autoFocus: false,
        backdropClick: "close",
        closeButton: "auto",
        commonCaption: false,
        contentClick: "toggleZoom", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        contentDblClick: "toggleCover", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        // defaultDisplay: "flex",
        Carousel: {
            transition: options?.transition
        },
        Toolbar: {
            items: {
                facebook,
                twitter
            },
            display: {
                left: leftSidePopOP,
                middle: middleSidePopOP,
                right: rightSidePopOP,
            },


        },

        Thumbs: {
            type: thumb.type,
            showOnStart: thumb.showOnStart,
            minCount: 2,
        },

        Slideshow: {
            playOnStart: slideShow?.playOnStart,
            timeout: slideShow?.timeout,

        },
        on: {
            init: (fancybox,) => {
                setTimeout(() => {
                    if (fancybox.container) {
                        fancybox.container.classList.add(`${id}-lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_modal_area`);
                        const iframe = document.querySelector(`.${id}-lbb_modal_area iframe`);
                        loadFrameIfNotLoaded(iframe);
                    }
                }, 100);
            },
        }

    });

    Fancybox.bind(`[data-fancybox='${id}-iframe-gallery']`, {

        wheel: options.wheel,
        autoFocus: false,
        backdropClick: "close",
        closeButton: "auto",
        commonCaption: false,
        contentClick: "toggleZoom", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        contentDblClick: "toggleCover", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        // defaultDisplay: "flex",
        Carousel: {
            transition: options?.transition
        },
        Toolbar: {
            items: {
                facebook,
                twitter
            },
            display: {
                left: leftSidePopOP,
                middle: middleSidePopOP,
                right: rightSidePopOP,
            }
        },
        Thumbs: {
            type: thumb.type,
            showOnStart: thumb.showOnStart,
            minCount: 2,
        },

        Slideshow: {
            playOnStart: slideShow?.playOnStart,
            timeout: slideShow?.timeout,
        },

        on: {
            init: (fancybox,) => {
                setTimeout(() => {
                    if (fancybox.container) {
                        fancybox.container.classList.add(`${id}-lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_type_iframe_overlaping`);
                    }
                }, 100);
            }
        }
    });


    Fancybox.bind(`[data-fancybox='${id}-html-gallery']`, {

        wheel: options.wheel,
        autoFocus: false,
        backdropClick: "close",
        closeButton: "auto",
        commonCaption: false,
        contentClick: "toggleZoom", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        contentDblClick: "toggleCover", // "toggleZoom" | "toggleCover" | "toggleMax" | "zoomToFit" | "zoomToMax" | "iterateZoom" | false | "close" | "next" | "prev";
        // defaultDisplay: "flex",
        Carousel: {
            transition: options?.transition
        },
        Toolbar: {
            items: {
                facebook,
                twitter
            },
            display: {
                left: leftSidePopOP,
                middle: middleSidePopOP,
                right: rightSidePopOP,
            }
        },
        Thumbs: {
            type: thumb.type,
            showOnStart: thumb.showOnStart,
            minCount: 2,
        },

        Slideshow: {
            playOnStart: slideShow?.playOnStart,
            timeout: slideShow?.timeout,
        },

        on: {
            init: (fancybox,) => {
                setTimeout(() => {
                    if (fancybox.container) {
                        fancybox.container.classList.add(`${id}-lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_modal_area`);
                        fancybox.container.classList.add(`lbb_type_html_overlaping`);
                    }
                }, 100);
            }
        },

    });
}