import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const src = path.join(root, 'public/images/shared/elad success.jpeg')
const out = path.join(root, 'public/images/shared/elad-success.png')

async function run() {
  const meta = await sharp(src).metadata()
  console.log(`Original: ${meta.width}x${meta.height}`)

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info

  // Make dark pixels (black background) transparent
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const brightness = (r + g + b) / 3

    if (brightness < 25) {
      // Pure black — fully transparent
      data[i + 3] = 0
    } else if (brightness < 50) {
      // Near-black — feather the edge for smooth blending
      const alpha = Math.round(((brightness - 25) / 25) * 255)
      data[i + 3] = Math.min(data[i + 3], alpha)
    }
  }

  // Find bounding box of non-transparent pixels
  let top = height, left = width, bottom = 0, right = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels
      if (data[idx + 3] > 10) {
        if (y < top) top = y
        if (y > bottom) bottom = y
        if (x < left) left = x
        if (x > right) right = x
      }
    }
  }

  const pad = 2
  top = Math.max(0, top - pad)
  left = Math.max(0, left - pad)
  bottom = Math.min(height - 1, bottom + pad)
  right = Math.min(width - 1, right + pad)

  const cropW = right - left + 1
  const cropH = bottom - top + 1
  console.log(`Crop: top=${top} left=${left} ${cropW}x${cropH}`)

  // Extract the cropped region from the processed buffer
  const cropped = Buffer.alloc(cropW * cropH * channels)
  for (let y = 0; y < cropH; y++) {
    const srcOffset = ((top + y) * width + left) * channels
    const dstOffset = y * cropW * channels
    data.copy(cropped, dstOffset, srcOffset, srcOffset + cropW * channels)
  }

  await sharp(cropped, { raw: { width: cropW, height: cropH, channels } })
    .png({ compressionLevel: 9 })
    .toFile(out)

  const finalMeta = await sharp(out).metadata()
  console.log(`Output: ${finalMeta.width}x${finalMeta.height} → ${out}`)
}

run().catch(console.error)
