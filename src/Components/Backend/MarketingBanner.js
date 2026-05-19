import { __ } from '@wordpress/i18n';
import { pdfIcon, iframeIcon, youtubeIcon, htmlIcon } from '../../utils/icons';
import { adminUrl } from '../../utils/functions';

const MarketingBanner = () => (
	<div className="marketing">
		<div className="marketing-inner">
			<div className="marketing-badge">{__('Premium', 'lightbox')}</div>
			<p className="marketing-headline">
				{__('Unlock more media types with', 'lightbox')} <strong>{__('Lightbox Block Pro', 'lightbox')}</strong>
			</p>
			<div className="marketing-types">
				<span className="marketing-type pdf">{pdfIcon(16)} PDF</span>
				<span className="marketing-type iframe">{iframeIcon(16)} iFrame</span>
				<span className="marketing-type youtube">{youtubeIcon(16)} YouTube</span>
				<span className="marketing-type html">{htmlIcon(16)} HTML</span>
			</div>
			<a className="marketing-cta" href={adminUrl()} target="_blank" rel="noopener noreferrer">
				{__('Upgrade to Pro', 'lightbox')} →
			</a>
		</div>
	</div>
);

export default MarketingBanner;
