import { z } from 'zod'

export const CalculateRequestSchema = z.object({
  product_slug: z.string().min(1).max(100),
  temp_fahrenheit: z.number().min(-40).max(150),
  humidity_rh: z.number().min(0).max(100),
  surface_temp_fahrenheit: z.number().min(-40).max(150).optional(),
})

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>
