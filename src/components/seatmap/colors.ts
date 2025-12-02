import { SeatStatus } from '@/types';

export const SEAT_CLASSES: Record<SeatStatus, string> = {
  available: 'text-[#98D9C2]',
  reserved: 'text-[#F19A3E]',
  sold: 'text-[#D8E2DC]',
  held: 'text-[#E87461]',
};
