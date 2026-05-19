import Default from './Default/Default';

const PopUpArea = ({ id, commonAudioProps }) => {
    const { index } = commonAudioProps;

    return (
        <div id={`llb-dialog-audio-${id}-${index}`} className="llb-dialog-audio">
            <Default {...commonAudioProps} />
        </div>
    );
};
export default PopUpArea;
