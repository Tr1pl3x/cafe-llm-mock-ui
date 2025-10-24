import { apiGet } from './client'
import {
  parseMapResponse,
  organizeMapData,
  type RawMapItem,
  type OrganizedMapData
} from '../utils/mapUtils'

export async function getKitchenMapOrganized(): Promise<OrganizedMapData> {
  const raw = await apiGet<RawMapItem[]>('/map/kitchen')
  const parsed = parseMapResponse(raw)
  return organizeMapData(parsed) 
}
