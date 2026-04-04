import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const src = path.join(root, 'public/images/shared/success-kid-original.png')
const out = path.join(root, 'public/images/shared/success-kid.png')

async function run() {
  const img = sharp(src)
  const meta = await img.metadata()
  console.log(`Original: ${meta.width}x${meta.height}`)

  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const THRESH = 240

  let top = height, left = width, bottom = 0, right = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels
      const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3]
      if (a > 10 && (r < THRESH || g < THRESH || b < THRESH)) {
        if (y < top) top = y
        if (y > bottom) bottom = y
        if (x < left) left = x
        if (x > right) right = x
      }
    }
  }

  const pad = 4
  top = Math.max(0, top - pad)
  left = Math.max(0, left - pad)
  bottom = Math.min(height - 1, bottom + pad)
  right = Math.min(width - 1, right + pad)

  const cropW = right - left + 1
  const cropH = bottom - top + 1
  console.log(`Bounding box: top=${top} left=${left} ${cropW}x${cropH}`)

  await sharp(src)
    .extract({ left, top, width: cropW, height: cropH })
    .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(async ({ data: raw, info: inf }) => {
      for (let i = 0; i < raw.length; i += 4) {
        const r = raw[i], g = raw[i + 1], b = raw[i + 2]
        if (r >= THRESH && g >= THRESH && b >= THRESH) {
          raw[i + 3] = 0
        } else if (r >= 230 && g >= 230 && b >= 230) {
          raw[i + 3] = Math.max(0, raw[i + 3] - 180)
        }
      }

      await sharp(raw, { raw: { width: inf.width, height: inf.height, channels: 4 } })
        .resize({ height: 280, withoutEnlargement: true })
        .png({ compressionLevel: 9 })
        .toFile(out)

      const finalMeta = await sharp(out).metadata()
      console.log(`Output: ${finalMeta.width}x${finalMeta.height} → ${out}`)
    })
}

run().catch(console.error)
