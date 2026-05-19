// import { useEffect, useRef, useState } from 'react';
// import {
//     BlockEditorProvider,
//     BlockList,
//     BlockTools,
//     WritingFlow,
//     ObserveTyping,
//     BlockInspector,
//     BlockEditorKeyboardShortcuts,
//     BlockListAppender,     // ✅ add
//     Inserter,              // ✅ add
// } from '@wordpress/block-editor';
// import { SlotFillProvider, Popover } from '@wordpress/components';
// import { parse, serialize } from '@wordpress/blocks';
// import { mediaUpload } from '@wordpress/editor';

// const ContentArea = ({ item, index, custom }) => {
//     const { ShortcutProvider } = wp.keyboardShortcuts;

//     const [blocks, setBlocks] = useState(() => parse(item.content || ''));

//     // ✅ Only reload when switching item (best: item.id থাকলে [item.id] দিন)
//     useEffect(() => {
//         setBlocks(parse(item.content || ''));
//     }, [index]);

//     // ✅ debounce parent save (typing smooth থাকবে)
//     const saveTimer = useRef(null);
//     const debouncedSave = (newBlocks) => {
//         if (saveTimer.current) clearTimeout(saveTimer.current);
//         saveTimer.current = setTimeout(() => {
//             custom.updateItem('content', index, serialize(newBlocks));
//         }, 300);
//     };

//     const onChangeContent = (newBlocks) => {
//         setBlocks(newBlocks);
//         debouncedSave(newBlocks);
//     };

//     return (
//         <BlockEditorProvider
//             value={blocks}
//             onChange={onChangeContent}
//             settings={{
//                 mediaUpload,
//                 allowedBlockTypes: true,  // ✅ ইউসার যেকোন ব্লক add করতে পারবে
//                 hasFixedToolbar: true,    // ✅ toolbar stable
//             }}
//         >
//             <SlotFillProvider>
//                 <ShortcutProvider className="lbbContentArea">
//                     <BlockEditorKeyboardShortcuts />

//                     <div className="lbbContentBox">
//                         <div className="lbbContent80">
//                             <div className="editor-styles-wrapper">
//                                 {/* ✅ Top toolbar + inserter */}
//                                 <BlockTools>
//                                     <Inserter
//                                         position="bottom right"
//                                         isPrimary
//                                     />
//                                 </BlockTools>

//                                 <WritingFlow>
//                                     <ObserveTyping>
//                                         {/* ✅ Bottom + appender */}
//                                         <BlockList renderAppender={BlockListAppender} />
//                                     </ObserveTyping>
//                                 </WritingFlow>
//                             </div>

//                             <div className="popoverSlotOuter">
//                                 <Popover.Slot />
//                             </div>
//                         </div>

//                         <div className="lbbContent20">
//                             <BlockInspector />
//                         </div>
//                     </div>
//                 </ShortcutProvider>
//             </SlotFillProvider>
//         </BlockEditorProvider>
//     );
// };

// export default ContentArea;





import { useEffect, useState } from 'react';
import { BlockEditorProvider, BlockList, BlockTools, WritingFlow, ObserveTyping, BlockInspector, BlockEditorKeyboardShortcuts } from '@wordpress/block-editor';
import { SlotFillProvider, Popover } from '@wordpress/components';
import { parse, serialize } from '@wordpress/blocks';
import { mediaUpload } from '@wordpress/editor';

// ContentArea Component
const ContentArea = ({ item, index, custom }) => {
    const { ShortcutProvider } = wp.keyboardShortcuts;
    const [blocks, updateBlocks] = useState([]);

    useEffect(() => {
        updateBlocks(parse(item.content));
    }, []);

    const onChangeContent = (blocks) => {

        const lastBlock = blocks[blocks.length - 1];
        if (lastBlock.name === "core/paragraph" && lastBlock.attributes.content === '') {
            updateBlocks(blocks);
        } else {
            updateBlocks([...blocks, ...parse('<!-- wp:paragraph --><!-- /wp:paragraph -->')]);
        }
        custom.updateItem('content', index, serialize(blocks));
    }

    return <BlockEditorProvider
        value={blocks}
        onInput={(blocks) => onChangeContent(blocks)}
        onChange={(blocks) => onChangeContent(blocks)}
        settings={{
            mediaUpload,
            // allowedBlockTypes: true,  // ✅ ইউসার যেকোন ব্লক add করতে পারবে
            // hasFixedToolbar: true,    // ✅ toolbar stable
        }}
    >
        <SlotFillProvider>
            <ShortcutProvider className='lbbContentArea'>
                <BlockEditorKeyboardShortcuts />
                <div className='lbbContentBox'>
                    <div className='lbbContent80'>
                        <BlockTools>
                            <WritingFlow>
                                <ObserveTyping>
                                    <BlockList />
                                </ObserveTyping>
                            </WritingFlow>
                        </BlockTools>

                        <div className="popoverSlotOuter">
                            <Popover.Slot />
                        </div>
                    </div>

                    <div className='lbbContent20'>
                        <BlockInspector />
                    </div>

                </div>
            </ShortcutProvider>
        </SlotFillProvider>
    </BlockEditorProvider>
}


export default ContentArea;