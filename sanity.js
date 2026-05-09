import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: '626875hi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
})