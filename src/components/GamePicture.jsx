import { imageSourcesFromPngUrl } from '../lib/assets'

/**
 * Renders WebP when present in /public, PNG fallback (same basename).
 * @param {string} pngUrl - Full URL to the PNG as used today (…/file.png)
 */
export default function GamePicture({ pngUrl, alt = '', className, loading = 'lazy', onError, ...rest }) {
  const { webp, png } = imageSourcesFromPngUrl(pngUrl)
  return (
    <picture>
      <source type="image/webp" srcSet={webp} />
      <img src={png} alt={alt} loading={loading} className={className} onError={onError} {...rest} />
    </picture>
  )
}
