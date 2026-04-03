import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = 'https://gzfxdkrgeaadvabxitjk.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6Znhka3JnZWFhZHZhYnhpdGprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDk2OTY5NCwiZXhwIjoyMDkwNTQ1Njk0fQ.LTm0Is9AaxvdZ-2vjmUJLWdj543mDGeHCa1kPLu3ujw'
const BUCKET = 'media'
const FILE_PATH = 'public/hero-reel.mp4'
const OBJECT_NAME = 'hero-reel.mp4'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Create bucket if it doesn't exist
const { error: bucketError } = await supabase.storage.createBucket(BUCKET, { public: true })
if (bucketError && bucketError.message !== 'The resource already exists') {
  console.error('Error creating bucket:', bucketError.message)
  process.exit(1)
}

console.log('Uploading video...')
const file = readFileSync(FILE_PATH)
const { error: uploadError } = await supabase.storage
  .from(BUCKET)
  .upload(OBJECT_NAME, file, {
    contentType: 'video/mp4',
    upsert: true,
  })

if (uploadError) {
  console.error('Upload error:', uploadError.message)
  process.exit(1)
}

const { data } = supabase.storage.from(BUCKET).getPublicUrl(OBJECT_NAME)
console.log('\nPublic URL:')
console.log(data.publicUrl)
